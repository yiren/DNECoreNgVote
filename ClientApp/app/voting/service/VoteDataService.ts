import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import * as _ from 'lodash';

import {Headers, Http, Response} from '@angular/http';

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subject } from "rxjs/Subject";
import { Subscription } from 'rxjs/subscription';
import { VoteEvent } from '../model/VoteEvent';
import { VoteItem } from '../Model/voteitem';
import { VoteRecord } from '../model/VoteRecord';
import { VoteResult } from '../model/VoteResult';

//import { InMemoryDataService } from '../../webapi/InMemoryDataService';









@Injectable()
export class VoteDataService {
  // Test Purpose
  // record:VoteRecord={    updateEventById: any;

  //   eventName:'test',
  //   voterName:'nclee',
  //   event
  //   itemId:1,
  // };

  initial:VoteItem[]=[];
  private voteSubject=new BehaviorSubject(this.initial);
  private itemSubject=new BehaviorSubject({});

  event$:Observable<VoteEvent[]>
  //voteItem$:Observable<VoteItem>=this.itemSubject.asObservable();
  voteItems$:Observable<VoteItem[]>=this.voteSubject.asObservable();
  // Test Purpose
  // voteItem:VoteItem={
  //   id:4,
  //   eventName:"test",
  //   name:"test",
  //   voteCount:[],
  //   url:'',
  //   selected:false
  // };
  private voteItemsUrl='api/gamingKeyboards';
  private voteEventUrl='api/voteevents';
  private voteRecordUrl='api/voterecords';


  constructor(private http:Http){}
  // InMemoryDatabase can be updated only via http verbs
  // , private memDb:InMemoryDataService) { }

  // addVoteItem(){
  //   const data=JSON.stringify(this.voteItem);
  //   let headers=new Headers();
  //   console.log(data);
  //   headers.append('content-type','application/json');
  //   this.http.post(this.voteItemsUrl,data,{headers:headers})
  //            //.do(()=>this.voteSubject.next(this.getVoteItems()))
  //            .subscribe(res=>{
  //              console.log(res);

  //             });
  //   //this.getVoteItems().do(items=>this.voteSubject.next(items));
  // }

  // UpdateVoteCount(voteItem:VoteItem, record:VoteRecord){
  //   // console.log(this.memDb.voteItems);
  //   // _.forEach(this.memDb.voteItems, (i:VoteItem)=>{
  //   //     console.log(i);
  //   //     if(i.id === voteItem.id){
  //   //       console.log("Record Matched");
  //   //       i.voteCount.push(record);
  //   //     }
  //   // });
  //   const url=this.voteItemsUrl+'/'+record.itemId;
  //   voteItem.voteCount.push(record);
  //   const data=JSON.stringify(voteItem);
  //   let headers=new Headers();
  //   headers.append('content-type','application/json');
  //   console.log('putUrl',url);
  //   this.http.put(url,data,{
  //     headers:headers
  //   })
  //   .do(console.log)
  //   .subscribe(res=>{
  //    // this.voteSubject.next(this.getVoteItems());
  //   });

  //   // this.getVoteItemById(record.selectedOption)
  //   //     .subscribe(res=>console.log(res));
  // }

  addVoteEvent(event:VoteEvent){
    const body=JSON.stringify(event);
    console.log(body);
    let headers=new Headers();
    headers.append('content-type','application/json');
    this.http.post(this.voteEventUrl, body, {headers:headers})
        .do(console.log)
        .subscribe(res=>{
          console.log(res);
        })
  }
  getEventList(){
    return this.http.get(this.voteEventUrl)
                .do(console.log)
                .map(res=>res.json() as VoteEvent[])
                ;
  }
  getVoteEventById(eventId:string){
    return this.http.get(this.voteEventUrl+'/'+eventId)
                    .do(console.log)
                    .map(res=>res.json() as VoteEvent);
  }

  addVoteRecord(vote:VoteRecord){
    console.log("Added Vote:", vote);
    let headers=new Headers();
    headers.append('content-type','application/json');
    this.http.post(this.voteRecordUrl, vote, {headers:headers})
        .do(console.log)
        .subscribe(res=>{
          console.log(res);
        })
    // this.getVoteItemById(vote.itemId)
    //     .subscribe(
    //       (res: VoteItem) => {
    //         this.UpdateVoteCount(res, vote);
    //       }
    //     );

      // this.event$=this.getVoteEvents().take(1);
      // console.log(this.event$);
      // let voteItem;
      // let subscription=this.event$.subscribe(event=>{
      //        console.log("Events:",event);
      //        voteItem=_.forEach(event, (v:VoteEvent)=>{
      //          console.log("For Items:",v);
      //          _.forEach(v.voteItems, (i:VoteItem)=>{
      //             console.log("For itemId:", i.id);
      //             console.log("For selectedId:", vote.selectedOption);
      //             if(i.id === vote.selectedOption)
      //             {
      //              console.log("Matched VoteItem:",i);
      //              i.voteCount.push(vote);
      //             }
      //        });
      //       console.log("VoteResult:", event);
      // });
      // console.log(subscription);
    // }
    // );
  }

  getVoteItems():Observable<VoteItem[]>{
    return this.http.get(this.voteItemsUrl)
               .map(res=>res.json() as VoteItem[]);
  }

  getVoteResultForCharts(eventId:string){
    // return this.getVoteItems()
    //     .map(items=>{
    //       let records=[];
    //       for(const item of items){
    //           records.push({name:item.itemName});
    //       }
    //       return records;
    //     })
    //     .do(console.log);
    return this.http.get(this.voteEventUrl+'/'+eventId+'/voteresult')
                    .do(console.log)
                    .map(res=>res.json() as VoteResult);

  }

  // getVoteItemById(id:number):Observable<VoteItem>{
  //   const url=this.voteItemsUrl+'/'+id;
  //   console.log("queryUrl",url);
  //   this.voteItem$=this.http.get(url)
  //              .do(data=>console.log(data))
  //              .map(res=>res.json().data as VoteItem);
  //   return this.voteItem$;
  // }

  getVoteEvents():Observable<VoteEvent[]>{
    return this.http.get(this.voteEventUrl)
               .do(console.log)
               .map(res=>res.json() as VoteEvent[])
               ;
  }

  updateEventById(eventId:string, voteEvent:VoteEvent){
    const body=JSON.stringify(voteEvent);
    console.log(body);
    const headers=new Headers();
    headers.append('content-type','application/json');
    this.http.put(this.voteEventUrl+'/'+eventId, body, {headers:headers})
              .subscribe(res => console.log(res));
  }
  
  deleteEventById(eventId:string){
    const headers=new Headers();
    headers.append('content-type','application/json');
    this.http.delete(this.voteEventUrl+'/'+eventId, {headers:headers})
              .subscribe(res => console.log(res));
  }
}
