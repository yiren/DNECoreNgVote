import {CalendarModule, DropdownModule, ListboxModule, MultiSelectModule, RadioButtonModule, ToggleButtonModule} from 'primeng/primeng';
import { CustomXhrService, ProgressService } from './voting/service/progressService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthConfig } from './auth/service/authConfig';
import { AuthGuardService } from './auth/service/auth-guard.service';
import { AuthService } from './auth/service/auth.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserXhr } from '@angular/http';
import { EventListResolverService } from './voting/service/event-list-resolver.service';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import {NgxChartsModule} from '@swimlane/ngx-charts/release';
import { TestComponent } from './test/test.component';
import {ToasterModule} from 'angular2-toaster/angular2-toaster';
import { ToasterService } from 'angular2-toaster';
import { UploadService } from './voting/service/uploadService';
import { UsersService } from './auth/service/users.service';
import { VoteDataService } from './voting/service/VoteDataService';
import { VoteResultResolverService } from './voting/service/vote-result-resolver.service';
import { sharedConfig } from './app.module.shared';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [...sharedConfig.declarations, TestComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ...sharedConfig.imports,
        BrowserAnimationsModule,
        CalendarModule,
        ReactiveFormsModule,
        DropdownModule,
        ListboxModule,
        MultiSelectModule,
        // MdInputModule,
        // MdRadioModule,
        // MdCardModule,
        // MdIconModule,
        // MdButtonModule,
        // MdCheckboxModule,
        NgxChartsModule,
        ToggleButtonModule,
        RadioButtonModule,
        ToasterModule
    
    
    // InMemoryWebApiModule.forRoot(InMemoryDataService, {delay:1000}),
    
   
    ],
    providers: [
        VoteDataService,
        UsersService,
        EventListResolverService,
        VoteResultResolverService,
        AuthGuardService,
        AuthService,
        AuthConfig,
        ToasterService,
        UploadService,
        ProgressService,
        {provide:BrowserXhr, useClass:CustomXhrService},
        { provide: 'ORIGIN_URL', useValue: location.origin }
    ]
})
export class AppModule {
}
