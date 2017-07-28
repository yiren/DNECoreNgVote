import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  submitted=false;
  isValid=false;

  constructor(private authService:AuthService,
              private router:Router,
              private toasterService:ToasterService) { }
  ngOnInit() {
    this.loginForm=new FormGroup({
      'userId':new FormControl('',Validators.required),
      'password':new FormControl('', [Validators.required])
    });
  }
  onSubmit(){
    const userId=this.loginForm.controls['userId'].value;
    const password=this.loginForm.controls['password'].value
    this.isValid=this.authService.login(userId,password)
    if(this.isValid){
      this.submitted=true;
      this.router.navigateByUrl(this.authService.redirectUrl?this.authService.redirectUrl:'/');
    }else{
      this.toasterService.pop('error', '帳號或是密碼錯誤','請輸入正確資訊');
    }
    
  }
}
