import {bindable,noView,customElement,skipContentProcessing} from 'aurelia-framework';
import ace from "ace";
import "ace/theme-monokai";
import "ace/mode-javascript";

import beautify from 'js-beautify';
import css__beautify from 'js-beautify/beautify-css';
import html__beautify from 'js-beautify/beautify-html';

var js_beautify = beautify.js_beautify;
var css_beautify = css__beautify.css_beautify;
var html_beautify = html__beautify.html_beautify;

@noView
@customElement('ace')
@skipContentProcessing
export class AceEditor {

  static options = {
    showPrintMargin:false,
    beautify: true,
    mode:"javascript",
    theme: "monokai"
  };

  static setOptions(options){
    AceEditor.options = Object.assign(AceEditor.options,options);
  }

  @bindable value = "";

  editor = null;

  static uid = 1;

  static inject = [Element];
  constructor(element) {
    this.element = element;
    this._uid = ++AceEditor.uid;

    //this.options = Object.assign(this.options,AceEditor.options);
  }

  bind(){

  }

  attached() {
    this.id = "ace-editor-"+this._uid;
    this.element.setAttribute("id",this.id);

    //set initial value from the innerHTML
    if(!this.value && this.element.innerHTML) this.element.innerHTML = dedent(this.element.innerHTML).trim();
    //set initial value from the binding
    if(this.value){
      this.value = this._parseValue(this.value);
      this.element.innerHTML = dedent(this.value).trim();
    }

    var e = this.editor = ace.edit(this.id);
    //disable scrolling into view (a deprecated feature for ace)
    e.$blockScrolling = Infinity;
    ace.config.set("basePath", "/jspm_packages/github/ajaxorg/ace-builds@1.1.9/");

    //e.setShowPrintMargin(false);
    //e.setTheme("ace/theme/monokai");
    //e.getSession().setMode("ace/mode/javascript");

    this.updateOptions(Object.assign({},AceEditor.options));
  }

  setValue(v){
    this.value = v;
    this.valueChanged(v);
    return this;
  }

  getValue(){
    return this.editor.getValue();
  }

  valueChanged(value){
    this.value = this._parseValue(this.value);
    if(this.editor) this.editor.setValue(this.value,1);
  }

  setOptions(options){
    this.updateOptions(Object.assign({},AceEditor.options,options));
    return this;
  }

  updateOptions(options){
    if(!this.editor) return;

    if(!options.lint){
      this.editor.session.setUseWorker(false);
    }else{
      this.editor.session.setUseWorker(true);
    }

    if(options.mode) options.mode = `ace/mode/${options.mode}`;
    if(options.theme) options.theme = `ace/theme/${options.theme}`;

    //delete options not meant for ace
    delete options.beautify;
    delete options.lint;

    this.editor.setOptions(options);
  }

  _parseValue(obj){
    if(typeof obj == "object") obj = JSON.stringify(obj);
    if(AceEditor.options.beautify) obj = this._beautify(obj, AceEditor.options.mode);
    return obj;
  }

  /**
   * Beautifies html, css or js code
   *
   * @param code {String}       String containing code
   * @param language {String}   Code language (html, js or css)
   *
   * @returns {String} Beautified code
   */
  _beautify(code, language){
    if(!code) return null;
    //trim every line
    code = code.split('\n').map((l) => l.trim()).join('\n');

    switch(language){
      case 'js':
      case 'javascript':
        code = js_beautify(code);
        break;
      case 'css':
      case 'less':
        code = css_beautify(code);
        break;
      case 'html':
      case 'markup':
        code = escapeHtml(html_beautify(unescapeHtml(code)));
        break;
    }
    return code;
  }

}

function dedent(str){
  var match = str.match(/^[ \t]*(?=\S)/gm);
  if (!match) return str;

  var indent = Math.min.apply(Math, match.map(function (el) {
    return el.length;
  }));

  var re = new RegExp('^[ \\t]{' + indent + '}', 'gm');
  return indent > 0 ? str.replace(re, '') : str;
}
