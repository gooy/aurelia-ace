import 'prism/themes/prism-okaidia.css!';
import {EventAggregator} from 'aurelia-event-aggregator';
import {bindable,Animator} from 'aurelia-framework';

export class App {

  subs = [];

  static inject = [EventAggregator,Animator];
  constructor(ea,animator) {
    this.ea = ea;
    this.animator = animator;
  }

  attached(){
    this.subs.push(this.ea.subscribe('page:ready', payload=>{
      if(this.footerAffix) this.footerAffix.update();
      this.animator.animate(this.footer,"fadeIn",{duration:200});
    }));

    this.subs.push(this.ea.subscribe('router:navigation:processing', payload=>{
      //if(this.footerAffix) this.footerAffix.setLoading();
      this.animator.animate(this.footer,"fadeOut",{duration:200});
    }));

    this.subs.push(this.ea.subscribe('router:navigation:complete', payload=>{
      //if(this.footerAffix) this.footerAffix.update();
    }));

  }

  detached(){
    if(this.subs) for(let sub of this.subs) sub();
  }

  configureRouter(config, router){

    config.title = 'Ace Editor';
    config.map([
      { route: ['','docs'],  moduleId: './docs',      nav: true, title:'Docs' },
      { route: 'example',  moduleId: './example',      nav: true, title:'Example' }
    ]);

    config.mapUnknownRoutes(instruction=> {
      instruction.config.moduleId = null;
      var parts = instruction.fragment.split("/");
      if(parts[0] == "error"){
        instruction.fragment = "error/" + parts[1];
        instruction.config.route = "error/" + parts[1];
        instruction.lifecycleArgs[0].errorId = parseInt(parts[1]);
        instruction.config.moduleId = "error/generic";
      }else if(parts[0] == "forbidden"){ //alias for 403 forbidden error
        instruction.lifecycleArgs[0].errorId = 403;
        instruction.config.moduleId = "error/403";
      }else{ //treat unknown urls as "error/404"
        instruction.lifecycleArgs[0].errorId = 404;
        instruction.config.moduleId = "error/404";
      }
    });

    this.router = router;

    document.body.classList.add("ready");
  }



}
