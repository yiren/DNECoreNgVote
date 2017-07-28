import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { sharedConfig } from './app.module.shared';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent,sharedConfig.declarations],
    imports: [
        ServerModule,
        ...sharedConfig.imports
    ]
})
export class AppModule {
}
