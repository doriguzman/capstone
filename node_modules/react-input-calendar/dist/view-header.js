"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var prev = _ref.prev,
      next = _ref.next,
      titleAction = _ref.titleAction,
      data = _ref.data;
  return _react2.default.createElement(
    "div",
    { className: "navigation-wrapper" },
    _react2.default.createElement(
      "span",
      { className: "icon", onClick: prev },
      "<"
    ),
    _react2.default.createElement(
      "span",
      { className: "navigation-title", onClick: titleAction },
      data
    ),
    _react2.default.createElement(
      "span",
      { className: "icon", onClick: next },
      ">"
    )
  );
};