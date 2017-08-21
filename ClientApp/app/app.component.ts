import { Component, OnInit } from '@angular/core';

//import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//import { Observable } from 'rxjs/Rx';






@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //Practice BehaviorSubject Only
  //stringObs:Observable<any>=Observable.from('Initial');
  //subject=new BehaviorSubject('-----Defalut----');
  //obs:Observable<any>=this.subject.asObservable();
  

  // config:UserManagerSettings = {

  //   authority: "http://localhost:5000",
  //   client_id: "angular2",
  //   redirect_uri: "http://localhost:5200",
  //   response_type: "id_token token",
  //   scope:"openid profile api1 voteEventData",
  //   post_logout_redirect_uri : "http://localhost:5200"
  // };
  // mgr=new UserManager(this.config);;
  constructor(
    
  ){
    
    
  }
  ngOnInit(){
    
    //console.log(this.files);
    //console.log(this.authService.isLogged());
    // console.log("User Manger: ",this.mgr);
    // let obsConcat= Observable.of('Trigger Data Update');
    // this.obs.subscribe(console.log);
    // obsConcat
    //   .do(data=>this.subject.next('Modified'))
    //   .subscribe(console.log);
    // ;


  }

  
}
