import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/service/auth.service';

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
  
  constructor(){
  }
  ngOnInit(){
    
    // let obsConcat= Observable.of('Trigger Data Update');
    // this.obs.subscribe(console.log);
    // obsConcat
    //   .do(data=>this.subject.next('Modified'))
    //   .subscribe(console.log);
    // ;
    

  }
    
}
