'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Check = undefined;

var _PNumber = require('./PNumber');

var _PNumber2 = _interopRequireDefault(_PNumber);

var _PString = require('./PString');

var _PString2 = _interopRequireDefault(_PString);

var _PBoolean = require('./PBoolean');

var _PBoolean2 = _interopRequireDefault(_PBoolean);

var _PArray = require('./PArray');

var _PArray2 = _interopRequireDefault(_PArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 校验入口
 */
let Check = exports.Check = class Check {
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
		let type = schema[key] && schema[key].type;
		if (!type) {
			type = schema;
		}
		if (type === Number) {
			this.number(schema, data, key);
		} else if (type === String) {
			this.string(schema, data, key);
		} else if (type === Boolean) {
			const err = new _PBoolean2.default().validate(schema, data, key);
			this.errors = this.errors.concat(err);
		} else if (type === Array || Array.isArray(type)) {
			const err = new _PArray2.default().validate(schema, data, key);
			this.errors = this.errors.concat(err);
		} else if (schema[key] instanceof Object) {
			if (!data[key]) {
				data[key] = schema[key].default ? schema[key].default : {};
			}
			this.validate(schema[key].type, data[key]);
		}
	}

	string(schema, data, key) {
		this.errors = this.errors.concat(new _PString2.default().validate(schema, data, key));
	}
	number(schema, data, key) {
		this.errors = this.errors.concat(new _PNumber2.default().validate(schema, data, key));
	}
	boolean(schema, data, key) {
		this.errors = this.errors.concat(new _PBoolean2.default().validate(schema, data, key));
	}
	array(schema, data, key) {
		this.errors = this.errors.concat(new _PArray2.default().validate(schema, data, key));
	}
};