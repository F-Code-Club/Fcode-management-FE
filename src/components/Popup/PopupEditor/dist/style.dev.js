"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FirstLayer = exports.ContainerEditor = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    width: 100vw;\n    height: 100vh;\n    background: rgba(0, 0, 0, 0.38);\n    position: absolute;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    width: 100vw;\n    height: 100vh;\n    position: fixed;\n    top: 0;\n    left: 0;\n    transition: linear 0.25s;\n    .editor {\n        width: 70%;\n        position: absolute;\n        margin-bottom: 3rem;\n        background: white;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n        border-radius: 10px;\n        padding: 25px;\n        .demo-editor {\n            height: 15rem;\n            overflow-y: scroll;\n            border: 1px solid #d9d9d9;\n        }\n        .checkbox {\n            margin: 0.5rem 0;\n            display: flex;\n        }\n        .container-btn {\n            text-align: center;\n        }\n        .save-btn {\n            margin-top: 0.5rem;\n            background: rgba(69, 206, 124, 1);\n            color: white;\n            border: 1px solid rgba(69, 206, 124, 1);\n            :hover {\n                color: rgba(69, 206, 124, 1);\n                border: 1px solid rgba(69, 206, 124, 1);\n                background: white;\n            }\n        }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ContainerEditor = _styledComponents["default"].div(_templateObject());

exports.ContainerEditor = ContainerEditor;

var FirstLayer = _styledComponents["default"].div(_templateObject2());

exports.FirstLayer = FirstLayer;