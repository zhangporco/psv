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
    this.required(schema, data);
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
        this.number(schema, data, dKeys);
    } else if (type === String) {
        this.string(schema, data, dKeys);
    } else if (type === Boolean) {
        this.boolean(schema, data, dKeys);
    } else if (Object.prototype.toString.call(type) === '[object Array]') {
        this.array(schema, data, dKeys);
    } else if (schema[dKeys] instanceof Object && data[dKeys]) {
        this.forParams(schema[dKeys].type, data[dKeys]);
    }
};

Psv.prototype.checkError = function(result, schema) {
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

Psv.prototype.required = function(schema, data) {
    var schemaKeys = Object.keys(schema);
    var dataKeys = Object.keys(data);
    for (var i = 0; i < schemaKeys.length; i++) {
        var schemaKey = schemaKeys[i];
        if (schema[schemaKey].required && schema[schemaKey].type !== Object) {
            if (!(dataKeys.indexOf(schemaKey) > -1 && (data[schemaKey] !== null && data[schemaKey] !== ''))) {
                this.errors.push({
                    schema: schema[schemaKey],
                    data: data[schemaKey],
                    errorText: schema[schemaKey].errorText ? schema[schemaKey].errorText : printText('缺少必填字段 ' + schemaKey)
                });
            }
        }
    }
};

Psv.prototype.array = function(schema, data, dKeys) {
    var passes = data[dKeys] instanceof Array;
    if (!passes) {
        this.errors.push({
            schema: schema[dKeys],
            data: data[dKeys],
            errorText: schema[dKeys].errorText ? schema[dKeys].errorText : printText('字段 ' + dKeys + ' 不是 Array')
        });
    }
    var max = schema[dKeys].max;
    if (max !== undefined && max > 0 && data[dKeys].length > max) {
        this.errors.push({
            schema: schema[dKeys],
            data: data[dKeys],
            errorText: schema[dKeys].errorText ? schema[dKeys].errorText : printText('字段 ' + dKeys + ' 长度大于最大长度 ' + max)
        });
    }
    var min = schema[dKeys].min;
    if (min !== undefined && min > 0 && data[dKeys].length < min) {
        this.errors.push({
            schema: schema[dKeys],
            data: data[dKeys],
            errorText: schema[dKeys].errorText ? schema[dKeys].errorText : printText('字段 ' + dKeys + ' 长度小于最小长度 ' + min)
        });
    }
    for (var i = 0; i < data[dKeys].length; i++) {
        this.forParams(schema[dKeys].type[0], data[dKeys][i]);
    }
};

Psv.prototype.string = function(schema, data, dKeys) {
    if (!checkType(data[dKeys], 'string')) {
        this.errors.push({
            schema: schema[dKeys],
            data: data[dKeys],
            errorText: schema[dKeys].errorText ? schema[dKeys].errorText : printText('字段 ' + dKeys + ' 不是 String')
        });
    }
    var obj = schema[dKeys] ? schema[dKeys] : schema;
    var max = obj.max;
    if (max !== undefined && max > 0 && data[dKeys].length > max) {
        this.errors.push({
            schema: schema[dKeys],
            data: data[dKeys],
            errorText: schema[dKeys].errorText ? schema[dKeys].errorText : printText('字段 ' + dKeys + ' 长度大于最大长度 ' + max)
        });
    }
    var min = obj.min;
    if (min !== undefined && min > 0 && data[dKeys].length < min) {
        this.errors.push({
            schema: schema[dKeys],
            data: data[dKeys],
            errorText: schema[dKeys].errorText ? schema[dKeys].errorText : printText('字段 ' + dKeys + ' 长度小于最小长度 ' + min)
        });
    }
    var pattern = obj.pattern;
    if (pattern !== undefined && !new RegExp(pattern).test(data[dKeys])) {
        this.errors.push({
            schema: schema[dKeys],
            data: data[dKeys],
            errorText: schema[dKeys].errorText ? schema[dKeys].errorText : printText('字段 ' + dKeys + ' 不符合 pattern')
        });
    }
    var strEnum = obj.enum;
    if (strEnum !== undefined && strEnum.indexOf(data[dKeys]) < 0) {
        this.errors.push({
            schema: schema[dKeys],
            data: data[dKeys],
            errorText: schema[dKeys].errorText ? schema[dKeys].errorText : printText('字段 ' + dKeys + ' 不在 enum 中')
        });
    }
};

Psv.prototype.number = function(schema, data, dKeys) {
    if (!checkType(data[dKeys], 'number')) {
        this.errors.push({
            schema: schema[dKeys],
            data: data[dKeys],
            errorText: schema[dKeys] && schema[dKeys].errorText ? schema[dKeys].errorText : printText('字段 ' + dKeys + ' 不是 Number')
        });
    }
    var obj = schema[dKeys] ? schema[dKeys] : schema;
    var max = obj.max;
    if (max !== undefined && data[dKeys] > max) {
        this.errors.push({
            schema: schema[dKeys],
            data: data[dKeys],
            errorText: schema[dKeys].errorText ? schema[dKeys].errorText : printText('字段 ' + dKeys + ' 大于最大值 ' + max)
        });
    }
    var min = obj.min;
    if (min !== undefined && data[dKeys] < min) {
        this.errors.push({
            schema: schema[dKeys],
            data: data[dKeys],
            errorText: schema[dKeys].errorText ? schema[dKeys].errorText : printText('字段 ' + dKeys + ' 小于最小值 ' + min)
        });
    }
    var strEnum = obj.enum;
    if (strEnum !== undefined && strEnum.indexOf(data[dKeys]) < 0) {
        this.errors.push({
            schema: schema[dKeys],
            data: data[dKeys],
            errorText: schema[dKeys].errorText ? schema[dKeys].errorText : printText('字段 ' + dKeys + ' 不在 enum 中')
        });
    }
};

Psv.prototype.boolean = function(schema, data, dKeys) {
    if (!checkType(data[dKeys], 'boolean')) {
        this.errors.push({
            schema: schema[dKeys],
            data: data[dKeys],
            errorText: schema[dKeys].errorText ? schema[dKeys].errorText : printText('字段 ' + dKeys + ' 不是 Boolean')
        });
    }
};

function checkType(data, type) {
    return typeof data === type;
}

function printText(text) {
    return text;
}