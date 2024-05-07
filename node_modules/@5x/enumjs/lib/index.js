"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PROP_POSTFIX = '_PROP';

var Enum = /*#__PURE__*/function () {
  function Enum() {
    _classCallCheck(this, Enum);
  }

  _createClass(Enum, [{
    key: "defineEnumProperty",
    value:
    /**
     * Define Enum property
     * @param {string} key key
     * @param {string} value value
     * @param {object} otherProps (optional) other properties
     */
    function defineEnumProperty(key, value) {
      var otherProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      Object.defineProperty(this, key, {
        configurable: false,
        writable: false,
        enumerable: true,
        value: value
      });
      Object.defineProperty(this, "".concat(key).concat(PROP_POSTFIX), {
        configurable: false,
        writable: false,
        enumerable: true,
        value: _objectSpread(_objectSpread({}, otherProps), {}, {
          value: value
        })
      });
    }
    /**
     * Get enum keys
     * @returns {Array} array of keys
     */

  }, {
    key: "keys",
    value: function keys() {
      var _this = this;

      return Object.keys(this).filter(function (key) {
        return typeof _this[key] !== 'function';
      }).filter(function (key) {
        return !key.endsWith(PROP_POSTFIX);
      }).sort(function (key1, key2) {
        return _this[key1] - _this[key2];
      });
    }
    /**
     * @private
     * Get prop keys of enum
     * @returns {Array} array of enum prop keys
     */

  }, {
    key: "propKeys",
    value: function propKeys() {
      var _this2 = this;

      return Object.keys(this).filter(function (key) {
        return typeof _this2[key] !== 'function';
      }).filter(function (key) {
        return key.endsWith(PROP_POSTFIX);
      }).sort(function (key1, key2) {
        return _this2[key1] - _this2[key2];
      });
    }
    /**
     * get values of enum
     * @returns {Array} array of values
     */

  }, {
    key: "values",
    value: function values() {
      var _this3 = this;

      return this.keys().map(function (key) {
        return _this3[key];
      });
    }
    /**
     * get array of props of enum
     * @returns {Array} array of props
     */

  }, {
    key: "props",
    value: function props() {
      var _this4 = this;

      return this.propKeys().map(function (key) {
        return _this4[key];
      });
    }
    /**
     * Get prop by value
     * @param {string} value value
     * @returns {object} prop
     */

  }, {
    key: "getProp",
    value: function getProp(value) {
      var key = this.getKeyByValue(value);
      return this["".concat(key).concat(PROP_POSTFIX)];
    }
    /**
     * @private
     * get corresponding key accroding value
     * @param {*} value value
     * @returns {string} corresponding key
     */

  }, {
    key: "getKeyByValue",
    value: function getKeyByValue(value) {
      var _this5 = this;

      return this.keys().find(function (key) {
        return _this5[key] === value;
      });
    }
  }]);

  return Enum;
}();

exports["default"] = Enum;
module.exports = exports.default;