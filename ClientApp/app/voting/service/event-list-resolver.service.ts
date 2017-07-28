import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { VoteDataService } from './VoteDataService';
import { VoteEvent } from '../model/VoteEvent';

@Injectable()
export class EventListResolverService implements Resolve<VoteEvent[]> {
  

  constructor(private voteDataService:VoteDataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): VoteEvent[] | Observable<VoteEvent[]> | Promise<VoteEvent[]> {
    return this.voteDataService.getVoteEvents()
               .do(console.log)
               .toPromise()
               .then((data=>{
                 return data;
                }));
  }
}
