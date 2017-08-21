import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';

import { ProgressService } from '../voting/service/progressService';
import { UploadService } from '../voting/service/uploadService';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  @ViewChild('formFile') inputFile:ElementRef;
  files;
  progress;
  constructor(private ngZone:NgZone,
              private progressService:ProgressService,
              private uploadService:UploadService) { }

  ngOnInit() {
    this.files=this.uploadService.getFiles();
  }
  fileResult;
  uploadFile(){
    
    this.progressService.CreateUploadProgress().subscribe(progress=>
      {

        console.log(progress);
        this.ngZone.run(()=>{
          this.progress=progress.percentage;
        })
      },
      null,
      this.progress=null);

    let file:HTMLInputElement=this.inputFile.nativeElement;

    let upload=file.files[0];
    console.log("File Value:", file.value);
    console.log("File reference:", file.files);
    console.log("File reference:", file.files[0]);
    file.value='';
    this.uploadService.uploadFile(file)
        .subscribe(res=>{
          this.fileResult=res.json().result;
        }
      // ,()=>{
      //   this.toasterService.pop("error","Http Error", "Something Wrong With Http")
      // }
    );
  }
}
