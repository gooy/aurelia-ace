import {AceEditor} from "./ace";
export {AceEditor} from "./ace";

export function configure(aurelia, cb){
  aurelia.globalizeResources("./ace");
  if(cb !== undefined && typeof(cb) === 'function') cb(AceEditor);
}
