'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Check = undefined;

var _number = require('./number');

var _number2 = _interopRequireDefault(_number);

var _string = require('./string');

var _string2 = _interopRequireDefault(_string);

var _boolean = require('./boolean');

var _boolean2 = _interopRequireDefault(_boolean);

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Check = exports.Check = class Check {
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
		let type = schema[key] && schema[key].type;
		if (!type) {
			type = schema;
		}
		if (type === Number) {
			const err = new _number2.default().validate(schema, data, key);
			this.errors = this.errors.concat(err);
		} else if (type === String) {
			const err = new _string2.default().validate(schema, data, key);
			this.errors = this.errors.concat(err);
		} else if (type === Boolean) {
			const err = new _boolean2.default().validate(schema, data, key);
			this.errors = this.errors.concat(err);
		} else if (type === Array || Array.isArray(type)) {
			const err = new _array2.default().validate(schema, data, key);
			this.errors = this.errors.concat(err);
		} else if (schema[key] instanceof Object) {
			this.iterator(schema[key].type, data[key]);
		}
	}
};