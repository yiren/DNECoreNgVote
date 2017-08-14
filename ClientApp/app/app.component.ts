import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {User, UserManager, UserManagerEvents, UserManagerSettings} from "oidc-client";

import { AuthService } from './auth/service/auth.service';
import { ProgressService } from './voting/service/progressService';
import { UploadService } from './voting/service/uploadService';

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
  @ViewChild('formFile') inputFile:ElementRef;
  user:User;
  files;

  config:UserManagerSettings = {

    authority: "http://localhost:5000",
    client_id: "angular2",
    redirect_uri: "http://localhost:5200",
    response_type: "id_token token",
    scope:"openid profile api1 voteEventData",
    post_logout_redirect_uri : "http://localhost:5200"
  };
  mgr=new UserManager(this.config);;
  constructor(
    private uploadService:UploadService,
    private progressService:ProgressService
  ){
    
    
  }
  ngOnInit(){
    this.files=this.uploadService.getFiles();
    console.log(this.files);
    console.log("User Manger: ",this.mgr);
    // let obsConcat= Observable.of('Trigger Data Update');
    // this.obs.subscribe(console.log);
    // obsConcat
    //   .do(data=>this.subject.next('Modified'))
    //   .subscribe(console.log);
    // ;


  }

  getUserInfo(){
    this.mgr.signinRedirect().then(user=>console.log("CallBack User: ",user))
    console.log(this.mgr);
    this.mgr.getUser().then(user=>{
      this.user=user;
      console.log(user)
    },err=>console.log(err));
  }



  login(){
    this.mgr.signinRedirect();
  }
  call(){

  }
  logout(){
    this.mgr.signoutPopup()
    //this.mgr.signoutRedirect();
  }
  fileResult;
  uploadFile(){
    let file:HTMLInputElement=this.inputFile.nativeElement;
    console.log(file.files[0]);
    this.progressService.uploadProgress.subscribe(progress=>
      {
        console.log(progress);
      });
    this.uploadService.uploadFile(file.files[0])
        .subscribe(res=>{
          this.fileResult=res.json().result;
          
        });
    
    
    
  }
  
}
