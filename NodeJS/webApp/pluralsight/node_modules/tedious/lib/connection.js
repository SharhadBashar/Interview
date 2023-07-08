'use strict';

var _isInteger = require('babel-runtime/core-js/number/is-integer');

var _isInteger2 = _interopRequireDefault(_isInteger);

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

var deprecate = require('depd')('tedious');

var BulkLoad = require('./bulk-load');
var Debug = require('./debug');
var EventEmitter = require('events').EventEmitter;
var InstanceLookup = require('./instance-lookup').InstanceLookup;
var TransientErrorLookup = require('./transient-error-lookup.js').TransientErrorLookup;
var TYPE = require('./packet').TYPE;
var PreloginPayload = require('./prelogin-payload');
var Login7Payload = require('./login7-payload');
var NTLMResponsePayload = require('./ntlm-payload');
var Request = require('./request');
var RpcRequestPayload = require('./rpcrequest-payload');
var SqlBatchPayload = require('./sqlbatch-payload');
var MessageIO = require('./message-io');
var TokenStreamParser = require('./token/token-stream-parser').Parser;
var Transaction = require('./transaction').Transaction;
var ISOLATION_LEVEL = require('./transaction').ISOLATION_LEVEL;
var crypto = require('crypto');
var ConnectionError = require('./errors').ConnectionError;
var RequestError = require('./errors').RequestError;
var Connector = require('./connector').Connector;

// A rather basic state machine for managing a connection.
// Implements something approximating s3.2.1.

var KEEP_ALIVE_INITIAL_DELAY = 30 * 1000;
var DEFAULT_CONNECT_TIMEOUT = 15 * 1000;
var DEFAULT_CLIENT_REQUEST_TIMEOUT = 15 * 1000;
var DEFAULT_CANCEL_TIMEOUT = 5 * 1000;
var DEFAULT_CONNECT_RETRY_INTERVAL = 500;
var DEFAULT_PACKET_SIZE = 4 * 1024;
var DEFAULT_TEXTSIZE = '2147483647';
var DEFAULT_DATEFIRST = 7;
var DEFAULT_PORT = 1433;
var DEFAULT_TDS_VERSION = '7_4';
var DEFAULT_LANGUAGE = 'us_english';
var DEFAULT_DATEFORMAT = 'mdy';

function deprecateNonBooleanConfigValue(optionName, value) {
  if (typeof value !== 'boolean') {
    deprecate(`Passing non-boolean values for ${optionName} is deprecated and will be removed. Please specify \`true\` or \`false\` instead.`);
  }
}

function deprecateNullConfigValue(optionName, value) {
  if (value === null) {
    deprecate(`Passing \`null\` for ${optionName} is deprecated and will be removed. Please pass an explicit value or \`undefined\` instead.`);
  }
}

function deprecateNullFallbackToDefaultConfigValue(optionName, value) {
  if (value === null) {
    deprecate(`Passing \`null\` for ${optionName} will not fallback to a default value in future tedious versions. Please set a value explicitly if you require a different value from the one configured for your target SQL Server.`);
  }
}

function deprecateNonStringConfigValue(optionName, value) {
  if (typeof value !== 'string') {
    deprecate(`Passing non-string values for ${optionName} will throw an error in future tedious versions. Please pass a string instead.`);
  }
}

function deprecateNonNumberConfigValue(optionName, value) {
  if (typeof value !== 'number') {
    deprecate(`Passing non-number values for ${optionName} will throw an error in future tedious versions. Please pass a number instead.`);
  }
}

