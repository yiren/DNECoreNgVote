import { ErrorHandler, Inject, NgZone } from '@angular/core';

import { ToasterService } from 'angular2-toaster';
import { ToastyService } from "ng2-toasty";

export class AppErrorHandler implements ErrorHandler {
    constructor(@Inject(ToasterService) private toasterService:ToasterService,
                @Inject(ToastyService) private toastyService:ToastyService,
                private ngZone:NgZone){}
    handleError(error: any): void {
        //console.log("ERROR",error);
        //console.log(this.toasterService);
        //console.log(this.toastyService);
        
        this.ngZone.run(()=>{
            this.toasterService.pop('error','Application Error','Please consult Admin');
        //     this.toastyService.error({
        //     title: "App Error",
        //     msg: "Please Consult Admin",
        //     showClose: true,
        //     timeout: 5000,
        //     theme: 'bootstrap'
        // });
        })
        
    }
    
}