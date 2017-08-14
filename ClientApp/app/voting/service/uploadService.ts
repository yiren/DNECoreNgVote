import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UploadService {

    constructor(private http:Http) { }

    uploadFile(file){
        let formData=new FormData();
        formData.append("formFile",file);
        return this.http.post('/home/upload',formData);
    }

    getFiles(){
        return this.http.get('/home/getitemfiles')
             .map(res=>res.json().result);
    }
}