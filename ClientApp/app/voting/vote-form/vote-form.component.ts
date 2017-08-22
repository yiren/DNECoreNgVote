import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/switchmap";

import * as _ from 'lodash';

import {ActivatedRoute, Router} from '@angular/router';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import { Observable } from 'rxjs/observable';
import { Subject } from "rxjs/Subject";
import { Subscription } from 'rxjs/subscription';
import { User } from '../../auth/model/user';
import { UsersService } from '../../auth/service/users.service';
import { VoteDataService } from '../service/VoteDataService';
import { VoteEvent } from '../model/VoteEvent';
import { VoteItem } from '../Model/VoteItem';
import { VoteRecord } from './../model/VoteRecord';

@Component({
  selector: 'app-vote-form',
  templateUrl: './vote-form.component.html',
  styleUrls: ['./vote-form.component.css']
})
export class VoteFormComponent implements OnInit, OnDestroy {
  eventId: string;
  @ViewChild('name') name;
  //voteEvents$:Observable<VoteEvent[]>
  votingForm:FormGroup;
  voteItems:VoteItem[];
  subscription:Subscription;
  eventName:string;
  user:string;
  users$:Observable<User[]>;
  //voteItems$:Subscription;
  // @Input()
  // voteItems:VoteItem[];

  // @Input()
  // voteEvent:VoteEvent;

  // @Output()
  // recordForEmit=new EventEmitter<VoteRecord>()
  input$=new Subject<string>();
 // checkboxGroup:FormGroup
  //radioGroup:FormGroup
  constructor(private voteDataService:VoteDataService,
              private userService:UsersService,
              private router:Router,
              private route:ActivatedRoute
              ) {
  }
  ngOnInit() {
    // this.checkboxGroup=new FormGroup({});
    // this.radioGroup=new FormGroup({});
    // for(let item of this.gamingKeyboards){
    //   let control=new FormControl(item.selected);

    //   this.radioGroup.addControl(item.name, control);
    //   console.log('radio:',this.radioGroup);
    // }
    this.input$.subscribe((input)=>{

    })
    console.log(this.name);
    this.subscription=this.voteDataService
        .getVoteEventById(this.route.snapshot.params['eventId'])
        .subscribe(event=>{
          //console.log(event);

          this.voteItems=event.voteItems;
          this.eventName=event.eventName;
          this.eventId=event.eventId;
          //console.log(this.voteItems[0].eventName);
    //       for(let item of items){
    //         const control=new FormControl(false);
    //         this.checkboxGroup.addControl(item.name,control);
    //       }
    //       console.log('checkbox:',this.checkboxGroup);
        }
        );



    
    //console.log("User$",this.users$);
    this.votingForm=new FormGroup({
      'voterName':new FormControl('',[Validators.required],this.validateDneUser.bind(this)),
      'selectedOptionId':new FormControl(null,[Validators.required])
      
      //'checkOptions':this.checkboxGroup
    });
    console.log(this.votingForm);
    this.votingForm.valueChanges
      .subscribe(data=>{
        console.log(data);
        this.onValueChanged(data)
      });

    //??
    this.onValueChanged();
  }

  onValueChanged(data?:any){
    if(!this.votingForm){return ;}

    const form = this.votingForm;

    for(const field in this.formErrors){
      this.formErrors[field] = '';
      const control=form.get(field);
      //console.log("dirty",control.dirty);
      //console.log("touched", control.touched);
      if(control && control.dirty && control.touched && !control.valid){
        //console.log(control.errors);
        const messages = this.validationMessages[field];
        for(const key in control.errors){
          //console.log('error', messages[key]);
          this.formErrors[field]+=messages[key] + '';
        }
      }
    }
    console.log(this.votingForm);


  }

  validateDneUser(c: FormControl){
    const inputUser$=c.valueChanges.debounceTime(1000);
     
    

    return new Promise((resolve, reject)=>{
            inputUser$
            
            .switchMap(user=>this.userService.queryDneUser(user))
            
            .subscribe(
              res => {
                //console.log(res.isDneUser);
                if(!res.isDneUser){
                  //console.log("Not Dne User");
                  resolve({'NotDneUser':true});
                }
                if(res.isDneUser==true){
                  resolve(null);
                }
              }
                //console.log("Users",res);
                // let matched=_.find(res, (user:User)=>{
                //   return user.sAMAccountName===c.value
                // })
                // if(matched === undefined){
                //   console.log(c.value+" is not valid.");
                //   resolve({'NotDneUser':true})
                // }else{
                //   console.log(c.value+"is Dne User");
                //   resolve(null);
                // }},
                // console.error}
            );
    });
  }
  validateIsVoted(c:FormControl){

  }
  formErrors={
    'voterName':'',
    'selectedOptionId':''
  }

  validationMessages={
    'voterName':{
      'required':'開機帳號必填',
      'duplicated':'您已經投過票囉!!',
      'NotDneUser':'您不是核技處成員喔'
    },
    'selectedOptionId':{
      'required':'請選擇'
    }
  }



  onSubmit(){

    this.votingForm.addControl('eventId',
        new FormControl(this.eventId,Validators.required));
    //this.recordForEmit.emit(this.votingForm.value);
    //console.log(this.votingForm.value)
    this.voteDataService.addVoteRecord(this.votingForm.value)
         .subscribe(res=>this.router.navigate(['/']));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
