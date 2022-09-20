"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContainerAnnouncement = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    width: 100%;\n    padding: 3rem 10%;\n    background: #e6f8ec;\n    transition: 0.25 linear;\n    .list-announcement {\n        width: 100%;\n        background: white;\n        border-radius: 10px;\n        padding: 20px;\n        .DraftEditor-root {\n            z-index: 0;\n        }\n        .ant-list-item-meta {\n            align-items: center;\n        }\n        .ant-list-item {\n            display: grid;\n            grid-template-columns: 70% 30%;\n        }\n        .public-DraftEditor-content > div {\n            display: -webkit-box;\n            -webkit-line-clamp: 4;\n            -webkit-box-orient: vertical;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            word-wrap: break-word;\n        }\n        .ant-list-item-meta-title {\n            margin-bottom: 0;\n        }\n    }\n    .ant-list-vertical .ant-list-item-meta {\n        margin-bottom: 0.5rem;\n    }\n    .btn-manage-announcement {\n        margin: 2rem 0 0.5rem 0;\n    }\n    .btn-edit {\n        color: white;\n        background: #45ce7c;\n        border-radius: 5px;\n        border: 1px solid #45ce7c;\n        margin-right: 20px;\n        :hover {\n            color: #45ce7c;\n            background: white;\n            border: 1px solid #45ce7c;\n        }\n    }\n    .btn-view {\n        color: #45ce7c;\n        background: white;\n        border-radius: 5px;\n        border: 1px solid #45ce7c;\n        margin-right: 20px;\n        :hover {\n            color: white;\n            background: #45ce7c;\n            border: 1px solid #45ce7c;\n        }\n    }\n    .btn-delete {\n        color: white;\n        background: #ff4d4f;\n        border-radius: 5px;\n        border: 1px solid #ff4d4f;\n        :hover {\n            color: red;\n            background: white;\n            border: 1px solid #ff4d4f;\n        }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ContainerAnnouncement = _styledComponents["default"].div(_templateObject());

exports.ContainerAnnouncement = ContainerAnnouncement;