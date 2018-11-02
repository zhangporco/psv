/**
 * Boolean 校验
 */
export default class PBoolean {
	constructor() {
		this.error = [];
		this.defaultError = {
			type: '不是 Boolean',
			required: '必填，不能为空',
		}
	}
	
	validate(schema, data, key) {
		if (!schema[key].required &&
			(data[key] === undefined || data[key] === null)) return this.error;
		if (!this.required(schema[key], data[key])) {
			this.error.push(this.getError(schema, key, 'required'));
			return this.error;
		}
		if (!this.isBoolean(data[key])) {
			this.error.push(this.getError(schema, key, 'type'));
			return this.error;
		}
		return this.error;
	}
	
	required(schema, data) {
		if (!schema.required) return true;
		return data !== undefined;
	}
	
	isBoolean(v) {
		return typeof v === 'boolean';
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