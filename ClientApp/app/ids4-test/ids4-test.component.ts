import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-ids4-test',
  templateUrl: './ids4-test.component.html',
  styleUrls: ['./ids4-test.component.css']
})
export class Ids4TestComponent implements OnInit {
  token;
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }
  getUserInfo(){
    console.log(this.authService.isLogged());
  }



  login(){
    this.authService.startAuthentication();
  }
  // call(){

  // }
  logout(){
    this.authService.logout();
    //this.mgr.signoutRedirect();
  }
  
  getAccessToken(){
    this.token=this.authService.getAuthorizationHeaderValue();
  }
}
