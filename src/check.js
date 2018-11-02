
import number from './number';
import string from './string';
import boolean from './boolean';
import array from './array';
export class Check {
	constructor() {
		this.errors = [];
	}
	
	iterator(schema, data) {
		const keys = Object.keys(schema);
		for (const key of keys) {
			this.dispatch(schema, data, key);
		}
		return this.errors;
	}
	
	dispatch(schema, data, key) {
		let type = schema[ key ] && schema[ key ].type;
		if (!type) {
			type = schema;
		}
		if (type === Number) {
			const err = new number().validate(schema, data, key);
			this.errors = this.errors.concat(err);
		} else if (type === String) {
			const err = new string().validate(schema, data, key);
			this.errors = this.errors.concat(err);
		} else if (type === Boolean) {
			const err = new boolean().validate(schema, data, key);
			this.errors = this.errors.concat(err);
		} else if (type === Array || Array.isArray(type)) {
			const err = new array().validate(schema, data, key);
			this.errors = this.errors.concat(err);
		} else if (schema[ key ] instanceof Object) {
			this.iterator(schema[ key ].type, data[ key ]);
		}
	}
}
