
import PNumber from './PNumber';
import PString from './PString';
import PBoolean from './PBoolean';
import PArray from './PArray';
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
			const err = new PNumber().validate(schema, data, key);
			this.errors = this.errors.concat(err);
		} else if (type === String) {
			const err = new PString().validate(schema, data, key);
			this.errors = this.errors.concat(err);
		} else if (type === Boolean) {
			const err = new PBoolean().validate(schema, data, key);
			this.errors = this.errors.concat(err);
		} else if (type === Array || Array.isArray(type)) {
			const err = new PArray().validate(schema, data, key);
			this.errors = this.errors.concat(err);
		} else if (schema[ key ] instanceof Object) {
			this.iterator(schema[ key ].type, data[ key ]);
		}
	}
}
