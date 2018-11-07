"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * 提供基础功能
 */
let Base = class Base {
	constructor(v) {
		this.defaultError = v;
	}

	/**
  * 获取错误提示信息，若不传会使用默认值
  * @param schema
  * @param key
  * @param type
  * @returns {object}
  */
	getError(schema, key, type) {
		return schema[key].error ? schema[key].error[type] ? schema[key].error[type] : `${key}: ${this.defaultError[type]}` : `${key}: ${this.defaultError[type]}`;
	}
};
exports.default = Base;