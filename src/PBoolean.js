/**
 * Boolean 校验
 */
import Base from './Base';

export default class PBoolean extends Base {
	constructor() {
		super({
			type: '不是 Boolean',
			required: '必填，不能为空',
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
}