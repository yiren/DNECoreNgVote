import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { User, UserManager, UserManagerSettings } from 'oidc-client';

import { Http } from '@angular/http';

@Injectable()
export class AuthService {
  isLoggedIn=false;
  private user:User;
  //userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
  //private manager=new UserManager(getClientSettings());
  redirectUrl:string;
  constructor(private http:Http) {
    // this.manager.getUser().then(user=>{
    //   if(user){
    //     console.log("User in Constructor:",user);
        
    //     this.user=user;
    //     //this.userLoadededEvent.emit(user);
    //     console.log("this.user in Constructor:",user);
    //   }else{
    //     //console.log("Start Auth in Constructor");
    //     //this.startAuthentication();
    //   }
      
    // });
  }
  API_ENDPOINT='http://10.20.1.6:8009/api/token/auth';
  login(userId:string, password:string):boolean{
    var data={
      username:userId,
      password:password
    }
    return this.http.post(this.API_ENDPOINT, data);
  }

  loginServer(){
    
  }

  logout(){
    
  }

  isLogged(): boolean {
      
  }

  getClaims(): any {
    
  }

 
}





