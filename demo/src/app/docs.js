import {EventAggregator} from 'aurelia-event-aggregator';
import {bindable,Animator} from 'aurelia-framework';

export class Docs{

  static inject = [Element,EventAggregator,Animator];
  constructor(element,ea,animator) {
    this.element = element;
    this.ea = ea;
    this.animator = animator;
  }

  attached(){
    this.ea.publish("page:ready");


  }

  detached(){

  }

}
