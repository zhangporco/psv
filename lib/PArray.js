'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

var _Check = require('./Check');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Array 校验
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var PArray = function (_Base) {
	_inherits(PArray, _Base);

	function PArray() {
		_classCallCheck(this, PArray);

		var _this = _possibleConstructorReturn(this, (PArray.__proto__ || Object.getPrototypeOf(PArray)).call(this, {
			type: '不是 Array',
			required: '必填，不能为空',
			max: '超过最大长度',
			min: '低于最小长度'
		}));

		_this.error = [];
		return _this;
	}

	_createClass(PArray, [{
		key: 'validate',
		value: function validate(schema, data, key) {
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

	}, {
		key: 'nesting',
		value: function nesting(schema, data, key) {
			var errors = [];
			if (schema[key].type[0]) {
				var check = new _Check.Check();

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = data[key].entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _ref = _step.value;

						var _ref2 = _slicedToArray(_ref, 2);

						var i = _ref2[0];
						var v = _ref2[1];

						var sch = {};
						var k = key + '[' + i + ']';
						sch[k] = {
							type: schema[key].type[0],
							required: true
						};
						var d = {};
						d[k] = v;
						errors = check.validate(sch, d);
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

	}, {
		key: 'required',
		value: function required(schema, data, key) {
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

	}, {
		key: 'isArray',
		value: function isArray(schema, data, key) {
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

	}, {
		key: 'max',
		value: function max(schema, data, key) {
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

	}, {
		key: 'min',
		value: function min(schema, data, key) {
			if (Number.isFinite(schema[key].min)) {
				if (data[key].length < schema[key].min) {
					this.error.push(this.getError(schema, key, 'min'));
					return false;
				}
			}
			return true;
		}
	}]);

	return PArray;
}(_Base3.default);

exports.default = PArray;