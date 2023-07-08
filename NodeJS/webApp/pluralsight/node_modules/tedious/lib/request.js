'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventEmitter = require('events').EventEmitter;
var TYPES = require('./data-type').typeByName;
var RequestError = require('./errors').RequestError;

// TODO: Figure out how to type the `rows` parameter here.


module.exports = function (_EventEmitter) {
  (0, _inherits3.default)(Request, _EventEmitter);

  function Request(sqlTextOrProcedure, callback) {
    (0, _classCallCheck3.default)(this, Request);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Request.__proto__ || (0, _getPrototypeOf2.default)(Request)).call(this));

    _this.sqlTextOrProcedure = sqlTextOrProcedure;
    _this.parameters = [];
    _this.parametersByName = {};
    _this.originalParameters = [];
    _this.preparing = false;
    _this.handle = undefined;
    _this.canceled = false;
    _this.paused = false;
    _this.error = undefined;
    _this.connection = undefined;
    _this.userCallback = callback;
    _this.callback = function (err) {
      if (this.preparing) {
        this.preparing = false;
        if (err) {
          this.emit('error', err);
        } else {
          this.emit('prepared');
        }
      } else {
        this.userCallback.apply(this, arguments);
        this.emit('requestCompleted');
      }
    };
    return _this;
  }

  // TODO: `type` must be a valid TDS value type
  // TODO: This should be `Connection`, not `any`.

  // TODO: Figure out the type here.


  (0, _createClass3.default)(Request, [{
    key: 'addParameter',
    value: function addParameter(name, type, value, options) {
      if (options == null) {
        options = {};
      }

      var parameter = {
        type: type,
        name: name,
        value: value,
        output: options.output || (options.output = false),
        length: options.length,
        precision: options.precision,
        scale: options.scale
      };
      this.parameters.push(parameter);
      this.parametersByName[name] = parameter;
    }

    // TODO: `type` must be a valid TDS value type

  }, {
    key: 'addOutputParameter',
    value: function addOutputParameter(name, type, value, options) {
      if (options == null) {
        options = {};
      }
      options.output = true;
      this.addParameter(name, type, value, options);
    }
  }, {
    key: 'makeParamsParameter',
    value: function makeParamsParameter(parameters) {
      var paramsParameter = '';
      for (var i = 0, len = parameters.length; i < len; i++) {
        var parameter = parameters[i];
        if (paramsParameter.length > 0) {
          paramsParameter += ', ';
        }
        paramsParameter += '@' + parameter.name + ' ';
        paramsParameter += parameter.type.declaration(parameter);
        if (parameter.output) {
          paramsParameter += ' OUTPUT';
        }
      }
      return paramsParameter;
    }
  }, {
    key: 'transformIntoExecuteSqlRpc',
    value: function transformIntoExecuteSqlRpc() {
      if (this.validateParameters()) {
        return;
      }

      this.originalParameters = this.parameters;
      this.parameters = [];
      this.addParameter('statement', TYPES.NVarChar, this.sqlTextOrProcedure);
      if (this.originalParameters.length) {
        this.addParameter('params', TYPES.NVarChar, this.makeParamsParameter(this.originalParameters));
      }

      for (var i = 0, len = this.originalParameters.length; i < len; i++) {
        var parameter = this.originalParameters[i];
        this.parameters.push(parameter);
      }
      this.sqlTextOrProcedure = 'sp_executesql';
    }
  }, {
    key: 'transformIntoPrepareRpc',
    value: function transformIntoPrepareRpc() {
      var _this2 = this;

      this.originalParameters = this.parameters;
      this.parameters = [];
      this.addOutputParameter('handle', TYPES.Int);
      this.addParameter('params', TYPES.NVarChar, this.makeParamsParameter(this.originalParameters));
      this.addParameter('stmt', TYPES.NVarChar, this.sqlTextOrProcedure);
      this.sqlTextOrProcedure = 'sp_prepare';
      this.preparing = true;
      this.on('returnValue', function (name, value) {
        if (name === 'handle') {
          _this2.handle = value;
        } else {
          _this2.error = RequestError(`Tedious > Unexpected output parameter ${name} from sp_prepare`);
        }
      });
    }
  }, {
    key: 'transformIntoUnprepareRpc',
    value: function transformIntoUnprepareRpc() {
      this.parameters = [];
      this.addParameter('handle', TYPES.Int, this.handle);
      this.sqlTextOrProcedure = 'sp_unprepare';
    }
  }, {
    key: 'transformIntoExecuteRpc',
    value: function transformIntoExecuteRpc(parameters) {
      this.parameters = [];
      this.addParameter('handle', TYPES.Int, this.handle);

      for (var i = 0, len = this.originalParameters.length; i < len; i++) {
        var parameter = this.originalParameters[i];
        parameter.value = parameters[parameter.name];
        this.parameters.push(parameter);
      }

      if (this.validateParameters()) {
        return;
      }

      this.sqlTextOrProcedure = 'sp_execute';
    }
  }, {
    key: 'validateParameters',
    value: function validateParameters() {
      for (var i = 0, len = this.parameters.length; i < len; i++) {
        var parameter = this.parameters[i];
        var _value = parameter.type.validate(parameter.value);
        if (_value instanceof TypeError) {
          return this.error = new RequestError('Validation failed for parameter \'' + parameter.name + '\'. ' + _value.message, 'EPARAM');
        }
        parameter.value = _value;
      }
      return null;
    }

    // Temporarily suspends the flow of data from the database.
    // No more 'row' events will be emitted until resume() is called.

  }, {
    key: 'pause',
    value: function pause() {
      if (this.paused) {
        return;
      }
      this.paused = true;
      if (this.connection) {
        this.connection.pauseRequest(this);
      }
    }

    // Resumes the flow of data from the database.

  }, {
    key: 'resume',
    value: function resume() {
      if (!this.paused) {
        return;
      }
      this.paused = false;
      if (this.connection) {
        this.connection.resumeRequest(this);
      }
    }
  }]);
  return Request;
}(EventEmitter);