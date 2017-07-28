import * as moment from 'moment';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/subscription';
import { VoteDataService } from '../service/VoteDataService';
import { VoteEvent } from './../model/VoteEvent';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  subscription:Subscription;
  editForm:FormGroup;
  event$;
  submitted=false;
  constructor(private voteDataService:VoteDataService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.editForm = new FormGroup({
                    'eventId': new FormControl(''),
                    'eventName': new FormControl('', Validators.required),
                    'itemNames':new FormArray([]),
                    'dueDate': new FormControl('', Validators.required)
                  });
    this.subscription = this.voteDataService
               .getVoteEventById(this.route.snapshot.params['eventId'])
               .subscribe(data => {
                  const itemsArray = new FormArray([], Validators.required);
                  for(const item of data.voteItems){
                      (<FormArray>this.editForm.get('itemNames')).push(new FormControl(item.itemName))
                  }
                  this.editForm.patchValue({
                    'eventId':data.eventId,
                    'eventName': data.eventName,
                    'dueDate': data.dueDate
                  });
                  //console.log(itemsArray);
               });
  }

  addVoteItem() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.editForm.get('itemNames')).push(control);
  }

  removeItem(index){
    //console.log(index);
    (<FormArray>this.editForm.get('itemNames')).removeAt(index);
  }

  deleteEvent(){
    this.voteDataService.deleteEventById(this.editForm.controls['eventId'].value);
  }

  onSubmit(){
    this.submitted=true;
    const eventId=this.editForm.controls['eventId'].value;
    this.subscription.unsubscribe();
    //console.log(this.editForm.value)
    this.voteDataService.updateEventById(eventId, this.editForm.value);
    this.router.navigateByUrl("/");
  }
}
