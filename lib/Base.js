"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 提供基础功能
 */
var Base = function () {
	function Base(v) {
		_classCallCheck(this, Base);

		this.defaultError = v;
	}

	/**
  * 获取错误提示信息，若不传会使用默认值
  * @param schema
  * @param key
  * @param type
  * @returns {object}
  */


	_createClass(Base, [{
		key: "getError",
		value: function getError(schema, key, type) {
			return schema[key].error ? schema[key].error[type] ? schema[key].error[type] : key + ": " + this.defaultError[type] : key + ": " + this.defaultError[type];
		}
	}]);

	return Base;
}();

exports.default = Base;