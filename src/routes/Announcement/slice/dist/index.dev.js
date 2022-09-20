"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.slice = exports.name = exports.initialState = void 0;

var _store = require("@/store");

var _toolkit = require("@reduxjs/toolkit");

var initialState = {
  listAnnounce: []
};
exports.initialState = initialState;
var name = 'announcement';
exports.name = name;
var slice = (0, _toolkit.createSlice)({
  name: name,
  initialState: initialState,
  reducers: {
    addAnnounce: function addAnnounce(state, action) {
      state.listAnnounce.push(action.payload);
    },
    deleteAnnounce: function deleteAnnounce(state, action) {
      state.listAnnounce = state.listAnnounce.filter(function (todo) {
        return todo.id !== action.payload;
      });
    }
  }
});
exports.slice = slice;
(0, _store.injectReducer)(name, slice.reducer);
var actions = slice.actions;
exports.actions = actions;