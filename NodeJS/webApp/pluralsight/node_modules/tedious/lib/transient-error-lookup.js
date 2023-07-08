"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This simple piece of code is factored out into a separate class to make it
// easy to stub it out in tests. It's hard, if not impossible, to cause a
// transient error on demand in tests.
var TransientErrorLookup = function () {
  function TransientErrorLookup() {
    (0, _classCallCheck3.default)(this, TransientErrorLookup);
  }

  (0, _createClass3.default)(TransientErrorLookup, [{
    key: "isTransientError",
    value: function isTransientError(error) {
      // This list of transient errors comes from Microsoft implementation of SqlClient:
      //  - https://github.com/dotnet/corefx/blob/master/src/System.Data.SqlClient/src/System/Data/SqlClient/SqlInternalConnectionTds.cs#L115
      var transientErrors = [4060, 10928, 10929, 40197, 40501, 40613];
      return transientErrors.indexOf(error) !== -1;
    }
  }]);
  return TransientErrorLookup;
}();

module.exports.TransientErrorLookup = TransientErrorLookup;