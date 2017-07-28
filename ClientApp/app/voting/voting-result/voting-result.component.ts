import * as _ from 'lodash';

import { ActivatedRoute, Router } from "@angular/router";
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/subscription';
import { VoteDataService } from '../service/VoteDataService';
import { VoteEvent } from './../model/VoteEvent';
import { VoteItem } from '../model/VoteItem';

@Component({
  selector: 'app-voting-result',
  templateUrl: './voting-result.component.html',
  styleUrls: ['./voting-result.component.css']
})
export class VotingResultComponent implements OnInit, OnDestroy {
  
  // 原本是想把投票以及結果顯示在同一頁，投票完成後同一頁結果自動更新
  // 但Observable跟Suject觀念不清，先以Route實作
  // 基本功能測試OK後，再加強Observable及Subject觀念
  // @Input()
  // event;

  subscription:Subscription;
  single;  
  view: any[] = [800, 600];
  isLoaded=false;
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '選項名稱';
  showYAxisLabel = true;
  yAxisLabel = '票數';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  onSelect(event) {
    //console.log(event);
  }
  // barChartOptions: any = {
  //   scaleShowVerticalLines: false,
  //   responsive: true,
  //   scales: {
  //       xAxes: [{
  //           ticks: {
  //               beginAtZero:true
  //           }
  //       }]
  //   }
  // };
  // barChartLabels: string[] = [];
  // barChartType: string = 'bar';
  // barChartLegend: boolean = true;
  // barChartData: any[] =  [];
  // loaded=false;
  // eventName:string;
  constructor(private voteDataService:VoteDataService,
              private router:Router,
              private route:ActivatedRoute) {
                
  }
  ngOnInit() {
    //console.log("---VoteResultK ngOnit---");
    //console.log(this.event);
    // const e:VoteEvent=this.event
    // _.forEach(e.voteItems, (i:VoteItem) => {
    //   console.log(i);
    //   this.polarAreaChartData.push(i.voteCount.length);
    //   this.polarAreaChartLabels.push(i.name);
    // });
    
    // Data Format Example
    // export var single = [
    //   {
    //     "name": "Germany",
    //     "value": 8940000
    //   },
    //   {
    //     "name": "USA",
    //     "value": 5000000
    //   },
    //   {
    //     "name": "France",
    //     "value": 7200000
    //   }
    // ];
    // let eventId = 'b054f3ae-3540-4461-82d6-fac87199d937';
    //let eventId = this.route.snapshot.params['eventId'];
    //console.log(eventId);        
    // this.activatedRoute.snapshot.params['eventId'];
    // this.subscription = this.voteDataService
    //                   .getVoteResultForCharts(eventId)
    //                   .subscribe(data=>{
    //                     this.single=data;
    //                     this.isLoaded=true;
    //                   });
    this.subscription=this.route.data.subscribe(data=>{
      //console.log(data.result);
      this.single=data.result;
      this.isLoaded=true;
    })

    //console.log(this.single);
            // _.forEach(items, (item)=>{
            //   console.log(item);
            //   this.polarAreaChartData.push(item.voteCount.length);
            //   this.polarAreaChartLabels.push(item.name);
            // });
        //    this.eventName = items[0].eventName;
        //    console.log(this.barChartData);
        //    console.log(this.barChartLabels);
        //    this.loaded=true;
        // });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
