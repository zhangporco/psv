'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _PNumber = require('./PNumber');

var _PNumber2 = _interopRequireDefault(_PNumber);

var _Check = require('./Check');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Array 校验
 */
let PArray = class PArray {
	constructor() {
		this.error = [];
		this.defaultError = {
			type: '不是 Array',
			required: '必填，不能为空',
			max: '超过最大长度',
			min: '低于最小长度'
		};
	}

	validate(schema, data, key) {
		if (!schema[key].required && (data[key] === undefined || data[key] === null)) return this.error;

		if (!this.required(schema[key], data[key])) {
			this.error.push(this.getError(schema, key, 'required'));
			return this.error;
		}
		if (!this.isArray(data[key])) {
			this.error.push(this.getError(schema, key, 'type'));
			return this.error;
		}
		if (!this.max(schema[key], data[key])) {
			this.error.push(this.getError(schema, key, 'max'));
		}
		if (!this.min(schema[key], data[key])) {
			this.error.push(this.getError(schema, key, 'min'));
		}
		this.error = this.error.concat(this.nesting(schema, data, key));
		return this.error;
	}

	/**
  * 递归校验， 当数组内部结构为一个新 schema 时，
  * 会执行递归校验
  * @param schema
  * @param data
  * @param key
  * @returns {Array}
  */
	nesting(schema, data, key) {
		let errors = [];
		if (schema[key].type[0]) {
			const check = new _Check.Check();

			for (const [i, v] of data[key].entries()) {
				const sch = {};
				const k = `${key}[${i}]`;
				sch[k] = {
					type: schema[key].type[0],
					required: true
				};
				const d = {};
				d[k] = v;
				errors = check.iterator(sch, d);
			}
		}
		return errors;
	}

	required(schema, data) {
		if (!schema.required) return true;
		return data !== undefined;
	}

	/**
  * 是否为数组 校验
  * @param v
  * @returns {boolean}
  */
	isArray(v) {
		return Array.isArray(v);
	}

	/**
  * 最大长度 校验
  * @param schema
  * @param data
  * @returns {boolean}
  */
	max(schema, data) {
		if (!new _PNumber2.default().isNumber(schema.max)) return true;
		return data.length <= schema.max;
	}

	/**
  * 最小长度校验
  * @param schema
  * @param data
  * @returns {boolean}
  */
	min(schema, data) {
		if (!new _PNumber2.default().isNumber(schema.min)) return true;
		return data.length >= schema.min;
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
exports.default = PArray;