import {AceEditor} from "./ace";
export {AceEditor} from "./ace";

export function configure(aurelia, cb){
  aurelia.globalResources("./ace");
  if(cb !== undefined && typeof(cb) === 'function') cb(AceEditor);
}
