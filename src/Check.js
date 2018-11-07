/**
 * 校验入口
 */
import PNumber from './PNumber';
import PString from './PString';
import PBoolean from './PBoolean';
import PArray from './PArray';
export class Check {
	constructor() {
		this.errors = [];
	}
	
	validate(schema, data) {
		const keys = Object.keys(schema);
		for (const key of keys) {
			this.dispatch(schema, data, key);
		}
		return this.errors;
	}
	
	/**
	 * 分发
	 * @param schema
	 * @param data
	 * @param key
	 */
	dispatch(schema, data, key) {
		let type = schema[ key ] && schema[ key ].type;
		if (!type) {
			type = schema;
		}
		if (type === Number) {
			this.number(schema, data, key);
		} else if (type === String) {
			this.string(schema, data, key);
		} else if (type === Boolean) {
			const err = new PBoolean().validate(schema, data, key);
			this.errors = this.errors.concat(err);
		} else if (type === Array || Array.isArray(type)) {
			const err = new PArray().validate(schema, data, key);
			this.errors = this.errors.concat(err);
		} else if (schema[ key ] instanceof Object) {
			if (!data[ key ]) {
				data[ key ] = schema[ key ].default ? schema[ key ].default : {};
			}
			this.validate(schema[ key ].type, data[ key ]);
		}
	}
	
	string(schema, data, key) {
		this.errors = this.errors.concat(new PString().validate(schema, data, key));
	}
	number(schema, data, key) {
		this.errors = this.errors.concat(new PNumber().validate(schema, data, key));
	}
	boolean(schema, data, key) {
		this.errors = this.errors.concat(new PBoolean().validate(schema, data, key));
	}
	array(schema, data, key) {
		this.errors = this.errors.concat(new PArray().validate(schema, data, key));
	}
}
