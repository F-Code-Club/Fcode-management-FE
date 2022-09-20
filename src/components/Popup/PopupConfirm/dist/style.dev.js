"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentPopup = exports.Popup = exports.LayerPopup = exports.ContainerPopup = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    width: 100%;\n    margin-left: 1rem;\n    transition: linear 0.25s;\n    div {\n        text-align: right;\n    }\n    .cancel-btn {\n        margin-top: 0.5rem;\n        color: black;\n        border: 1px solid #d9d9d9;\n        margin-right: 10px;\n        :hover {\n            color: #ff4d4f;\n            border: 1px solid #ff4d4f;\n        }\n    }\n    .accept-btn {\n        margin-top: 0.5rem;\n        background: rgba(69, 206, 124, 1);\n        color: white;\n        border: 1px solid rgba(69, 206, 124, 1);\n        :hover {\n            color: rgba(69, 206, 124, 1);\n            border: 1px solid rgba(69, 206, 124, 1);\n        }\n    }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    width: 30%;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    background: white;\n    padding: 25px;\n    display: flex;\n    justify-content: flex-start;\n    border-radius: 2px;\n    .icon-popup {\n        margin-top: 3px;\n        font-size: 20px;\n    }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background: rgba(0, 0, 0, 0.38);\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    width: 100vw;\n    height: 100vh;\n    position: fixed;\n    top: 0;\n    left: 0;\n    transition: linear 0.25s;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ContainerPopup = _styledComponents["default"].div(_templateObject());

exports.ContainerPopup = ContainerPopup;

var LayerPopup = _styledComponents["default"].div(_templateObject2());

exports.LayerPopup = LayerPopup;

var Popup = _styledComponents["default"].div(_templateObject3());

exports.Popup = Popup;

var ContentPopup = _styledComponents["default"].div(_templateObject4());

exports.ContentPopup = ContentPopup;