var Connection = function (_EventEmitter) {
  (0, _inherits3.default)(Connection, _EventEmitter);

  function Connection(config) {
    (0, _classCallCheck3.default)(this, Connection);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Connection.__proto__ || (0, _getPrototypeOf2.default)(Connection)).call(this));

    if (!config) {
      throw new TypeError('No connection configuration given');
    }

    if (typeof config.server !== 'string') {
      throw new TypeError('Invalid server: ' + config.server);
    }

    if (config.domain != undefined) {
      deprecateNonStringConfigValue('domain', config.domain);
    }
    deprecateNullConfigValue('domain', config.domain);

    if (config.userName != undefined) {
      deprecateNonStringConfigValue('userName', config.userName);
    }
    deprecateNullConfigValue('userName', config.userName);

    if (config.password != undefined) {
      deprecateNonStringConfigValue('password', config.password);
    }
    deprecateNullConfigValue('password', config.password);

    _this.config = {
      server: config.server,
      userName: config.userName,
      password: config.password,
      domain: config.domain && config.domain.toUpperCase(),
      options: {
        abortTransactionOnError: false,
        appName: undefined,
        camelCaseColumns: false,
        cancelTimeout: DEFAULT_CANCEL_TIMEOUT,
        columnNameReplacer: undefined,
        connectionRetryInterval: DEFAULT_CONNECT_RETRY_INTERVAL,
        connectTimeout: DEFAULT_CONNECT_TIMEOUT,
        connectionIsolationLevel: ISOLATION_LEVEL.READ_COMMITTED,
        cryptoCredentialsDetails: {},
        database: undefined,
        datefirst: DEFAULT_DATEFIRST,
        dateFormat: DEFAULT_DATEFORMAT,
        debug: {
          data: false,
          packet: false,
          payload: false,
          token: false
        },
        enableAnsiNull: true,
        enableAnsiNullDefault: true,
        enableAnsiPadding: true,
        enableAnsiWarnings: true,
        enableArithAbort: false,
        enableConcatNullYieldsNull: true,
        enableCursorCloseOnCommit: undefined,
        enableImplicitTransactions: false,
        enableNumericRoundabort: false,
        enableQuotedIdentifier: true,
        encrypt: false,
        fallbackToDefaultDb: false,
        instanceName: undefined,
        isolationLevel: ISOLATION_LEVEL.READ_COMMITTED,
        language: DEFAULT_LANGUAGE,
        localAddress: undefined,
        maxRetriesOnTransientErrors: 3,
        multiSubnetFailover: false,
        packetSize: DEFAULT_PACKET_SIZE,
        port: DEFAULT_PORT,
        readOnlyIntent: false,
        requestTimeout: DEFAULT_CLIENT_REQUEST_TIMEOUT,
        rowCollectionOnDone: false,
        rowCollectionOnRequestCompletion: false,
        tdsVersion: DEFAULT_TDS_VERSION,
        textsize: DEFAULT_TEXTSIZE,
        trustServerCertificate: true,
        useColumnNames: false,
        useUTC: true
      }
    };

    if (config.options) {
      if (config.options.port && config.options.instanceName) {
        throw new Error('Port and instanceName are mutually exclusive, but ' + config.options.port + ' and ' + config.options.instanceName + ' provided');
      }

      if (config.options.abortTransactionOnError != undefined) {
        if (typeof config.options.abortTransactionOnError !== 'boolean') {
          throw new TypeError('options.abortTransactionOnError must be a boolean (true or false).');
        }

        _this.config.options.abortTransactionOnError = config.options.abortTransactionOnError;
      }
      deprecateNullFallbackToDefaultConfigValue('options.abortTransactionOnError', config.options.abortTransactionOnError);

      if (config.options.appName != undefined) {
        deprecateNonStringConfigValue('options.appName', config.options.appName);
        _this.config.options.appName = config.options.appName;
      }
      deprecateNullConfigValue('options.appName', config.options.appName);

      if (config.options.camelCaseColumns != undefined) {
        deprecateNonBooleanConfigValue('options.camelCaseColumns', config.options.camelCaseColumns);
        _this.config.options.camelCaseColumns = config.options.camelCaseColumns;
      }
      deprecateNullConfigValue('options.camelCaseColumns', config.options.camelCaseColumns);

      if (config.options.cancelTimeout != undefined) {
        _this.config.options.cancelTimeout = config.options.cancelTimeout;
      }
      deprecateNullConfigValue('options.cancelTimeout', config.options.cancelTimeout);

      if (config.options.columnNameReplacer) {
        if (typeof config.options.columnNameReplacer !== 'function') {
          throw new TypeError('options.columnNameReplacer must be a function or null.');
        }

        _this.config.options.columnNameReplacer = config.options.columnNameReplacer;
      }
      deprecateNullConfigValue('options.columnNameReplacer', config.options.columnNameReplacer);

      if (config.options.connectTimeout) {
        _this.config.options.connectTimeout = config.options.connectTimeout;
      }
      deprecateNullConfigValue('options.connectTimeout', config.options.connectTimeout);

      if (config.options.connectionIsolationLevel) {
        _this.config.options.connectionIsolationLevel = config.options.connectionIsolationLevel;
      }
      deprecateNullFallbackToDefaultConfigValue('options.connectionIsolationLevel', config.options.connectionIsolationLevel);

      if (config.options.cryptoCredentialsDetails) {
        _this.config.options.cryptoCredentialsDetails = config.options.cryptoCredentialsDetails;
      }
      deprecateNullConfigValue('options.cryptoCredentialsDetails', config.options.cryptoCredentialsDetails);

      if (config.options.database != undefined) {
        deprecateNonStringConfigValue('options.database', config.options.database);
        _this.config.options.database = config.options.database;
      }
      deprecateNullConfigValue('options.database', config.options.database);

      if (config.options.datefirst) {
        if (config.options.datefirst < 1 || config.options.datefirst > 7) {
          throw new RangeError('DateFirst should be >= 1 and <= 7');
        }

        deprecateNonNumberConfigValue('options.datefirst', config.options.datefirst);

        _this.config.options.datefirst = config.options.datefirst;
      }
      deprecateNullFallbackToDefaultConfigValue('options.datefirst', config.options.datefirst);

      if (config.options.dateFormat != undefined) {
        deprecateNonStringConfigValue('options.dateFormat', config.options.dateFormat);

        _this.config.options.dateFormat = config.options.dateFormat;
      }
      deprecateNullFallbackToDefaultConfigValue('options.dateFormat', config.options.dateFormat);

      if (config.options.debug) {
        if (config.options.debug.data != undefined) {
          deprecateNonBooleanConfigValue('options.debug.data', config.options.debug.data);
          _this.config.options.debug.data = config.options.debug.data;
        }
        deprecateNullConfigValue('options.debug.data', config.options.debug.data);

        if (config.options.debug.packet != undefined) {
          deprecateNonBooleanConfigValue('options.debug.packet', config.options.debug.packet);
          _this.config.options.debug.packet = config.options.debug.packet;
        }
        deprecateNullConfigValue('options.debug.packet', config.options.debug.packet);

        if (config.options.debug.payload != undefined) {
          deprecateNonBooleanConfigValue('options.debug.payload', config.options.debug.payload);
          _this.config.options.debug.payload = config.options.debug.payload;
        }
        deprecateNullConfigValue('options.debug.payload', config.options.debug.payload);

        if (config.options.debug.token != undefined) {
          deprecateNonBooleanConfigValue('options.debug.token', config.options.debug.token);
          _this.config.options.debug.token = config.options.debug.token;
        }
        deprecateNullConfigValue('options.debug.token', config.options.debug.token);
      }

      if (config.options.enableAnsiNull != undefined) {
        if (typeof config.options.enableAnsiNull !== 'boolean') {
          throw new TypeError('options.enableAnsiNull must be a boolean (true or false).');
        }

        _this.config.options.enableAnsiNull = config.options.enableAnsiNull;
      }
      deprecateNullFallbackToDefaultConfigValue('options.enableAnsiNull', config.options.enableAnsiNull);

      if (config.options.enableAnsiNullDefault != undefined) {
        if (typeof config.options.enableAnsiNullDefault !== 'boolean') {
          throw new TypeError('options.enableAnsiNullDefault must be a boolean (true or false).');
        }

        _this.config.options.enableAnsiNullDefault = config.options.enableAnsiNullDefault;
      }
      deprecateNullFallbackToDefaultConfigValue('options.enableAnsiNullDefault', config.options.enableAnsiNullDefault);

      if (config.options.enableAnsiPadding != undefined) {
        if (typeof config.options.enableAnsiPadding !== 'boolean') {
          throw new TypeError('options.enableAnsiPadding must be a boolean (true or false).');
        }

        _this.config.options.enableAnsiPadding = config.options.enableAnsiPadding;
      }
      deprecateNullFallbackToDefaultConfigValue('options.enableAnsiPadding', config.options.enableAnsiPadding);

      if (config.options.enableAnsiWarnings != undefined) {
        if (typeof config.options.enableAnsiWarnings !== 'boolean') {
          throw new TypeError('options.enableAnsiWarnings must be a boolean (true or false).');
        }

        _this.config.options.enableAnsiWarnings = config.options.enableAnsiWarnings;
      }
      deprecateNullFallbackToDefaultConfigValue('options.enableAnsiWarnings', config.options.enableAnsiWarnings);

      if (config.options.enableArithAbort !== undefined) {
        if (typeof config.options.enableArithAbort !== 'boolean') {
          throw new TypeError('options.enableArithAbort must be a boolean (true or false).');
        }

        _this.config.options.enableArithAbort = config.options.enableArithAbort;
      }
      deprecateNullFallbackToDefaultConfigValue('options.enableArithAbort', config.options.enableArithAbort);

      if (config.options.enableConcatNullYieldsNull != undefined) {
        if (typeof config.options.enableConcatNullYieldsNull !== 'boolean') {
          throw new TypeError('options.enableConcatNullYieldsNull must be a boolean (true or false).');
        }

        _this.config.options.enableConcatNullYieldsNull = config.options.enableConcatNullYieldsNull;
      }
      deprecateNullFallbackToDefaultConfigValue('options.enableConcatNullYieldsNull', config.options.enableConcatNullYieldsNull);

      if (config.options.enableCursorCloseOnCommit != undefined) {
        if (typeof config.options.enableCursorCloseOnCommit !== 'boolean') {
          throw new TypeError('options.enableCursorCloseOnCommit must be a boolean (true or false).');
        }

        _this.config.options.enableCursorCloseOnCommit = config.options.enableCursorCloseOnCommit;
      }
      deprecateNullFallbackToDefaultConfigValue('options.enableCursorCloseOnCommit', config.options.enableCursorCloseOnCommit);

      if (config.options.enableImplicitTransactions != undefined) {
        if (typeof config.options.enableImplicitTransactions !== 'boolean') {
          throw new TypeError('options.enableImplicitTransactions must be a boolean (true or false).');
        }

        _this.config.options.enableImplicitTransactions = config.options.enableImplicitTransactions;
      }
      deprecateNullFallbackToDefaultConfigValue('options.enableImplicitTransactions', config.options.enableImplicitTransactions);

      if (config.options.enableNumericRoundabort != undefined) {
        if (typeof config.options.enableNumericRoundabort !== 'boolean') {
          throw new TypeError('options.enableNumericRoundabort must be a boolean (true or false).');
        }

        _this.config.options.enableNumericRoundabort = config.options.enableNumericRoundabort;
      }
      deprecateNullFallbackToDefaultConfigValue('options.enableNumericRoundabort', config.options.enableNumericRoundabort);

      if (config.options.enableQuotedIdentifier !== undefined) {
        if (typeof config.options.enableQuotedIdentifier !== 'boolean') {
          throw new TypeError('options.enableQuotedIdentifier must be a boolean (true or false).');
        }

        _this.config.options.enableQuotedIdentifier = config.options.enableQuotedIdentifier;
      }
      deprecateNullFallbackToDefaultConfigValue('options.enableQuotedIdentifier', config.options.enableQuotedIdentifier);

      if (config.options.encrypt != undefined) {
        deprecateNonBooleanConfigValue('options.encrypt', config.options.encrypt);
        _this.config.options.encrypt = config.options.encrypt;
      } else {
        deprecate('The default value for `options.encrypt` will change from `false` to `true`. Please pass `false` explicitly if you want to retain current behaviour.');
      }
      deprecateNullConfigValue('options.encrypt', config.options.encrypt);

      if (config.options.fallbackToDefaultDb != undefined) {
        deprecateNonBooleanConfigValue('options.fallbackToDefaultDb', config.options.fallbackToDefaultDb);
        _this.config.options.fallbackToDefaultDb = config.options.fallbackToDefaultDb;
      }
      deprecateNullConfigValue('options.fallbackToDefaultDb', config.options.fallbackToDefaultDb);

      if (config.options.instanceName != undefined) {
        deprecateNonStringConfigValue('options.instanceName', config.options.instanceName);

        _this.config.options.instanceName = config.options.instanceName;
        _this.config.options.port = undefined;
      }
      deprecateNullConfigValue('options.instanceName', config.options.instanceName);

      if (config.options.isolationLevel) {
        _this.config.options.isolationLevel = config.options.isolationLevel;
      }
      deprecateNullConfigValue('options.isolationLevel', config.options.isolationLevel);

      if (config.options.language != undefined) {
        deprecateNonStringConfigValue('options.language', config.options.language);

        _this.config.options.language = config.options.language;
      }
      deprecateNullFallbackToDefaultConfigValue('options.language', config.options.language);

      if (config.options.localAddress != undefined) {
        _this.config.options.localAddress = config.options.localAddress;
      }
      deprecateNullConfigValue('options.localAddress', config.options.localAddress);

      if (config.options.multiSubnetFailover != undefined) {
        deprecateNonBooleanConfigValue('options.multiSubnetFailover', config.options.multiSubnetFailover);

        _this.config.options.multiSubnetFailover = !!config.options.multiSubnetFailover;
      }
      deprecateNullConfigValue('options.multiSubnetFailover', config.options.multiSubnetFailover);

      if (config.options.packetSize) {
        deprecateNonNumberConfigValue('options.packetSize', config.options.packetSize);

        _this.config.options.packetSize = config.options.packetSize;
      }
      deprecateNullConfigValue('options.packetSize', config.options.packetSize);

      if (config.options.port) {
        if (config.options.port <= 0 || config.options.port >= 65536) {
          throw new RangeError('Port must be > 0 and < 65536');
        }

        deprecateNonNumberConfigValue('options.port', config.options.port);

        _this.config.options.port = config.options.port;
        _this.config.options.instanceName = undefined;
      }
      deprecateNullConfigValue('options.port', config.options.port);

      if (config.options.readOnlyIntent != undefined) {
        deprecateNonBooleanConfigValue('options.readOnlyIntent', config.options.readOnlyIntent);
        _this.config.options.readOnlyIntent = config.options.readOnlyIntent;
      }
      deprecateNullConfigValue('options.readOnlyIntent', config.options.readOnlyIntent);

      if (config.options.requestTimeout != undefined) {
        deprecateNonNumberConfigValue('options.requestTimeout', config.options.requestTimeout);

        _this.config.options.requestTimeout = config.options.requestTimeout;
      }
      deprecateNullConfigValue('options.requestTimeout', config.options.requestTimeout);

      if (config.options.maxRetriesOnTransientErrors != undefined) {
        if (!(0, _isInteger2.default)(config.options.maxRetriesOnTransientErrors) || config.options.maxRetriesOnTransientErrors < 0) {
          throw new RangeError('options.maxRetriesOnTransientErrors must be a non-negative integer.');
        }

        _this.config.options.maxRetriesOnTransientErrors = config.options.maxRetriesOnTransientErrors;
      }
      deprecateNullConfigValue('options.maxRetriesOnTransientErrors', config.options.maxRetriesOnTransientErrors);

      if (config.options.connectionRetryInterval != undefined) {
        if (!(0, _isInteger2.default)(config.options.connectionRetryInterval) || config.options.connectionRetryInterval <= 0) {
          throw new TypeError('options.connectionRetryInterval must be a non-zero positive integer.');
        }

        _this.config.options.connectionRetryInterval = config.options.connectionRetryInterval;
      }
      deprecateNullConfigValue('options.connectionRetryInterval', config.options.connectionRetryInterval);

      if (config.options.rowCollectionOnDone != undefined) {
        deprecateNonBooleanConfigValue('options.rowCollectionOnDone', config.options.rowCollectionOnDone);
        _this.config.options.rowCollectionOnDone = config.options.rowCollectionOnDone;
      }
      deprecateNullConfigValue('options.rowCollectionOnDone', config.options.rowCollectionOnDone);

      if (config.options.rowCollectionOnRequestCompletion != undefined) {
        deprecateNonBooleanConfigValue('options.rowCollectionOnRequestCompletion', config.options.rowCollectionOnRequestCompletion);
        _this.config.options.rowCollectionOnRequestCompletion = config.options.rowCollectionOnRequestCompletion;
      }
      deprecateNullConfigValue('options.rowCollectionOnRequestCompletion', config.options.rowCollectionOnRequestCompletion);

      if (config.options.tdsVersion) {
        deprecateNonStringConfigValue('options.tdsVersion', config.options.tdsVersion);
        _this.config.options.tdsVersion = config.options.tdsVersion;
      }
      deprecateNullConfigValue('options.tdsVersion', config.options.tdsVersion);

      if (config.options.textsize) {
        deprecateNonNumberConfigValue('options.textsize', config.options.textsize);
        _this.config.options.textsize = config.options.textsize;
      }
      deprecateNullFallbackToDefaultConfigValue('options.textsize', config.options.textsize);

      if (config.options.trustServerCertificate != undefined) {
        deprecateNonBooleanConfigValue('options.trustServerCertificate', config.options.trustServerCertificate);
        _this.config.options.trustServerCertificate = config.options.trustServerCertificate;
      }
      deprecateNullConfigValue('options.trustServerCertificate', config.options.trustServerCertificate);

      if (config.options.useColumnNames != undefined) {
        deprecateNonBooleanConfigValue('options.useColumnNames', config.options.useColumnNames);
        _this.config.options.useColumnNames = config.options.useColumnNames;
      }
      deprecateNullConfigValue('options.useColumnNames', config.options.useColumnNames);

      if (config.options.useUTC != undefined) {
        deprecateNonBooleanConfigValue('options.useUTC', config.options.useUTC);
        _this.config.options.useUTC = config.options.useUTC;
      }
      deprecateNullConfigValue('options.useUTC', config.options.useUTC);
    }

    _this.createDebug();
    _this.createTokenStreamParser();
    _this.inTransaction = false;
    _this.transactionDescriptors = [new Buffer([0, 0, 0, 0, 0, 0, 0, 0])];
    _this.transitionTo(_this.STATE.CONNECTING);

    if (_this.config.options.tdsVersion < '7_2') {
      // 'beginTransaction', 'commitTransaction' and 'rollbackTransaction'
      // events are utilized to maintain inTransaction property state which in
      // turn is used in managing transactions. These events are only fired for
      // TDS version 7.2 and beyond. The properties below are used to emulate
      // equivalent behavior for TDS versions before 7.2.
      _this.transactionDepth = 0;
      _this.isSqlBatch = false;
    }

    _this.curTransientRetryCount = 0;
    _this.transientErrorLookup = new TransientErrorLookup();

    _this.cleanupTypeEnum = {
      NORMAL: 0,
      REDIRECT: 1,
      RETRY: 2
    };
    return _this;
  }

  (0, _createClass3.default)(Connection, [{
    key: 'close',
    value: function close() {
      this.transitionTo(this.STATE.FINAL);
    }
  }, {
    key: 'initialiseConnection',
    value: function initialiseConnection() {
      this.connect();
      this.createConnectTimer();
    }
  }, {
    key: 'cleanupConnection',
    value: function cleanupConnection(cleanupTypeEnum) {
      if (!this.closed) {
        this.clearConnectTimer();
        this.clearRequestTimer();
        this.clearRetryTimer();
        this.closeConnection();
        if (cleanupTypeEnum === this.cleanupTypeEnum.REDIRECT) {
          this.emit('rerouting');
        } else if (cleanupTypeEnum !== this.cleanupTypeEnum.RETRY) {
          this.emit('end');
        }
        if (this.request) {
          var err = RequestError('Connection closed before request completed.', 'ECLOSE');
          this.request.callback(err);
          this.request = undefined;
        }
        this.closed = true;
        this.loggedIn = false;
        this.loginError = null;
      }
    }
  }, {
    key: 'createDebug',
    value: function createDebug() {
      var _this2 = this;

      this.debug = new Debug(this.config.options.debug);
      this.debug.on('debug', function (message) {
        _this2.emit('debug', message);
      });
    }
  }, {
    key: 'createTokenStreamParser',
    value: function createTokenStreamParser() {
      var _this3 = this;

      this.tokenStreamParser = new TokenStreamParser(this.debug, undefined, this.config.options);

      this.tokenStreamParser.on('infoMessage', function (token) {
        _this3.emit('infoMessage', token);
      });

      this.tokenStreamParser.on('sspichallenge', function (token) {
        if (token.ntlmpacket) {
          _this3.ntlmpacket = token.ntlmpacket;
          _this3.ntlmpacketBuffer = token.ntlmpacketBuffer;
        }

        _this3.emit('sspichallenge', token);
      });

      this.tokenStreamParser.on('errorMessage', function (token) {
        _this3.emit('errorMessage', token);
        if (_this3.loggedIn) {
          if (_this3.request) {
            _this3.request.error = RequestError(token.message, 'EREQUEST');
            _this3.request.error.number = token.number;
            _this3.request.error.state = token.state;
            _this3.request.error['class'] = token['class'];
            _this3.request.error.serverName = token.serverName;
            _this3.request.error.procName = token.procName;
            _this3.request.error.lineNumber = token.lineNumber;
          }
        } else {
          var isLoginErrorTransient = _this3.transientErrorLookup.isTransientError(token.number);
          if (isLoginErrorTransient && _this3.curTransientRetryCount !== _this3.config.options.maxRetriesOnTransientErrors) {
            _this3.debug.log('Initiating retry on transient error = ', token.number);
            _this3.transitionTo(_this3.STATE.TRANSIENT_FAILURE_RETRY);
          } else {
            _this3.loginError = ConnectionError(token.message, 'ELOGIN');
          }
        }
      });

      this.tokenStreamParser.on('databaseChange', function (token) {
        _this3.emit('databaseChange', token.newValue);
      });

      this.tokenStreamParser.on('languageChange', function (token) {
        _this3.emit('languageChange', token.newValue);
      });

      this.tokenStreamParser.on('charsetChange', function (token) {
        _this3.emit('charsetChange', token.newValue);
      });

      this.tokenStreamParser.on('loginack', function (token) {
        if (!token.tdsVersion) {
          // unsupported TDS version
          _this3.loginError = ConnectionError('Server responded with unknown TDS version.', 'ETDS');
          _this3.loggedIn = false;
          return;
        }

        if (!token['interface']) {
          // unsupported interface
          _this3.loginError = ConnectionError('Server responded with unsupported interface.', 'EINTERFACENOTSUPP');
          _this3.loggedIn = false;
          return;
        }

        // use negotiated version
        _this3.config.options.tdsVersion = token.tdsVersion;
        _this3.loggedIn = true;
      });

      this.tokenStreamParser.on('routingChange', function (token) {
        _this3.routingData = token.newValue;
        _this3.dispatchEvent('routingChange');
      });

      this.tokenStreamParser.on('packetSizeChange', function (token) {
        _this3.messageIo.packetSize(token.newValue);
      });

      // A new top-level transaction was started. This is not fired
      // for nested transactions.
      this.tokenStreamParser.on('beginTransaction', function (token) {
        _this3.transactionDescriptors.push(token.newValue);
        _this3.inTransaction = true;
      });

      // A top-level transaction was committed. This is not fired
      // for nested transactions.
      this.tokenStreamParser.on('commitTransaction', function () {
        _this3.transactionDescriptors.length = 1;
        _this3.inTransaction = false;
      });

      // A top-level transaction was rolled back. This is not fired
      // for nested transactions. This is also fired if a batch
      // aborting error happened that caused a rollback.
      this.tokenStreamParser.on('rollbackTransaction', function () {
        _this3.transactionDescriptors.length = 1;
        // An outermost transaction was rolled back. Reset the transaction counter
        _this3.inTransaction = false;
        _this3.emit('rollbackTransaction');
      });

      this.tokenStreamParser.on('columnMetadata', function (token) {
        if (_this3.request) {
          var columns = void 0;
          if (_this3.config.options.useColumnNames) {
            columns = {};
            for (var j = 0, len = token.columns.length; j < len; j++) {
              var col = token.columns[j];
              if (columns[col.colName] == null) {
                columns[col.colName] = col;
              }
            }
          } else {
            columns = token.columns;
          }
          _this3.request.emit('columnMetadata', columns);
        } else {
          _this3.emit('error', new Error("Received 'columnMetadata' when no sqlRequest is in progress"));
          _this3.close();
        }
      });

      this.tokenStreamParser.on('order', function (token) {
        if (_this3.request) {
          _this3.request.emit('order', token.orderColumns);
        } else {
          _this3.emit('error', new Error("Received 'order' when no sqlRequest is in progress"));
          _this3.close();
        }
      });

      this.tokenStreamParser.on('row', function (token) {
        if (_this3.request) {
          if (_this3.config.options.rowCollectionOnRequestCompletion) {
            _this3.request.rows.push(token.columns);
          }
          if (_this3.config.options.rowCollectionOnDone) {
            _this3.request.rst.push(token.columns);
          }
          if (!(_this3.state === _this3.STATE.SENT_ATTENTION && _this3.request.paused)) {
            _this3.request.emit('row', token.columns);
          }
        } else {
          _this3.emit('error', new Error("Received 'row' when no sqlRequest is in progress"));
          _this3.close();
        }
      });

      this.tokenStreamParser.on('returnStatus', function (token) {
        if (_this3.request) {
          // Keep value for passing in 'doneProc' event.
          _this3.procReturnStatusValue = token.value;
        }
      });

      this.tokenStreamParser.on('returnValue', function (token) {
        if (_this3.request) {
          _this3.request.emit('returnValue', token.paramName, token.value, token.metadata);
        }
      });

      this.tokenStreamParser.on('doneProc', function (token) {
        if (_this3.request) {
          _this3.request.emit('doneProc', token.rowCount, token.more, _this3.procReturnStatusValue, _this3.request.rst);
          _this3.procReturnStatusValue = undefined;
          if (token.rowCount !== undefined) {
            _this3.request.rowCount += token.rowCount;
          }
          if (_this3.config.options.rowCollectionOnDone) {
            _this3.request.rst = [];
          }
        }
      });

      this.tokenStreamParser.on('doneInProc', function (token) {
        if (_this3.request) {
          _this3.request.emit('doneInProc', token.rowCount, token.more, _this3.request.rst);
          if (token.rowCount !== undefined) {
            _this3.request.rowCount += token.rowCount;
          }
          if (_this3.config.options.rowCollectionOnDone) {
            _this3.request.rst = [];
          }
        }
      });

      this.tokenStreamParser.on('done', function (token) {
        if (_this3.request) {
          if (token.attention) {
            _this3.dispatchEvent('attention');
          }
          if (token.sqlError && !_this3.request.error) {
            // check if the DONE_ERROR flags was set, but an ERROR token was not sent.
            _this3.request.error = RequestError('An unknown error has occurred.', 'UNKNOWN');
          }
          _this3.request.emit('done', token.rowCount, token.more, _this3.request.rst);
          if (token.rowCount !== undefined) {
            _this3.request.rowCount += token.rowCount;
          }
          if (_this3.config.options.rowCollectionOnDone) {
            _this3.request.rst = [];
          }
        }
      });

      this.tokenStreamParser.on('endOfMessage', function () {
        // EOM pseudo token received
        if (_this3.state === _this3.STATE.SENT_CLIENT_REQUEST) {
          _this3.dispatchEvent('endOfMessageMarkerReceived');
        }
      });

      this.tokenStreamParser.on('resetConnection', function () {
        _this3.emit('resetConnection');
      });

      this.tokenStreamParser.on('tokenStreamError', function (error) {
        _this3.emit('error', error);
        _this3.close();
      });

      this.tokenStreamParser.on('drain', function () {
        // Bridge the release of backpressure from the token stream parser
        // transform to the packet stream transform.
        _this3.messageIo.resume();
      });
    }
  }, {
    key: 'connect',
    value: function connect() {
      var _this4 = this;

      if (this.config.options.port) {
        return this.connectOnPort(this.config.options.port, this.config.options.multiSubnetFailover);
      } else {
        return new InstanceLookup().instanceLookup({
          server: this.config.server,
          instanceName: this.config.options.instanceName,
          timeout: this.config.options.connectTimeout
        }, function (message, port) {
          if (_this4.state === _this4.STATE.FINAL) {
            return;
          }
          if (message) {
            _this4.emit('connect', ConnectionError(message, 'EINSTLOOKUP'));
          } else {
            _this4.connectOnPort(port, _this4.config.options.multiSubnetFailover);
          }
        });
      }
    }
  }, {
    key: 'connectOnPort',
    value: function connectOnPort(port, multiSubnetFailover) {
      var _this5 = this;

      var connectOpts = {
        host: this.routingData ? this.routingData.server : this.config.server,
        port: this.routingData ? this.routingData.port : port,
        localAddress: this.config.options.localAddress
      };

      new Connector(connectOpts, multiSubnetFailover).execute(function (err, socket) {
        if (err) {
          return _this5.socketError(err);
        }

        if (_this5.state === _this5.STATE.FINAL) {
          socket.destroy();
          return;
        }

        _this5.socket = socket;
        _this5.socket.on('error', function (error) {
          _this5.socketError(error);
        });
        _this5.socket.on('close', function () {
          _this5.socketClose();
        });
        _this5.socket.on('end', function () {
          _this5.socketEnd();
        });
        _this5.messageIo = new MessageIO(_this5.socket, _this5.config.options.packetSize, _this5.debug);
        _this5.messageIo.on('data', function (data) {
          _this5.dispatchEvent('data', data);
        });
        _this5.messageIo.on('message', function () {
          _this5.dispatchEvent('message');
        });
        _this5.messageIo.on('secure', function (cleartext) {
          _this5.emit('secure', cleartext);
        });

        _this5.socketConnect();
      });
    }
  }, {
    key: 'closeConnection',
    value: function closeConnection() {
      if (this.socket) {
        this.socket.destroy();
      }
    }
  }, {
    key: 'createConnectTimer',
    value: function createConnectTimer() {
      var _this6 = this;

      this.connectTimer = setTimeout(function () {
        _this6.connectTimeout();
      }, this.config.options.connectTimeout);
    }
  }, {
    key: 'createRequestTimer',
    value: function createRequestTimer() {
      var _this7 = this;

      this.clearRequestTimer(); // release old timer, just to be safe
      if (this.config.options.requestTimeout) {
        this.requestTimer = setTimeout(function () {
          _this7.requestTimeout();
        }, this.config.options.requestTimeout);
      }
    }
  }, {
    key: 'createRetryTimer',
    value: function createRetryTimer() {
      var _this8 = this;

      this.clearRetryTimer();
      this.retryTimer = setTimeout(function () {
        _this8.retryTimeout();
      }, this.config.options.connectionRetryInterval);
    }
  }, {
    key: 'connectTimeout',
    value: function connectTimeout() {
      var message = `Failed to connect to ${this.config.server}${this.config.options.port ? `:${this.config.options.port}` : `\\${this.config.options.instanceName}`} in ${this.config.options.connectTimeout}ms`;
      this.debug.log(message);
      this.emit('connect', ConnectionError(message, 'ETIMEOUT'));
      this.connectTimer = undefined;
      this.dispatchEvent('connectTimeout');
    }
  }, {
    key: 'requestTimeout',
    value: function requestTimeout() {
      this.requestTimer = undefined;
      this.messageIo.sendMessage(TYPE.ATTENTION);
      this.transitionTo(this.STATE.SENT_ATTENTION);
    }
  }, {
    key: 'retryTimeout',
    value: function retryTimeout() {
      this.retryTimer = undefined;
      this.emit('retry');
      this.transitionTo(this.STATE.CONNECTING);
    }
  }, {
    key: 'clearConnectTimer',
    value: function clearConnectTimer() {
      if (this.connectTimer) {
        clearTimeout(this.connectTimer);
      }
    }
  }, {
    key: 'clearRequestTimer',
    value: function clearRequestTimer() {
      if (this.requestTimer) {
        clearTimeout(this.requestTimer);
        this.requestTimer = undefined;
      }
    }
  }, {
    key: 'clearRetryTimer',
    value: function clearRetryTimer() {
      if (this.retryTimer) {
        clearTimeout(this.retryTimer);
        this.retryTimer = undefined;
      }
    }
  }, {
    key: 'transitionTo',
    value: function transitionTo(newState) {
      if (this.state === newState) {
        this.debug.log('State is already ' + newState.name);
        return;
      }

      if (this.state && this.state.exit) {
        this.state.exit.call(this, newState);
      }

      this.debug.log('State change: ' + (this.state ? this.state.name : undefined) + ' -> ' + newState.name);
      this.state = newState;

      if (this.state.enter) {
        this.state.enter.apply(this);
      }
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(eventName) {
      if (this.state.events[eventName]) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        this.state.events[eventName].apply(this, args);
      } else {
        this.emit('error', new Error(`No event '${eventName}' in state '${this.state.name}'`));
        this.close();
      }
    }
  }, {
    key: 'socketError',
    value: function socketError(error) {
      if (this.state === this.STATE.CONNECTING || this.state === this.STATE.SENT_TLSSSLNEGOTIATION) {
        var message = `Failed to connect to ${this.config.server}:${this.config.options.port} - ${error.message}`;
        this.debug.log(message);
        this.emit('connect', ConnectionError(message, 'ESOCKET'));
      } else {
        var _message = `Connection lost - ${error.message}`;
        this.debug.log(_message);
        this.emit('error', ConnectionError(_message, 'ESOCKET'));
      }
      this.dispatchEvent('socketError', error);
    }
  }, {
    key: 'socketConnect',
    value: function socketConnect() {
      this.socket.setKeepAlive(true, KEEP_ALIVE_INITIAL_DELAY);
      this.closed = false;
      this.debug.log('connected to ' + this.config.server + ':' + this.config.options.port);
      this.dispatchEvent('socketConnect');
    }
  }, {
    key: 'socketEnd',
    value: function socketEnd() {
      this.debug.log('socket ended');
      this.transitionTo(this.STATE.FINAL);
    }
  }, {
    key: 'socketClose',
    value: function socketClose() {
      this.debug.log('connection to ' + this.config.server + ':' + this.config.options.port + ' closed');
      if (this.state === this.STATE.REROUTING) {
        this.debug.log('Rerouting to ' + this.routingData.server + ':' + this.routingData.port);
        this.dispatchEvent('reconnect');
      } else if (this.state === this.STATE.TRANSIENT_FAILURE_RETRY) {
        var server = this.routingData ? this.routingData.server : this.server;
        var port = this.routingData ? this.routingData.port : this.config.options.port;
        this.debug.log('Retry after transient failure connecting to ' + server + ':' + port);

        this.dispatchEvent('retry');
      } else {
        this.transitionTo(this.STATE.FINAL);
      }
    }
  }, {
    key: 'sendPreLogin',
    value: function sendPreLogin() {
      var payload = new PreloginPayload({
        encrypt: this.config.options.encrypt
      });
      this.messageIo.sendMessage(TYPE.PRELOGIN, payload.data);
      this.debug.payload(function () {
        return payload.toString('  ');
      });
    }
  }, {
    key: 'emptyMessageBuffer',
    value: function emptyMessageBuffer() {
      this.messageBuffer = new Buffer(0);
    }
  }, {
    key: 'addToMessageBuffer',
    value: function addToMessageBuffer(data) {
      this.messageBuffer = Buffer.concat([this.messageBuffer, data]);
    }
  }, {
    key: 'processPreLoginResponse',
    value: function processPreLoginResponse() {
      var preloginPayload = new PreloginPayload(this.messageBuffer);
      this.debug.payload(function () {
        return preloginPayload.toString('  ');
      });

      if (preloginPayload.encryptionString === 'ON' || preloginPayload.encryptionString === 'REQ') {
        if (!this.config.options.encrypt) {
          this.emit('connect', ConnectionError("Server requires encryption, set 'encrypt' config option to true.", 'EENCRYPT'));
          return this.close();
        }

        this.dispatchEvent('tls');
      } else {
        this.dispatchEvent('noTls');
      }
    }
  }, {
    key: 'sendLogin7Packet',
    value: function sendLogin7Packet(cb) {
      var sendPayload = function sendPayload(clientResponse) {
        var payload = new Login7Payload({
          domain: this.config.domain,
          userName: this.config.userName,
          password: this.config.password,
          database: this.config.options.database,
          serverName: this.routingData ? this.routingData.server : this.config.server,
          appName: this.config.options.appName,
          packetSize: this.config.options.packetSize,
          tdsVersion: this.config.options.tdsVersion,
          initDbFatal: !this.config.options.fallbackToDefaultDb,
          readOnlyIntent: this.config.options.readOnlyIntent,
          sspiBlob: clientResponse,
          language: this.config.options.language
        });

        this.routingData = undefined;
        this.messageIo.sendMessage(TYPE.LOGIN7, payload.data);

        this.debug.payload(function () {
          return payload.toString('  ');
        });
      };

      sendPayload.call(this);
      process.nextTick(cb);
    }
  }, {
    key: 'sendNTLMResponsePacket',
    value: function sendNTLMResponsePacket() {
      var _this9 = this;

      var payload = new NTLMResponsePayload({
        domain: this.config.domain,
        userName: this.config.userName,
        password: this.config.password,
        database: this.config.options.database,
        appName: this.config.options.appName,
        packetSize: this.config.options.packetSize,
        tdsVersion: this.config.options.tdsVersion,
        ntlmpacket: this.ntlmpacket,
        additional: this.additional
      });

      this.messageIo.sendMessage(TYPE.NTLMAUTH_PKT, payload.data);
      this.debug.payload(function () {
        return payload.toString('  ');
      });

      process.nextTick(function () {
        _this9.transitionTo(_this9.STATE.SENT_NTLM_RESPONSE);
      });
    }

    // Returns false to apply backpressure.

  }, {
    key: 'sendDataToTokenStreamParser',
    value: function sendDataToTokenStreamParser(data) {
      return this.tokenStreamParser.addBuffer(data);
    }

    // This is an internal method that is called from Request.pause().
    // It has to check whether the passed Request object represents the currently
    // active request, because the application might have called Request.pause()
    // on an old inactive Request object.

  }, {
    key: 'pauseRequest',
    value: function pauseRequest(request) {
      if (this.isRequestActive(request)) {
        this.tokenStreamParser.pause();
      }
    }

    // This is an internal method that is called from Request.resume().

  }, {
    key: 'resumeRequest',
    value: function resumeRequest(request) {
      if (this.isRequestActive(request)) {
        this.tokenStreamParser.resume();
      }
    }

    // Returns true if the passed request is the currently active request of the connection.

  }, {
    key: 'isRequestActive',
    value: function isRequestActive(request) {
      return request === this.request && this.state === this.STATE.SENT_CLIENT_REQUEST;
    }
  }, {
    key: 'sendInitialSql',
    value: function sendInitialSql() {
      var payload = new SqlBatchPayload(this.getInitialSql(), this.currentTransactionDescriptor(), this.config.options);
      return this.messageIo.sendMessage(TYPE.SQL_BATCH, payload.data);
    }
  }, {
    key: 'getInitialSql',
    value: function getInitialSql() {
      var options = [];

      if (this.config.options.enableAnsiNull) {
        options.push('set ansi_nulls on');
      } else {
        options.push('set ansi_nulls off');
      }

      if (this.config.options.enableAnsiNullDefault) {
        options.push('set ansi_null_dflt_on on');
      } else {
        options.push('set ansi_null_dflt_on off');
      }

      if (this.config.options.enableAnsiPadding) {
        options.push('set ansi_padding on');
      } else {
        options.push('set ansi_padding off');
      }

      if (this.config.options.enableAnsiWarnings) {
        options.push('set ansi_warnings on');
      } else {
        options.push('set ansi_warnings off');
      }

      if (this.config.options.enableArithAbort) {
        options.push('set arithabort on');
      } else {
        options.push('set arithabort off');
      }

      if (this.config.options.enableConcatNullYieldsNull) {
        options.push('set concat_null_yields_null on');
      } else {
        options.push('set concat_null_yields_null off');
      }

      if (this.config.options.enableCursorCloseOnCommit !== undefined) {
        if (this.config.options.enableCursorCloseOnCommit) {
          options.push('set cursor_close_on_commit on');
        } else {
          options.push('set cursor_close_on_commit off');
        }
      }

      options.push(`set datefirst ${this.config.options.datefirst}`);
      options.push(`set dateformat ${this.config.options.dateFormat}`);

      if (this.config.options.enableImplicitTransactions) {
        options.push('set implicit_transactions on');
      } else {
        options.push('set implicit_transactions off');
      }

      options.push(`set language ${this.config.options.language}`);

      if (this.config.options.enableNumericRoundabort) {
        options.push('set numeric_roundabort on');
      } else {
        options.push('set numeric_roundabort off');
      }

      if (this.config.options.enableQuotedIdentifier) {
        options.push('set quoted_identifier on');
      } else {
        options.push('set quoted_identifier off');
      }

      options.push(`set textsize ${this.config.options.textsize}`);
      options.push(`set transaction isolation level ${this.getIsolationLevelText(this.config.options.connectionIsolationLevel)}`);

      if (this.config.options.abortTransactionOnError) {
        options.push('set xact_abort on');
      } else {
        options.push('set xact_abort off');
      }

      return options.join('\n');
    }
  }, {
    key: 'processedInitialSql',
    value: function processedInitialSql() {
      this.clearConnectTimer();
      this.emit('connect');
    }
  }, {
    key: 'processLogin7Response',
    value: function processLogin7Response() {
      if (this.loggedIn) {
        this.dispatchEvent('loggedIn');
      } else {
        if (this.loginError) {
          this.emit('connect', this.loginError);
        } else {
          this.emit('connect', ConnectionError('Login failed.', 'ELOGIN'));
        }
        this.dispatchEvent('loginFailed');
      }
    }
  }, {
    key: 'processLogin7NTLMResponse',
    value: function processLogin7NTLMResponse() {
      if (this.ntlmpacket) {
        this.dispatchEvent('receivedChallenge');
      } else {
        if (this.loginError) {
          this.emit('connect', this.loginError);
        } else {
          this.emit('connect', ConnectionError('Login failed.', 'ELOGIN'));
        }
        this.dispatchEvent('loginFailed');
      }
    }
  }, {
    key: 'processLogin7NTLMAck',
    value: function processLogin7NTLMAck() {
      if (this.loggedIn) {
        this.dispatchEvent('loggedIn');
      } else {
        if (this.loginError) {
          this.emit('connect', this.loginError);
        } else {
          this.emit('connect', ConnectionError('Login failed.', 'ELOGIN'));
        }
        this.dispatchEvent('loginFailed');
      }
    }
  }, {
    key: 'execSqlBatch',
    value: function execSqlBatch(request) {
      this.makeRequest(request, TYPE.SQL_BATCH, new SqlBatchPayload(request.sqlTextOrProcedure, this.currentTransactionDescriptor(), this.config.options));
    }
  }, {
    key: 'execSql',
    value: function execSql(request) {
      var _this10 = this;

      request.transformIntoExecuteSqlRpc();

      if (request.error != null) {
        process.nextTick(function () {
          _this10.debug.log(request.error.message);
          request.callback(request.error);
        });
        return;
      }

      this.makeRequest(request, TYPE.RPC_REQUEST, new RpcRequestPayload(request, this.currentTransactionDescriptor(), this.config.options));
    }

    /**
     @function newBulkLoad
     @param {string} table - Table's name.
     @param {Object} [options] - BulkLoad options.
     @param {boolean} [options.checkConstraints=false] - Honors constraints during bulk load, it is disabled by default.
     @param {boolean} [options.fireTriggers=false] - Honors insert triggers during bulk load, it is disabled by default.
     @param {boolean} [options.keepNulls=false] - Honors null value passed, ignores the default values set on table.
     @param {boolean} [options.tableLock=false] - Places a bulk update(BU) lock on table while performing bulk load. Uses row locks by default.
     @param {callback} callback - Function to call after BulkLoad executes.
    */

  }, {
    key: 'newBulkLoad',
    value: function newBulkLoad(table, options, callback) {
      if (callback === undefined) {
        callback = options;
        options = {};
      }
      if (typeof options !== 'object') {
        throw new TypeError('"options" argument must be an object');
      }
      return new BulkLoad(table, this.config.options, options, callback);
    }
  }, {
    key: 'execBulkLoad',
    value: function execBulkLoad(bulkLoad) {
      var _this11 = this;

      var request = new Request(bulkLoad.getBulkInsertSql(), function (error) {
        if (error) {
          if (error.code === 'UNKNOWN') {
            error.message += ' This is likely because the schema of the BulkLoad does not match the schema of the table you are attempting to insert into.';
          }
          bulkLoad.error = error;
          bulkLoad.callback(error);
        } else {
          _this11.makeRequest(bulkLoad, TYPE.BULK_LOAD, bulkLoad.getPayload());
        }
      });

      this.execSqlBatch(request);
    }
  }, {
    key: 'prepare',
    value: function prepare(request) {
      request.transformIntoPrepareRpc();
      this.makeRequest(request, TYPE.RPC_REQUEST, new RpcRequestPayload(request, this.currentTransactionDescriptor(), this.config.options));
    }
  }, {
    key: 'unprepare',
    value: function unprepare(request) {
      request.transformIntoUnprepareRpc();
      this.makeRequest(request, TYPE.RPC_REQUEST, new RpcRequestPayload(request, this.currentTransactionDescriptor(), this.config.options));
    }
  }, {
    key: 'execute',
    value: function execute(request, parameters) {
      var _this12 = this;

      request.transformIntoExecuteRpc(parameters);

      if (request.error != null) {
        process.nextTick(function () {
          _this12.debug.log(request.error.message);
          request.callback(request.error);
        });

        return;
      }

      this.makeRequest(request, TYPE.RPC_REQUEST, new RpcRequestPayload(request, this.currentTransactionDescriptor(), this.config.options));
    }
  }, {
    key: 'callProcedure',
    value: function callProcedure(request) {
      var _this13 = this;

      request.validateParameters();

      if (request.error != null) {
        process.nextTick(function () {
          _this13.debug.log(request.error.message);
          request.callback(request.error);
        });
        return;
      }

      this.makeRequest(request, TYPE.RPC_REQUEST, new RpcRequestPayload(request, this.currentTransactionDescriptor(), this.config.options));
    }
  }, {
    key: 'beginTransaction',
    value: function beginTransaction(callback, name, isolationLevel) {
      var _this14 = this;

      isolationLevel || (isolationLevel = this.config.options.isolationLevel);
      var transaction = new Transaction(name || '', isolationLevel);
      if (this.config.options.tdsVersion < '7_2') {
        return this.execSqlBatch(new Request('SET TRANSACTION ISOLATION LEVEL ' + transaction.isolationLevelToTSQL() + ';BEGIN TRAN ' + transaction.name, function () {
          _this14.transactionDepth++;
          if (_this14.transactionDepth === 1) {
            _this14.inTransaction = true;
          }
          callback.apply(undefined, arguments);
        }));
      }

      var request = new Request(undefined, function (err) {
        return callback(err, _this14.currentTransactionDescriptor());
      });
      return this.makeRequest(request, TYPE.TRANSACTION_MANAGER, transaction.beginPayload(this.currentTransactionDescriptor()));
    }
  }, {
    key: 'commitTransaction',
    value: function commitTransaction(callback, name) {
      var _this15 = this;

      var transaction = new Transaction(name || '');
      if (this.config.options.tdsVersion < '7_2') {
        return this.execSqlBatch(new Request('COMMIT TRAN ' + transaction.name, function () {
          _this15.transactionDepth--;
          if (_this15.transactionDepth === 0) {
            _this15.inTransaction = false;
          }
          callback.apply(undefined, arguments);
        }));
      }
      var request = new Request(undefined, callback);
      return this.makeRequest(request, TYPE.TRANSACTION_MANAGER, transaction.commitPayload(this.currentTransactionDescriptor()));
    }
  }, {
    key: 'rollbackTransaction',
    value: function rollbackTransaction(callback, name) {
      var _this16 = this;

      var transaction = new Transaction(name || '');
      if (this.config.options.tdsVersion < '7_2') {
        return this.execSqlBatch(new Request('ROLLBACK TRAN ' + transaction.name, function () {
          _this16.transactionDepth--;
          if (_this16.transactionDepth === 0) {
            _this16.inTransaction = false;
          }
          callback.apply(undefined, arguments);
        }));
      }
      var request = new Request(undefined, callback);
      return this.makeRequest(request, TYPE.TRANSACTION_MANAGER, transaction.rollbackPayload(this.currentTransactionDescriptor()));
    }
  }, {
    key: 'saveTransaction',
    value: function saveTransaction(callback, name) {
      var _this17 = this;

      var transaction = new Transaction(name);
      if (this.config.options.tdsVersion < '7_2') {
        return this.execSqlBatch(new Request('SAVE TRAN ' + transaction.name, function () {
          _this17.transactionDepth++;
          callback.apply(undefined, arguments);
        }));
      }
      var request = new Request(undefined, callback);
      return this.makeRequest(request, TYPE.TRANSACTION_MANAGER, transaction.savePayload(this.currentTransactionDescriptor()));
    }
  }, {
    key: 'transaction',
    value: function transaction(cb, isolationLevel) {
      var _this18 = this;

      if (typeof cb !== 'function') {
        throw new TypeError('`cb` must be a function');
      }

      var useSavepoint = this.inTransaction;
      var name = '_tedious_' + crypto.randomBytes(10).toString('hex');
      var txDone = function txDone(err, done) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        if (err) {
          if (_this18.inTransaction && _this18.state === _this18.STATE.LOGGED_IN) {
            return _this18.rollbackTransaction(function (txErr) {
              done.apply(undefined, [txErr || err].concat(args));
            }, name);
          } else {
            return process.nextTick(function () {
              done.apply(undefined, [err].concat(args));
            });
          }
        } else {
          if (useSavepoint) {
            return process.nextTick(function () {
              if (_this18.config.options.tdsVersion < '7_2') {
                _this18.transactionDepth--;
              }
              done.apply(undefined, [null].concat(args));
            });
          } else {
            return _this18.commitTransaction(function (txErr) {
              done.apply(undefined, [txErr].concat(args));
            }, name);
          }
        }
      };

      if (useSavepoint) {
        return this.saveTransaction(function (err) {
          if (err) {
            return cb(err);
          }

          if (isolationLevel) {
            return _this18.execSqlBatch(new Request('SET transaction isolation level ' + _this18.getIsolationLevelText(isolationLevel), function (err) {
              return cb(err, txDone);
            }));
          } else {
            return cb(null, txDone);
          }
        }, name);
      } else {
        return this.beginTransaction(function (err) {
          if (err) {
            return cb(err);
          }

          return cb(null, txDone);
        }, name, isolationLevel);
      }
    }
  }, {
    key: 'makeRequest',
    value: function makeRequest(request, packetType, payload) {
      if (this.state !== this.STATE.LOGGED_IN) {
        var message = 'Requests can only be made in the ' + this.STATE.LOGGED_IN.name + ' state, not the ' + this.state.name + ' state';
        this.debug.log(message);
        request.callback(RequestError(message, 'EINVALIDSTATE'));
      } else {
        if (packetType === TYPE.SQL_BATCH) {
          this.isSqlBatch = true;
        } else {
          this.isSqlBatch = false;
        }

        this.request = request;
        this.request.connection = this;
        this.request.rowCount = 0;
        this.request.rows = [];
        this.request.rst = [];
        this.createRequestTimer();
        this.messageIo.sendMessage(packetType, payload.data, this.resetConnectionOnNextRequest);
        this.resetConnectionOnNextRequest = false;
        this.debug.payload(function () {
          return payload.toString('  ');
        });
        this.transitionTo(this.STATE.SENT_CLIENT_REQUEST);
        if (request.paused) {
          // Request.pause() has been called before the request was started
          this.pauseRequest(request);
        }
      }
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      if (this.state !== this.STATE.SENT_CLIENT_REQUEST) {
        var message = 'Requests can only be canceled in the ' + this.STATE.SENT_CLIENT_REQUEST.name + ' state, not the ' + this.state.name + ' state';
        this.debug.log(message);
        return false;
      } else {
        this.request.canceled = true;
        this.messageIo.sendMessage(TYPE.ATTENTION);
        this.transitionTo(this.STATE.SENT_ATTENTION);
        return true;
      }
    }
  }, {
    key: 'reset',
    value: function reset(callback) {
      var _this19 = this;

      var request = new Request(this.getInitialSql(), function (err) {
        if (_this19.config.options.tdsVersion < '7_2') {
          _this19.inTransaction = false;
        }
        callback(err);
      });
      this.resetConnectionOnNextRequest = true;
      return this.execSqlBatch(request);
    }
  }, {
    key: 'currentTransactionDescriptor',
    value: function currentTransactionDescriptor() {
      return this.transactionDescriptors[this.transactionDescriptors.length - 1];
    }
  }, {
    key: 'getIsolationLevelText',
    value: function getIsolationLevelText(isolationLevel) {
      switch (isolationLevel) {
        case ISOLATION_LEVEL.READ_UNCOMMITTED:
          return 'read uncommitted';
        case ISOLATION_LEVEL.REPEATABLE_READ:
          return 'repeatable read';
        case ISOLATION_LEVEL.SERIALIZABLE:
          return 'serializable';
        case ISOLATION_LEVEL.SNAPSHOT:
          return 'snapshot';
        default:
          return 'read committed';
      }
    }
  }]);
  return Connection;
}(EventEmitter);

