import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import { Router } from '@angular/router';
import { VoteDataService } from '../service/VoteDataService';
import { VoteItem } from '../Model/VoteItem';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  submitted=false;
  eventForm:FormGroup;
  events$;
  constructor(private voteDataService:VoteDataService,
              private router:Router) { }

  ngOnInit() {
    this.eventForm=new FormGroup({
      'eventId':new FormControl(''),
      'eventName':new FormControl(null,Validators.required),
      'itemNames':new FormArray([]),
      'dueDate': new FormControl('',Validators.required),
      'dneUsers':new FormControl('', [Validators.required])
    });
    this.events$=this.voteDataService.getEventList();
    //console.log(this.events$);
  }

  removeItem(index){
    //console.log(index);
    (<FormArray>this.eventForm.get('itemNames')).removeAt(index);
  }

  addVoteItem(){
    //console.log('Added Control...');
    const control=new FormControl(null, Validators.required);
    (<FormArray>this.eventForm.get('itemNames')).push(control);
  }

  onSubmit(){
    this.submitted=true;
    //console.log(this.eventForm);
    this.voteDataService.addVoteEvent(this.eventForm.value)
        .subscribe(res=>this.router.navigateByUrl("/"));
    
  }
}
