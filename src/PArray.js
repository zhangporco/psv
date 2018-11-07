/**
 * Array 校验
 */
import Base from './Base';
import { Check } from './Check';

export default class PArray extends Base {
	constructor() {
		super({
			type: '不是 Array',
			required: '必填，不能为空',
			max: '超过最大长度',
			min: '低于最小长度',
		});
		this.error = [];
	}
	
	validate(schema, data, key) {
		if (data[key] === undefined || data[key] === null) {
			data[key] = schema[key].default ? schema[key].default : data[key];
		}
		
		if (!schema[key].required && (data[key] === undefined || data[key] === null)) return this.error;
		
		if (!this.required(schema, data, key)) return this.error;
		if (!this.isArray(schema, data, key)) return this.error;
		
		this.max(schema, data, key);
		this.min(schema, data, key);
		
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
			const check = new Check();
			
			for (const [i, v] of data[key].entries()) {
				const sch = {};
				const k = `${key}[${i}]`;
				sch[k] = {
					type: schema[key].type[0],
					required: true,
				};
				const d = {};
				d[k] = v;
				errors = check.validate(sch, d);
			}
		}
		return errors;
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
	 * 是否为数组 校验
	 * @param schema
	 * @param data
	 * @param key
	 * @returns {boolean}
	 */
	isArray(schema, data, key) {
		if (!Array.isArray(data[key])) {
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
}