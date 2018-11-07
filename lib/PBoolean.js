'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _Base = require('./Base');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let PBoolean = class PBoolean extends _Base2.default {
	constructor() {
		super({
			type: '不是 Boolean',
			required: '必填，不能为空'
		});
		this.error = [];
	}

	validate(schema, data, key) {
		if (data[key] === undefined || data[key] === null) {
			data[key] = schema[key].default ? schema[key].default : data[key];
		}
		if (!schema[key].required && (data[key] === undefined || data[key] === null)) return this.error;

		if (!this.required(schema, data, key)) return this.error;
		if (!this.isBoolean(schema, data, key)) return this.error;

		return this.error;
	}

	required(schema, data, key) {
		if (schema[key].required) {
			if (data[key] === undefined || data[key] === null) {
				this.error.push(this.getError(schema, key, 'required'));
				return false;
			}
		}
		return true;
	}

	isBoolean(schema, data, key) {
		if (typeof data[key] !== 'boolean') {
			this.error.push(this.getError(schema, key, 'type'));
			return false;
		}
		return true;
	}
}; /**
    * Boolean 校验
    */

exports.default = PBoolean;