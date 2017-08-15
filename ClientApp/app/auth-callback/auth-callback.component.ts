import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.completeAuthentication();
    console.log(this.authService.cred);
    //console.log(this.authService.isLogged());
  }

}
