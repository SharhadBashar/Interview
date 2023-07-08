'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deprecate = require('depd')('tedious');

var Null = require('./data-types/null');
var TinyInt = require('./data-types/tinyint');
var Bit = require('./data-types/bit');
var SmallInt = require('./data-types/smallint');
var Int = require('./data-types/int');
var SmallDateTime = require('./data-types/smalldatetime');
var Real = require('./data-types/real');
var Money = require('./data-types/money');
var DateTime = require('./data-types/datetime');
var Float = require('./data-types/float');
var Decimal = require('./data-types/decimal');
var Numeric = require('./data-types/numeric');
var SmallMoney = require('./data-types/smallmoney');
var BigInt = require('./data-types/bigint');
var Image = require('./data-types/image');
var Text = require('./data-types/text');
var UniqueIdentifier = require('./data-types/uniqueidentifier');
var IntN = require('./data-types/intn');
var NText = require('./data-types/ntext');
var BitN = require('./data-types/bitn');
var DecimalN = require('./data-types/decimaln');
var NumericN = require('./data-types/numericn');
var FloatN = require('./data-types/floatn');
var MoneyN = require('./data-types/moneyn');
var DateTimeN = require('./data-types/datetimen');
var VarBinary = require('./data-types/varbinary');
var VarChar = require('./data-types/varchar');
var Binary = require('./data-types/binary');
var Char = require('./data-types/char');
var NVarChar = require('./data-types/nvarchar');
var NChar = require('./data-types/nchar');
var Xml = require('./data-types/xml');
var Time = require('./data-types/time');
var Date = require('./data-types/date');
var DateTime2 = require('./data-types/datetime2');
var DateTimeOffset = require('./data-types/datetimeoffset');
var UDT = require('./data-types/udt');
var TVP = require('./data-types/tvp');
var Variant = require('./data-types/sql-variant');

module.exports.TYPE = {
  [Null.id]: Null,
  [TinyInt.id]: TinyInt,
  [Bit.id]: Bit,
  [SmallInt.id]: SmallInt,
  [Int.id]: Int,
  [SmallDateTime.id]: SmallDateTime,
  [Real.id]: Real,
  [Money.id]: Money,
  [DateTime.id]: DateTime,
  [Float.id]: Float,
  [Decimal.id]: Decimal,
  [Numeric.id]: Numeric,
  [SmallMoney.id]: SmallMoney,
  [BigInt.id]: BigInt,
  [Image.id]: Image,
  [Text.id]: Text,
  [UniqueIdentifier.id]: UniqueIdentifier,
  [IntN.id]: IntN,
  [NText.id]: NText,
  [BitN.id]: BitN,
  [DecimalN.id]: DecimalN,
  [NumericN.id]: NumericN,
  [FloatN.id]: FloatN,
  [MoneyN.id]: MoneyN,
  [DateTimeN.id]: DateTimeN,
  [VarBinary.id]: VarBinary,
  [VarChar.id]: VarChar,
  [Binary.id]: Binary,
  [Char.id]: Char,
  [NVarChar.id]: NVarChar,
  [NChar.id]: NChar,
  [Xml.id]: Xml,
  [Time.id]: Time,
  [Date.id]: Date,
  [DateTime2.id]: DateTime2,
  [DateTimeOffset.id]: DateTimeOffset,
  [UDT.id]: UDT,
  [TVP.id]: TVP,
  [Variant.id]: Variant
};

var typeByName = module.exports.typeByName = {
  Null,
  TinyInt,
  Bit,
  SmallInt,
  Int,
  SmallDateTime,
  Real,
  Money,
  DateTime,
  Float,
  Decimal,
  Numeric,
  SmallMoney,
  BigInt,
  Image,
  Text,
  UniqueIdentifier,
  NText,
  VarBinary,
  VarChar,
  Binary,
  Char,
  NVarChar,
  NChar,
  Xml,
  Time,
  Date,
  DateTime2,
  DateTimeOffset,
  UDT,
  TVP,
  Variant,

  // These are all internal and should not be used directly.
  IntN,
  BitN,
  FloatN,
  MoneyN,
  DateTimeN,
  DecimalN,
  NumericN,

  // These are all deprecated aliases.
  DateN: Date,
  DateTimeOffsetN: DateTimeOffset,
  DateTime2N: DateTime2,
  TimeN: Time,
  UniqueIdentifierN: UniqueIdentifier
};

[['DateN', 'Date'], ['DateTimeOffsetN', 'DateTimeOffset'], ['DateTime2N', 'DateTime2'], ['TimeN', 'Time'], ['UniqueIdentifierN', 'UniqueIdentifier']].forEach(function (_ref) {
  var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
      alias = _ref2[0],
      name = _ref2[1];

  deprecate.property(typeByName, alias, 'The `' + alias + '` data type alias is deprecated, please use `' + name + '` instead.');
});

['IntN', 'BitN', 'FloatN', 'MoneyN', 'DateTimeN', 'DecimalN', 'NumericN'].forEach(function (name) {
  deprecate.property(typeByName, name, 'The `' + name + '` data type is internal and will be removed.');
});