'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Number 校验
 */
let number = class number {
	constructor() {
		this.error = [];
		this.defaultError = {
			type: '不是 Number',
			required: '必填，不能为空',
			max: '超过最大值',
			min: '低于最小值',
			enum: '不在枚举中'
		};
	}

	/**
  * Number 类型校验入口
  * @param schema
  * @param data
  * @param key
  * @returns {Array}
  */
	validate(schema, data, key) {
		if (!schema[key].required && (data[key] === undefined || data[key] === null)) return this.error;
		if (!this.required(schema[key], data[key])) {
			this.error.push(this.getError(schema, key, 'required'));
			return this.error;
		}
		if (!this.isNumber(data[key])) {
			this.error.push(this.getError(schema, key, 'type'));
			return this.error;
		}
		if (!this.max(schema[key], data[key])) {
			this.error.push(this.getError(schema, key, 'max'));
		}
		if (!this.min(schema[key], data[key])) {
			this.error.push(this.getError(schema, key, 'min'));
		}
		if (!this.enum(schema[key], data[key])) {
			this.error.push(this.getError(schema, key, 'enum'));
		}
		return this.error;
	}

	/**
  * 必填 校验
  * @param schema
  * @param data
  * @returns {boolean}
  */
	required(schema, data) {
		if (!schema.required) return true;
		return data !== undefined;
	}

	/**
  * 是否为 Number
  * @param v
  * @returns {boolean}
  */
	isNumber(v) {
		return Number.isFinite(v);
	}

	/**
  * 最大值 校验
  * @param schema
  * @param data
  * @returns {boolean}
  */
	max(schema, data) {
		if (!this.isNumber(schema.max)) return true;
		return data <= schema.max;
	}

	/**
  * 最小值 校验
  * @param schema
  * @param data
  * @returns {boolean}
  */
	min(schema, data) {
		if (!this.isNumber(schema.min)) return true;
		return data >= schema.min;
	}

	/**
  * 枚举 校验
  * @param schema
  * @param data
  * @returns {boolean}
  */
	enum(schema, data) {
		if (!Array.isArray(schema.enum)) return true;
		return schema.enum.indexOf(data) > -1;
	}

	/**
  * 获取错误提示信息，若不传会使用默认值
  * @param schema
  * @param key
  * @param type
  * @returns {string}
  */
	getError(schema, key, type) {
		const err = schema[key].error ? schema[key].error[type] ? schema[key].error[type] : `
				${key}: ${this.defaultError[type]}` : `${key}: ${this.defaultError[type]}`;
		return err;
	}
};
exports.default = number;