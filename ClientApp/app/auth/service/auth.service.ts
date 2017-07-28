import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  isLoggedIn=false;

  redirectUrl:string;
  constructor() {
  }

  login(userId:string, password:string):boolean{
    if(userId=='admin' && password=='1qaz@WSX')
    {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  logout(){
    this.isLoggedIn = false;
  }

}
