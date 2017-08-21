import * as moment from 'moment';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import {Observable} from 'rxjs/observable';
import { Subscription } from 'rxjs/subscription';
import { VoteDataService } from './service/VoteDataService';
import { VoteEvent } from './model/VoteEvent';
import { VoteItem } from './model/VoteItem';
import { VoteRecord } from './model/VoteRecord';

@Component({
  selector: 'app-vote-home',
  templateUrl: './vote-home.component.html',
  styleUrls: ['./vote-home.component.css']
})
export class VoteHomeComponent implements OnInit, OnDestroy {

  voteItems;
  voteEvents;
  subscription:Subscription;
  submitted=false;
  isLogged:boolean;
  constructor(private voteDataService:VoteDataService,
              private authService:AuthService,
              private route:ActivatedRoute) { }

  ngOnInit() {
    //console.log("---VoteHome ngOnit---");
    // this.voteItems=this.voteDataService.getVoteItems();
                        //.subscribe(data => this.voteItems = data);
    // this.voteEvents=
    // this.subscription=this.voteDataService.getVoteEvents()
    //                     .subscribe(data => {
    //                       this.voteEvents=data;
    //                       console.log(this.voteEvents);
    //                     });
    this.isLogged=this.authService.isLoggedIn;
    this.subscription=this.route.data.subscribe(data=>{
        //console.log(data.events);
        this.voteEvents=data.events;
    
    });
    //console.log(this.voteEvents);
  }
  addVoteRecord(record:VoteRecord){
    this.submitted=true;
    this.voteDataService.addVoteRecord(record);
  }
  // addVoteItem(){
  //   this.voteDataService.addVoteItem();
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isDue(dueDate:string){
    let due=moment(dueDate, 'YYYY/MM/DD');
    //console.log(due);
    var now=moment();
    return due<now;
    
  }
}
