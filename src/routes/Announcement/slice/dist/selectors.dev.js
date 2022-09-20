"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectAnnounce = void 0;

var _ = require(".");

var _toolkit = require("@reduxjs/toolkit");

var selectDomain = function selectDomain(state) {
  return state[_.name] || _.initialState;
};

var selectAnnounce = (0, _toolkit.createSelector)([selectDomain], function (state) {
  return state.listAnnounce;
});
exports.selectAnnounce = selectAnnounce;