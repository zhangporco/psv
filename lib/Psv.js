'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Index
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * js 数据校验工具
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Porco
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Created 14/07/2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Check = require('./Check');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Psv = function () {
	function Psv(schema, data) {
		_classCallCheck(this, Psv);

		this.schema = schema;
		this.data = data;
		this.errors = [];
	}

	/**
  * 验证入口
  */


	_createClass(Psv, [{
		key: 'validate',
		value: function validate() {
			var errors = new _Check.Check().validate(this.schema, this.data);
			this.errors = errors;
			return errors && errors.length === 0;
		}

		/**
   * 获取错误信息，
   * 常用与生产阶段，需先调用 validate 接口
   */

	}, {
		key: 'getErrors',
		value: function getErrors() {
			return this.errors;
		}

		/**
   * 打印错误信息，
   * 常用与调试阶段，需先调用 validate 接口
   */

	}, {
		key: 'printErrors',
		value: function printErrors() {
			if (!this.errors || this.errors.length === 0) return;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var err = _step.value;

					console.log('\x1b[31m', err);
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
	}]);

	return Psv;
}();

exports.default = Psv;