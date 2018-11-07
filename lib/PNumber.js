'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _Base = require('./Base');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let PNumber = class PNumber extends _Base2.default {
	constructor() {
		super({
			type: '不是 Number',
			required: '必填，不能为空',
			max: '超过最大值',
			min: '低于最小值',
			enum: '不在枚举中'
		});
		this.error = [];
	}

	/**
  * Number 类型校验入口
  * @param schema
  * @param data
  * @param key
  * @returns {Array}
  */
	validate(schema, data, key) {
		if (data[key] === undefined || data[key] === null) {
			data[key] = schema[key].default ? schema[key].default : data[key];
		}

		if (!schema[key].required && (data[key] === undefined || data[key] === null)) return this.error;

		if (!this.required(schema, data, key)) return this.error;
		if (!this.isNumber(schema, data, key)) return this.error;

		this.max(schema, data, key);
		this.min(schema, data, key);
		this.enum(schema, data, key);

		return this.error;
	}

	/**
  * 必填 校验
  * @param schema
  * @param data
  * @param key
  * @returns {boolean}
  */
	required(schema, data, key) {
		if (schema[key].required) {
			if (data[key] === undefined || data[key] === null) {
				this.error.push(this.getError(schema, key, 'required'));
				return false;
			}
		}
		return true;
	}

	/**
  * 是否为 Number
  * @param schema
  * @param data
  * @param key
  * @returns {boolean}
  */
	isNumber(schema, data, key) {
		if (!Number.isFinite(data[key])) {
			this.error.push(this.getError(schema, key, 'type'));
			return false;
		}
		return true;
	}

	/**
  * 最大值 校验
  * @param schema
  * @param data
  * @param key
  * @returns {boolean}
  */
	max(schema, data, key) {
		if (Number.isFinite(schema[key].max)) {
			if (data[key] > schema[key].max) {
				this.error.push(this.getError(schema, key, 'max'));
				return false;
			}
		}
		return true;
	}

	/**
  * 最小值 校验
  * @param schema
  * @param data
  * @param key
  * @returns {boolean}
  */
	min(schema, data, key) {
		if (Number.isFinite(schema[key].min)) {
			if (data[key] < schema[key].min) {
				this.error.push(this.getError(schema, key, 'min'));
				return false;
			}
		}
		return true;
	}

	/**
  *  枚举 校验
  * @param schema
  * @param data
  * @param key
  * @returns {boolean}
  */
	enum(schema, data, key) {
		if (Array.isArray(schema[key].enum)) {
			if (schema[key].enum.indexOf(data[key]) < 0) {
				this.error.push(this.getError(schema, key, 'enum'));
				return false;
			}
		}
		return true;
	}
}; /**
    * Number 校验
    */

exports.default = PNumber;