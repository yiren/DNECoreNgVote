import { CalendarModule, DropdownModule, ListboxModule, MultiSelectModule, RadioButtonModule, ToggleButtonModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { CounterComponent } from './components/counter/counter.component';
import { EditEventComponent } from './voting/edit-event/edit-event.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { EventFormComponent } from './voting/event-form/event-form.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts/release';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { VoteFormComponent } from './voting/vote-form/vote-form.component';
import { VoteHomeComponent } from './voting/vote-home.component';
import { VotingResultComponent } from './voting/voting-result/voting-result.component';
import { appRouting } from './app.route';

export const sharedConfig: NgModule = {
    declarations: [
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        AppComponent,
        VoteHomeComponent,
        VoteFormComponent,
        AuthComponent,
        EventFormComponent,
        VotingResultComponent,
        ErrorpageComponent,
        EditEventComponent,
        LoginComponent
    ],
    imports: [
        
        // RouterModule.forRoot([
        //     { path: '', redirectTo: 'home', pathMatch: 'full' },
        //     { path: 'home', component: HomeComponent },
        //     { path: 'counter', component: CounterComponent },
        //     { path: 'fetch-data', component: FetchDataComponent },
        //     { path: '**', redirectTo: 'home' }
        // ])
        appRouting
    ]
};
