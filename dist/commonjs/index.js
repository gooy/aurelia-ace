"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;

var _ace = require("./ace");

Object.defineProperty(exports, "AceEditor", {
  enumerable: true,
  get: function get() {
    return _ace.AceEditor;
  }
});

function configure(aurelia, cb) {
  aurelia.globalizeResources("./ace");
  if (cb !== undefined && typeof cb === "function") cb(_ace.AceEditor);
}
//# sourceMappingURL=index.js.map