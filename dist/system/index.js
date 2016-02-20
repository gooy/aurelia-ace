System.register(["./ace"], function (_export) {
  "use strict";

  var AceEditor;

  _export("configure", configure);

  function configure(aurelia, cb) {
    aurelia.globalResources("./ace");
    if (cb !== undefined && typeof cb === 'function') cb(AceEditor);
  }

  return {
    setters: [function (_ace) {
      AceEditor = _ace.AceEditor;

      _export("AceEditor", _ace.AceEditor);
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=index.js.map
