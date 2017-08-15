import { BrowserXhr } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProgressService {

    private uploadProgress:Subject<any>

    constructor() {

     }

     CreateUploadProgress(){
         this.uploadProgress=new Subject();
         return this.uploadProgress;
     }

     notify(progress){
        this.uploadProgress.next(progress);
     }

     complete(){
         this.uploadProgress.complete();
     }
     getProgress(){
         return this.uploadProgress;
     }
}



@Injectable()
export class CustomXhrService extends BrowserXhr {

    constructor(private progressService:ProgressService) {super();}

    build()
    {
        let xhr:XMLHttpRequest=super.build();
        
        xhr.upload.onprogress=(event)=>{
            console.log(event);
            console.log(Math.round(event.loaded/event.total*100));
            this.progressService.notify(this.UploadObject(event));
        };

        xhr.upload.onloadend=()=>{
            //console.log("BEFORE:",this.progressService.getProgress());
            this.progressService.complete();
            //console.log("AFTER:",this.progressService.getProgress());
        }
        

        return xhr;
    }
    private UploadObject(event){
        return {
            total:event.total,
            percentage:Math.round(event.loaded/event.total*100)
        };
    }
}