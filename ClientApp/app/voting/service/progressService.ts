import { BrowserXhr } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProgressService {

    uploadProgress:Subject<any>=new Subject();

    constructor() {

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
            this.progressService.uploadProgress.next({
                total:event.total,
                percentage:Math.round(event.loaded/event.total*100)
            });
        };
        

        return xhr;
    }
}