import { EventEmitter, Injectable, NgZone } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  token:any;
  isLoggedIn=false;
  //private user:User;
  private clientId="DneVote"
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
  login(userId:string, password:string){
    var data={
      username:userId,
      password:password,
      client_id:this.clientId,
      grant_type:"password",
      scope:"offline_access profile email"
    }
    return this.http.post(this.API_ENDPOINT, data);
  }
  refreshToken():Observable<boolean>{
    var data={
        client_id:this.clientId,
        grant_type:"refresh_token",
        refresh_token:this.token.refresh_token,
        scope:"offline_access profile email"
    };
    
    return this.getAuthFromServer(data)
}
  setAuth(token){
    
        if(this.getAuth()) localStorage.removeItem('auth');
        console.log(token);
        localStorage.setItem('auth',JSON.stringify(token));
    
}

getAuth(){
    
        var token=localStorage.getItem('auth');
        if(token){
            return JSON.parse(token);
        }
    
    
}
  
  getAuthFromServer(data:any):Observable<boolean>
  //:Observable<boolean>
  {
      //console.log(data);
      return this.http.post(this.API_ENDPOINT, data)
                 //.do(console.log)
                  .map((res:any)=>{
                      let token= res && res.token;
                      //console.log(token);
                      if(token){
                          this.token=token;
                          this.setAuth(token);
                          return true;
                      }
                      return Observable.throw('Unauthorized');
                 }
                  )
                 .catch(error => {
                      return new Observable<any>(error);
                 });
  }
  logout(){
    
  }

  isLogged(): boolean {
    
    return localStorage.getItem('auth') != null;
  }
 
}





