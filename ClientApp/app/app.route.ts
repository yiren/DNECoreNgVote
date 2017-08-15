import { Route, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AuthGuardService } from './auth/service/auth-guard.service';
import { EditEventComponent } from './voting/edit-event/edit-event.component';
import { EventFormComponent } from './voting/event-form/event-form.component';
import { EventListResolverService } from './voting/service/event-list-resolver.service';
import { LoginComponent } from './auth/login/login.component';
import { VoteFormComponent } from './voting/vote-form/vote-form.component';
import { VoteHomeComponent } from './voting/vote-home.component';
import { VoteResultResolverService } from './voting/service/vote-result-resolver.service';
import { VotingResultComponent } from './voting/voting-result/voting-result.component';

export const AppRoute:Routes=[
  
  {
    path:'auth-callback',
    component:AuthCallbackComponent
  },
  {
    path:'createVote', 
    component:EventFormComponent,
    canActivate:[AuthGuardService]
  },
  {path:'voteForm/:eventId', component:VoteFormComponent},
  {
    path:':eventId/voteResult',
    component:VotingResultComponent,
    resolve:{result:VoteResultResolverService}
  },
  {
    path:':eventId/editEvent', 
    component:EditEventComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'',
    component:VoteHomeComponent,
    resolve:{events:EventListResolverService}
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    redirectTo:'/',
    pathMatch:'full'
  },
  {path:'**', component:VoteHomeComponent}

]

export const appRouting=RouterModule.forRoot(AppRoute);
