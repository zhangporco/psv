'use strict';

/**
 * porco schema validate
 * Created by porco on 14/07/2017.
 */
module.exports = Psv;

function Psv(schema, data) {
    this.schema = schema;
    this.data = data;
    this.errors = [];
}

Psv.prototype.validate = function() {
    this.forParams(this.schema, this.data);
    if (this.errors && this.errors.length) return false;
    return true;
};

Psv.prototype.forParams = function(schema, data) {
    var dataKeys = Object.keys(data);
    this.checkError(required(schema, data));
    for (var i = 0; i < dataKeys.length; i++) {
        this.checkParam(schema, data, dataKeys[i]);
    }
};

Psv.prototype.checkParam = function(schema, data, dKeys) {
    var type = schema[dKeys] && schema[dKeys].type;
    if (!type) {
        type = schema;
    }
    if (type === Number) {
        this.checkError(number(schema, data, dKeys));
    } else if (type === String) {
        this.checkError(string(schema, data, dKeys));
    } else if (type === Boolean) {
        this.checkError(boolean(data, dKeys));
    } else if (Object.prototype.toString.call(type) === '[object Array]') {
        this.checkError(array(schema, data, dKeys, this));
    } else if (schema[dKeys] instanceof Object && data[dKeys]) {
        this.forParams(schema[dKeys].type, data[dKeys]);
    }
};

Psv.prototype.checkError = function(result) {
    if (!result.status) {
        if (this.errors.indexOf(result.text) === -1) {
            this.errors.push(result.text);
        }
    }
    return result.status;
};

Psv.prototype.getErrors = function() {
    return this.errors;
};

Psv.prototype.printErrors = function() {
    for (var i = 0; i < this.errors.length; i++) {
        console.error('\x1b[31m', this.errors[i]);
    }
};

function required(schema, data) {
    var schemaKeys = Object.keys(schema);
    var dataKeys = Object.keys(data);
    for (var i = 0; i < schemaKeys.length; i++) {
        var schemaKey = schemaKeys[i];
        if (schema[schemaKey].required) {
            if (dataKeys.indexOf(schemaKey) > -1) {
                if (data[schemaKey] === null && schema[schemaKey].type !== Object) {
                    return { status: false, text: printText('必填字段 ' + schemaKey + ' 不能为 null') };
                }
            } else {
                return { status: false, text: printText('缺少必填字段 ' + schemaKey) };
            }
        }
    }
    return { status: true, text: printText('') };
}

function array(schema, data, dKeys, scope) {
    var passes = data[dKeys] instanceof Array;
    if (!passes) {
        return { status: false, text: printText('字段 ' + dKeys + ' 不是 Array') };
    }
    var max = schema[dKeys].max;
    if (max !== undefined && max > 0 && data[dKeys].length > max) {
        return { status: false, text: printText('字段 ' + dKeys + ' 长度大于最大长度 ' + max) };
    }
    var min = schema[dKeys].min;
    if (min !== undefined && min > 0 && data[dKeys].length < min) {
        return { status: false, text: printText('字段 ' + dKeys + ' 长度小于最小长度 ' + min) };
    }
    for (var i = 0; i < data[dKeys].length; i++) {
        scope.forParams(schema[dKeys].type[0], data[dKeys][i]);
    }
    return { status: true, text: '' };
}

function string(schema, data, dKeys) {
    if (!checkType(data[dKeys], 'string')) {
        return { status: false, text: printText('字段 ' + dKeys + ' 不是 String') };
    }
    var obj = schema[dKeys] ? schema[dKeys] : schema;
    var max = obj.max;
    if (max !== undefined && max > 0 && data[dKeys].length > max) {
        return { status: false, text: printText('字段 ' + dKeys + ' 长度大于最大长度 ' + max) };
    }
    var min = obj.min;
    if (min !== undefined && min > 0 && data[dKeys].length < min) {
        return { status: false, text: printText('字段 ' + dKeys + ' 长度小于最小长度 ' + min) };
    }
    var pattern = obj.pattern;
    if (pattern !== undefined && !new RegExp(pattern).test(data[dKeys])) {
        return { status: false, text: printText('字段 ' + dKeys + ' 不符合 pattern') };
    }
    var strEnum = obj.enum;
    if (strEnum !== undefined && strEnum.indexOf(data[dKeys]) < 0) {
        return { status: false, text: printText('字段 ' + dKeys + ' 不在 enum 中') };
    }
    return { status: true, text: '' };
}

function number(schema, data, dKeys) {
    if (!checkType(data[dKeys], 'number')) {
        return { status: false, text: printText('字段 ' + dKeys + ' 不是 Number') };
    }
    var obj = schema[dKeys] ? schema[dKeys] : schema;
    var max = obj.max;
    if (max !== undefined && max > 0 && data[dKeys] > max) {
        return { status: false, text: printText('字段 ' + dKeys + ' 大于最大值 ' + max) };
    }
    var min = obj.min;
    if (min !== undefined && min > 0 && data[dKeys] < min) {
        return { status: false, text: printText('字段 ' + dKeys + ' 小于最小值 ' + min) };
    }
    var strEnum = obj.enum;
    if (strEnum !== undefined && strEnum.indexOf(data[dKeys]) < 0) {
        return { status: false, text: printText('字段 ' + dKeys + ' 不在 enum 中') };
    }
    return { status: true, text: '' };
}

function boolean(data, dKeys) {
    if (!checkType(data[dKeys], 'boolean')) {
        return {status: false, text: printText('字段 ' + dKeys + ' 不是 Boolean')};
    }
    return {status: true, text: ''};
}

function checkType(data, type) {
    return typeof data === type;
}

function printText(text) {
    return 'Porco schema 提示 :' + text;
}