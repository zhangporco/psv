/**
 * String 校验
 */
import Base from './Base';

export default class PString extends Base {
	constructor() {
		super({
			type: '不是 String',
			required: '必填，不能为空',
			max: '超过最大长度',
			min: '低于最小长度',
			enum: '不在枚举中',
			regex: '违背正则表达式',
			pattern: '违背正则表达式',
		});
		this.error = [];
	}
	
	
	/**
	 * String 校验入口
	 * @param schema
	 * @param data
	 * @param key
	 * @returns {Array}
	 */
	validate(schema, data, key) {
		if (data[key] === undefined || data[key] === null) {
			data[key] = schema[key].default ? schema[key].default : data[key];
		} else if (schema[key].trim) {
			data[key] = data[key].replace(/^\s+|\s+$/g, '');
		}
		
		if (!schema[key].required && (data[key] === undefined || data[key] === null)) return this.error;
		
		if (!this.required(schema, data, key)) return this.error;
		if (!this.isString(schema, data, key)) return this.error;
		
		this.max(schema, data, key);
		this.min(schema, data, key);
		this.enum(schema, data, key);
		this.regex(schema, data, key);
		return this.error;
	}
	
	/**
	 * 是否为 String 校验
	 * @param schema
	 * @param data
	 * @param key
	 * @returns {boolean}
	 */
	isString(schema, data, key) {
		if (typeof data[key] !== 'string') {
			this.error.push(this.getError(schema, key, 'type'));
			return false;
		}
		return true;
	}
	
	/**
	 * 最大长度 校验
	 * @param schema
	 * @param data
	 * @param key
	 * @returns {boolean}
	 */
	max(schema, data, key) {
		if (Number.isFinite(schema[key].max)) {
			if (data[key].length > schema[key].max) {
				this.error.push(this.getError(schema, key, 'max'));
				return false;
			}
		}
		return true;
	}
	
	/**
	 * 最小长度校验
	 * @param schema
	 * @param data
	 * @param key
	 * @returns {boolean}
	 */
	min(schema, data, key) {
		if (Number.isFinite(schema[key].min)) {
			if (data[key].length < schema[key].min) {
				this.error.push(this.getError(schema, key, 'min'));
				return false;
			}
		}
		return true;
	}
	
	/**
	 * 枚举校验
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
	
	/**
	 * 正则表达式 校验
	 * regex 拥有最高优先级
	 * pattern - 不推荐使用
	 * @param schema
	 * @param data
	 * @param key
	 * @returns {boolean}
	 */
	regex(schema, data, key) {
		if (typeof schema[key].regex === 'string') {
			if (!new RegExp(schema[key].regex).test(data[key])) {
				this.error.push(this.getError(schema, key, 'regex'));
				return false;
			}
		} else if (typeof schema[key].pattern === 'string') {
			if (!new RegExp(schema[key].pattern).test(data[key])) {
				this.error.push(this.getError(schema, key, 'regex'));
				return false;
			}
		}
		return true;
	}
}
