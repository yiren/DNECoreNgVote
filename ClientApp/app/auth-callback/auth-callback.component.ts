import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.authService.completeAuthentication().then(
      ()=>this.router.navigate(['/']),
      ()=>this.authService.startAuthentication()
    );
    
    //console.log(this.authService.userLoadededEvent);
    //console.log(this.authService.isLogged());
    //console.log(this.authService.getClaims());
    //console.log(this.authService.getAuthorizationHeaderValue());
  }

}
