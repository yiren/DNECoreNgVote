import { User, UserManager, UserManagerSettings } from 'oidc-client';

import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  isLoggedIn=false;
  private user:User=null;
  cred;
  private manager=new UserManager(getClientSettings());
  redirectUrl:string;
  constructor() {
    this.manager.getUser().then(user=>{
      this.user=user;
    });
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
    this.manager.signoutPopup();
  }

  isLogged(): boolean {
    
    console.log("User in AuthService:",this.user);
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
      this.cred=user;
      this.user = user;
    });
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'http://localhost:5000/',
    client_id: 'angular2',
    redirect_uri: 'http://localhost:5200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:5200/',
    response_type: "id_token token",
    scope: "openid profile api1 voteEventData",
    //filterProtocolClaims: true,
    loadUserInfo: true
  };

}
