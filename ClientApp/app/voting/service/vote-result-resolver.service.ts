import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { VoteDataService } from './VoteDataService';
import { VoteResult } from '../model/VoteResult';

@Injectable()
export class VoteResultResolverService implements Resolve<VoteResult> {
  

  constructor(private voteDataService:VoteDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): VoteResult | Observable<VoteResult> | Promise<VoteResult> {
    
    return this.voteDataService.getVoteResultForCharts(route.params['eventId']);
  }
}
