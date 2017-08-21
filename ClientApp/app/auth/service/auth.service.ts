import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { User, UserManager, UserManagerSettings } from 'oidc-client';

@Injectable()
export class AuthService {
  isLoggedIn=false;
  private user:User;
  //userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
  private manager=new UserManager(getClientSettings());
  redirectUrl:string;
  constructor() {
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

  login(userId:string, password:string):boolean{
    if(userId=='admin' && password=='1qaz@WSX')
    {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  loginServer(){
    
  }

  logout(){
    this.manager.signoutRedirect();
    }

  isLogged(): boolean {
      console.log("Session Key: ",sessionStorage.getItem("oidc.user:http://localhost:5000/:angular2"));
      return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      console.log('Callback user:', user);
      this.user = user;
      //this.cred=user;
      console.log("this.user", this.user);
    });
  }
}



export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'http://localhost:5000/',
    client_id: 'angular2',
    redirect_uri: 'http://localhost:5200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:5200/',
    popup_redirect_uri:'http://localhost:5200/auth-callback',
    popup_post_logout_redirect_uri:'http://localhost:5200/',
    response_type: "id_token token",
    scope: "openid profile api1 voteEventData",
    filterProtocolClaims: true,
    loadUserInfo: true
  };

}
