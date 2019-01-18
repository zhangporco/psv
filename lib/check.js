'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Check = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 校验入口
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _PNumber = require('./PNumber');

var _PNumber2 = _interopRequireDefault(_PNumber);

var _PString = require('./PString');

var _PString2 = _interopRequireDefault(_PString);

var _PBoolean = require('./PBoolean');

var _PBoolean2 = _interopRequireDefault(_PBoolean);

var _PArray = require('./PArray');

var _PArray2 = _interopRequireDefault(_PArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Check = exports.Check = function () {
	function Check() {
		_classCallCheck(this, Check);

		this.errors = [];
	}

	_createClass(Check, [{
		key: 'validate',
		value: function validate(schema, data) {
			var keys = Object.keys(schema);
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var key = _step.value;

					this.dispatch(schema, data, key);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return this.errors;
		}

		/**
   * 分发
   * @param schema
   * @param data
   * @param key
   */

	}, {
		key: 'dispatch',
		value: function dispatch(schema, data, key) {
			var type = schema[key] && schema[key].type;
			if (!type) {
				type = schema;
			}
			if (type === Number) {
				this.number(schema, data, key);
			} else if (type === String) {
				this.string(schema, data, key);
			} else if (type === Boolean) {
				var err = new _PBoolean2.default().validate(schema, data, key);
				this.errors = this.errors.concat(err);
			} else if (type === Array || Array.isArray(type)) {
				var _err = new _PArray2.default().validate(schema, data, key);
				this.errors = this.errors.concat(_err);
			} else if (schema[key] instanceof Object) {
				if (!data[key]) {
					data[key] = schema[key].default ? schema[key].default : {};
				}
				this.validate(schema[key].type, data[key]);
			}
		}
	}, {
		key: 'string',
		value: function string(schema, data, key) {
			this.errors = this.errors.concat(new _PString2.default().validate(schema, data, key));
		}
	}, {
		key: 'number',
		value: function number(schema, data, key) {
			this.errors = this.errors.concat(new _PNumber2.default().validate(schema, data, key));
		}
	}, {
		key: 'boolean',
		value: function boolean(schema, data, key) {
			this.errors = this.errors.concat(new _PBoolean2.default().validate(schema, data, key));
		}
	}, {
		key: 'array',
		value: function array(schema, data, key) {
			this.errors = this.errors.concat(new _PArray2.default().validate(schema, data, key));
		}
	}]);

	return Check;
}();