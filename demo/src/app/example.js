import {bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import store from "store-js";

export class ExamplePage{

  static inject = [EventAggregator];
  constructor(ea) {
    this.ea = ea;
  }

  attached(){
    this.ea.publish("page:ready");

    this.aceEditor.setOptions({
      lint:false,
      mode: "ace/mode/javascript",
      tabSize: 2,
      useSoftTabs: true
    });

    setTimeout(()=>{
      var content = store.get('content');
      if(content) this.aceEditor.setValue(content);
      window.dispatchEvent(new Event('resize'));
    });

  }

  save(){
    if (!store.enabled) {
      alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.');
      return
    }

    var content = this.aceEditor.getValue();
    store.set("content",content);
  }

}