module.exports = Connection;

Connection.prototype.STATE = {
  CONNECTING: {
    name: 'Connecting',
    enter: function enter() {
      this.initialiseConnection();
    },
    events: {
      socketError: function socketError() {
        this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function connectTimeout() {
        this.transitionTo(this.STATE.FINAL);
      },
      socketConnect: function socketConnect() {
        this.sendPreLogin();
        this.transitionTo(this.STATE.SENT_PRELOGIN);
      }
    }
  },
  SENT_PRELOGIN: {
    name: 'SentPrelogin',
    enter: function enter() {
      this.emptyMessageBuffer();
    },
    events: {
      socketError: function socketError() {
        this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function connectTimeout() {
        this.transitionTo(this.STATE.FINAL);
      },
      data: function data(_data) {
        this.addToMessageBuffer(_data);
      },
      message: function message() {
        this.processPreLoginResponse();
      },
      noTls: function noTls() {
        var _this20 = this;

        this.sendLogin7Packet(function () {
          if (_this20.config.domain) {
            _this20.transitionTo(_this20.STATE.SENT_LOGIN7_WITH_NTLM);
          } else {
            _this20.transitionTo(_this20.STATE.SENT_LOGIN7_WITH_STANDARD_LOGIN);
          }
        });
      },
      tls: function tls() {
        this.messageIo.startTls(this.config.options.cryptoCredentialsDetails, this.config.server, this.config.options.trustServerCertificate);
        this.transitionTo(this.STATE.SENT_TLSSSLNEGOTIATION);
      }
    }
  },
  REROUTING: {
    name: 'ReRouting',
    enter: function enter() {
      this.cleanupConnection(this.cleanupTypeEnum.REDIRECT);
    },
    events: {
      message: function message() {},
      socketError: function socketError() {
        this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function connectTimeout() {
        this.transitionTo(this.STATE.FINAL);
      },
      reconnect: function reconnect() {
        this.transitionTo(this.STATE.CONNECTING);
      }
    }
  },
  TRANSIENT_FAILURE_RETRY: {
    name: 'TRANSIENT_FAILURE_RETRY',
    enter: function enter() {
      this.curTransientRetryCount++;
      this.cleanupConnection(this.cleanupTypeEnum.RETRY);
    },
    events: {
      message: function message() {},
      socketError: function socketError() {
        this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function connectTimeout() {
        this.transitionTo(this.STATE.FINAL);
      },
      retry: function retry() {
        this.createRetryTimer();
      }
    }
  },
  SENT_TLSSSLNEGOTIATION: {
    name: 'SentTLSSSLNegotiation',
    events: {
      socketError: function socketError() {
        this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function connectTimeout() {
        this.transitionTo(this.STATE.FINAL);
      },
      data: function data(_data2) {
        this.messageIo.tlsHandshakeData(_data2);
      },
      message: function message() {
        var _this21 = this;

        if (this.messageIo.tlsNegotiationComplete) {
          this.sendLogin7Packet(function () {
            if (_this21.config.domain) {
              _this21.transitionTo(_this21.STATE.SENT_LOGIN7_WITH_NTLM);
            } else {
              _this21.transitionTo(_this21.STATE.SENT_LOGIN7_WITH_STANDARD_LOGIN);
            }
          });
        }
      }
    }
  },
  SENT_LOGIN7_WITH_STANDARD_LOGIN: {
    name: 'SentLogin7WithStandardLogin',
    events: {
      socketError: function socketError() {
        this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function connectTimeout() {
        this.transitionTo(this.STATE.FINAL);
      },
      data: function data(_data3) {
        this.sendDataToTokenStreamParser(_data3);
      },
      loggedIn: function loggedIn() {
        this.transitionTo(this.STATE.LOGGED_IN_SENDING_INITIAL_SQL);
      },
      routingChange: function routingChange() {
        this.transitionTo(this.STATE.REROUTING);
      },
      loginFailed: function loginFailed() {
        this.transitionTo(this.STATE.FINAL);
      },
      message: function message() {
        this.processLogin7Response();
      }
    }
  },
  SENT_LOGIN7_WITH_NTLM: {
    name: 'SentLogin7WithNTLMLogin',
    events: {
      socketError: function socketError() {
        this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function connectTimeout() {
        this.transitionTo(this.STATE.FINAL);
      },
      data: function data(_data4) {
        this.sendDataToTokenStreamParser(_data4);
      },
      receivedChallenge: function receivedChallenge() {
        this.sendNTLMResponsePacket();
      },
      loginFailed: function loginFailed() {
        this.transitionTo(this.STATE.FINAL);
      },
      message: function message() {
        this.processLogin7NTLMResponse();
      }
    }
  },
  SENT_NTLM_RESPONSE: {
    name: 'SentNTLMResponse',
    events: {
      socketError: function socketError() {
        this.transitionTo(this.STATE.FINAL);
      },
      connectTimeout: function connectTimeout() {
        this.transitionTo(this.STATE.FINAL);
      },
      data: function data(_data5) {
        this.sendDataToTokenStreamParser(_data5);
      },
      loggedIn: function loggedIn() {
        this.transitionTo(this.STATE.LOGGED_IN_SENDING_INITIAL_SQL);
      },
      loginFailed: function loginFailed() {
        this.transitionTo(this.STATE.FINAL);
      },
      routingChange: function routingChange() {
        this.transitionTo(this.STATE.REROUTING);
      },
      message: function message() {
        this.processLogin7NTLMAck();
      }
    }
  },
  LOGGED_IN_SENDING_INITIAL_SQL: {
    name: 'LoggedInSendingInitialSql',
    enter: function enter() {
      this.sendInitialSql();
    },
    events: {
      connectTimeout: function connectTimeout() {
        this.transitionTo(this.STATE.FINAL);
      },
      data: function data(_data6) {
        this.sendDataToTokenStreamParser(_data6);
      },
      message: function message() {
        this.transitionTo(this.STATE.LOGGED_IN);
        this.processedInitialSql();
      }
    }
  },
  LOGGED_IN: {
    name: 'LoggedIn',
    events: {
      socketError: function socketError() {
        this.transitionTo(this.STATE.FINAL);
      }
    }
  },
  SENT_CLIENT_REQUEST: {
    name: 'SentClientRequest',
    exit: function exit(nextState) {
      this.clearRequestTimer();

      if (nextState !== this.STATE.FINAL) {
        this.tokenStreamParser.resume();
      }
    },
    events: {
      socketError: function socketError(err) {
        var sqlRequest = this.request;
        this.request = undefined;
        sqlRequest.callback(err);
        this.transitionTo(this.STATE.FINAL);
      },
      data: function data(_data7) {
        this.clearRequestTimer(); // request timer is stopped on first data package
        var ret = this.sendDataToTokenStreamParser(_data7);
        if (ret === false) {
          // Bridge backpressure from the token stream parser transform to the
          // packet stream transform.
          this.messageIo.pause();
        }
      },
      message: function message() {
        // We have to channel the 'message' (EOM) event through the token stream
        // parser transform, to keep it in line with the flow of the tokens, when
        // the incoming data flow is paused and resumed.
        this.tokenStreamParser.addEndOfMessageMarker();
      },
      endOfMessageMarkerReceived: function endOfMessageMarkerReceived() {
        this.transitionTo(this.STATE.LOGGED_IN);
        var sqlRequest = this.request;
        this.request = undefined;
        if (this.config.options.tdsVersion < '7_2' && sqlRequest.error && this.isSqlBatch) {
          this.inTransaction = false;
        }
        sqlRequest.callback(sqlRequest.error, sqlRequest.rowCount, sqlRequest.rows);
      }
    }
  },
  SENT_ATTENTION: {
    name: 'SentAttention',
    enter: function enter() {
      this.attentionReceived = false;
    },
    events: {
      socketError: function socketError() {
        this.transitionTo(this.STATE.FINAL);
      },
      data: function data(_data8) {
        this.sendDataToTokenStreamParser(_data8);
      },
      attention: function attention() {
        this.attentionReceived = true;
      },
      message: function message() {
        // 3.2.5.7 Sent Attention State
        // Discard any data contained in the response, until we receive the attention response
        if (this.attentionReceived) {
          var sqlRequest = this.request;
          this.request = undefined;
          this.transitionTo(this.STATE.LOGGED_IN);
          if (sqlRequest.canceled) {
            sqlRequest.callback(RequestError('Canceled.', 'ECANCEL'));
          } else {
            var message = 'Timeout: Request failed to complete in ' + this.config.options.requestTimeout + 'ms';
            sqlRequest.callback(RequestError(message, 'ETIMEOUT'));
          }
        }
      }
    }
  },
  FINAL: {
    name: 'Final',
    enter: function enter() {
      this.cleanupConnection(this.cleanupTypeEnum.NORMAL);
    },
    events: {
      loginFailed: function loginFailed() {
        // Do nothing. The connection was probably closed by the client code.
      },
      connectTimeout: function connectTimeout() {
        // Do nothing, as the timer should be cleaned up.
      },
      message: function message() {
        // Do nothing
      },
      socketError: function socketError() {
        // Do nothing
      }
    }
  }
};