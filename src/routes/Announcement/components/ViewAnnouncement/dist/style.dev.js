"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentAnnounce = exports.ContainerAnnounce = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    background: white;\n    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),\n        0px 1px 5px rgba(0, 0, 0, 0.2);\n    border-radius: 10px;\n    padding: 2rem 5rem;\n    .title {\n        font-size: 36px;\n        text-align: center;\n    }\n    .public-DraftEditor-content div {\n        text-align: justify;\n    }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    background: #e6f8ec;\n    padding: 4rem 10rem;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ContainerAnnounce = _styledComponents["default"].div(_templateObject());

exports.ContainerAnnounce = ContainerAnnounce;

var ContentAnnounce = _styledComponents["default"].div(_templateObject2());

exports.ContentAnnounce = ContentAnnounce;