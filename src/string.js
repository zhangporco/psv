/**
 * String 校验
 */
import number from './number';

export default class string {
	constructor() {
		this.error = [];
		this.defaultError = {
			type: '不是 String',
			required: '必填，不能为空',
			max: '超过最大长度',
			min: '低于最小长度',
			enum: '不在枚举中',
			regex: '违背正则表达式',
			pattern: '违背正则表达式',
		}
	}
	
	/**
	 * String 校验入口
	 * @param schema
	 * @param data
	 * @param key
	 * @returns {Array}
	 */
	validate(schema, data, key) {
		if (!schema[key].required &&
			(data[key] === undefined || data[key] === null)) return this.error;
		if (!this.required(schema[key], data[key])) {
			this.error.push(this.getError(schema, key, 'required'));
			return this.error;
		}
		if (!this.isString(data[key])) {
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
		if (!this.regex(schema[key], data[key])) {
			this.error.push(this.getError(schema, key, 'regex'));
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
		return data !== undefined && data !== null;
	}
	
	/**
	 * 是否为 String 校验
	 * @param v
	 * @returns {boolean}
	 */
	isString(v) {
		return typeof v === 'string';
	}
	
	/**
	 * 最大长度 校验
	 * @param schema
	 * @param data
	 * @returns {boolean}
	 */
	max(schema, data) {
		if (!new number().isNumber(schema.max)) return true;
		return data.length <= schema.max;
	}
	
	/**
	 * 最小长度校验
	 * @param schema
	 * @param data
	 * @returns {boolean}
	 */
	min(schema, data) {
		if (!new number().isNumber(schema.min)) return true;
		return data.length >= schema.min;
	}
	
	/**
	 * 枚举校验
	 * @param schema
	 * @param data
	 * @returns {boolean}
	 */
	enum(schema, data) {
		if (!Array.isArray(schema.enum)) return true;
		return schema.enum.indexOf(data) > -1;
	}
	
	/**
	 * 正则表达式 校验
	 * regex 拥有最高优先级
	 * pattern - 不推荐使用
	 * @param schema
	 * @param data
	 * @returns {boolean}
	 */
	regex(schema, data) {
		if (this.isString(schema.regex)) {
			return new RegExp(schema.regex).test(data);
		} else if (this.isString(schema.pattern)) {
			return new RegExp(schema.pattern).test(data);
		}
		return true;
	}
	
	/**
	 * 获取错误提示信息，若不传会使用默认值
	 * @param schema
	 * @param key
	 * @param type
	 * @returns {string}
	 */
	getError(schema, key, type) {
		const err = schema[key].error ?
			schema[key].error[type] ?
				schema[key].error[type] : `
				${key}: ${this.defaultError[type]}` :
			`${key}: ${this.defaultError[type]}`;
		return err;
	}
}
