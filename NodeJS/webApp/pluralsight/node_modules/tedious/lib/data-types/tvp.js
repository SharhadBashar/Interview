'use strict';

module.exports = {
  id: 0xF3,
  type: 'TVPTYPE',
  name: 'TVP',

  declaration: function declaration(parameter) {
    return parameter.value.name + ' readonly';
  },

  writeTypeInfo: function writeTypeInfo(buffer, parameter) {
    var ref = void 0,
        ref1 = void 0,
        ref2 = void 0,
        ref3 = void 0;
    buffer.writeUInt8(this.id);
    buffer.writeBVarchar('');
    buffer.writeBVarchar((ref = (ref1 = parameter.value) != null ? ref1.schema : undefined) != null ? ref : '');
    buffer.writeBVarchar((ref2 = (ref3 = parameter.value) != null ? ref3.name : undefined) != null ? ref2 : '');
  },

  writeParameterData: function writeParameterData(buffer, parameter, options) {
    if (parameter.value == null) {
      buffer.writeUInt16LE(0xFFFF);
      buffer.writeUInt8(0x00);
      buffer.writeUInt8(0x00);
      return;
    }

    buffer.writeUInt16LE(parameter.value.columns.length);

    var ref = parameter.value.columns;
    for (var i = 0, len = ref.length; i < len; i++) {
      var column = ref[i];
      buffer.writeUInt32LE(0x00000000);
      buffer.writeUInt16LE(0x0000);
      column.type.writeTypeInfo(buffer, column);
      buffer.writeBVarchar('');
    }

    buffer.writeUInt8(0x00);

    var ref1 = parameter.value.rows;
    for (var j = 0, len1 = ref1.length; j < len1; j++) {
      var row = ref1[j];

      buffer.writeUInt8(0x01);

      for (var k = 0, len2 = row.length; k < len2; k++) {
        var value = row[k];
        var param = {
          value: value,
          length: parameter.value.columns[k].length,
          scale: parameter.value.columns[k].scale,
          precision: parameter.value.columns[k].precision
        };
        parameter.value.columns[k].type.writeParameterData(buffer, param, options);
      }
    }

    buffer.writeUInt8(0x00);
  },
  validate: function validate(value) {
    if (value == null) {
      return null;
    }

    if (typeof value !== 'object') {
      return new TypeError('Invalid table.');
    }

    if (!Array.isArray(value.columns)) {
      return new TypeError('Invalid table.');
    }

    if (!Array.isArray(value.rows)) {
      return new TypeError('Invalid table.');
    }

    return value;
  }
};