import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {User, UserManager, UserManagerEvents, UserManagerSettings} from "oidc-client";

import { AuthService } from './auth/service/auth.service';
import { ProgressService } from './voting/service/progressService';
import { ToasterService } from 'angular2-toaster';
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
  progress;
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
    private uploadService:UploadService,
    private progressService:ProgressService,
    private ngZone:NgZone,
    private toasterService:ToasterService ,
    private authService:AuthService
  ){
    
    
  }
  ngOnInit(){
    this.files=this.uploadService.getFiles();
    //console.log(this.files);
    console.log(this.authService.isLogged());
    // console.log("User Manger: ",this.mgr);
    // let obsConcat= Observable.of('Trigger Data Update');
    // this.obs.subscribe(console.log);
    // obsConcat
    //   .do(data=>this.subject.next('Modified'))
    //   .subscribe(console.log);
    // ;


  }

  // getUserInfo(){
  //   this.mgr.signinRedirect().then(user=>console.log("CallBack User: ",user))
  //   console.log(this.mgr);
  //   this.mgr.getUser().then(user=>{
  //     this.user=user;
  //     console.log(user)
  //   },err=>console.log(err));
  // }



  login(){
    this.authService.startAuthentication();
  }
  // call(){

  // }
  logout(){
    this.authService.logout();
    //this.mgr.signoutRedirect();
  }
  fileResult;
  uploadFile(){
    
    this.progressService.CreateUploadProgress().subscribe(progress=>
      {

        console.log(progress);
        this.ngZone.run(()=>{
          this.progress=progress.percentage;
        })
        
      },
      null,
      this.progress=null);

    let file:HTMLInputElement=this.inputFile.nativeElement;

    let upload=file.files[0];
    console.log("File Value:", file.value);
    console.log("File reference:", file.files);
    console.log("File reference:", file.files[0]);
    file.value='';
    this.uploadService.uploadFile(file)
        .subscribe(res=>{
          this.fileResult=res.json().result;
        }
      // ,()=>{
      //   this.toasterService.pop("error","Http Error", "Something Wrong With Http")
      // }
    );
    
    
    
  }
  
}
