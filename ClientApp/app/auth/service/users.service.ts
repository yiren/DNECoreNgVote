import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { User } from './../model/user';

@Injectable()
export class UsersService {

// users:User[]=JSON.parse([{"sAMAccountName":"81442","mail":"u081442@taipower.com.tw"},
// {"sAMAccountName":"122248","mail":"u122248@taipower.com.tw"},
// {"sAMAccountName":"210310","mail":"u210310@taipower.com.tw"},
// {"sAMAccountName":"211033","mail":"u211033@taipower.com.tw"},
// {"sAMAccountName":"211223","mail":"u211223@taipower.com.tw"},
// {"sAMAccountName":"211363","mail":"u211363@taipower.com.tw"},
// {"sAMAccountName":"417547","mail":"u417547@taipower.com.tw"},
// {"sAMAccountName":"461677","mail":"u461677@taipower.com.tw"},
// {"sAMAccountName":"472237","mail":"u459317@taipower.com.tw"},
// {"sAMAccountName":"478584","mail":"u478584@taipower.com.tw"},
// {"sAMAccountName":"479194","mail":"u479194@taipower.com.tw"},
// {"sAMAccountName":"615169","mail":"u615169@taipower.com.tw"},
// {"sAMAccountName":"707986","mail":"u707986@taipower.com.tw"},
// {"sAMAccountName":"708053","mail":"u708053@taipower.com.tw"},
// {"sAMAccountName":"779645","mail":"u779645@taipower.com.tw"},
// {"sAMAccountName":"810263","mail":"u810263@taipower.com.tw"},
// {"sAMAccountName":"827865","mail":"u827865@taipower.com.tw"},
// {"sAMAccountName":"828018","mail":"u828018@taipower.com.tw"},
// {"sAMAccountName":"842132","mail":"u842132@taipower.com.tw"},
// {"sAMAccountName":"885499","mail":"u885499@taipower.com.tw"},
// {"sAMAccountName":"910974","mail":"u910974@taipower.com.tw"},
// {"sAMAccountName":"a270321","mail":"a270321@taipower.com.tw"},
// {"sAMAccountName":"a270706","mail":"a270706@taipower.com.tw"},
// {"sAMAccountName":"a274217","mail":"a274217@taipower.com.tw"},
// {"sAMAccountName":"a274251","mail":"a274251@taipower.com.tw"},
// {"sAMAccountName":"acyu","mail":"u836270@taipower.com.tw"},
// {"sAMAccountName":"AlexLee","mail":"u076152@taipower.com.tw"},
// {"sAMAccountName":"amy","mail":"u076036@taipower.com.tw"},
// {"sAMAccountName":"andrew","mail":"u780609@taipower.com.tw"},
// {"sAMAccountName":"Ann","mail":"u809222@taipower.com.tw"},
// {"sAMAccountName":"bcwang","mail":"u076087@taipower.com.tw"},
// {"sAMAccountName":"benq2806","mail":"u122806@taipower.com.tw"},
// {"sAMAccountName":"cftseng","mail":"u827232@taipower.com.tw"},
// {"sAMAccountName":"chchien","mail":"d0270503@taipower.com.tw"},
// {"sAMAccountName":"chenyt","mail":"a270605@taipower.com.tw"},
// {"sAMAccountName":"cherie","mail":"u681940@taipower.com.tw"},
// {"sAMAccountName":"CJ","mail":"u275281@taipower.com.tw"},
// {"sAMAccountName":"ckhsieh","mail":"u284606@taipower.com.tw"},
// {"sAMAccountName":"ckliu","mail":"d0270401@taipower.com.tw"},
// {"sAMAccountName":"craig","mail":"u076164@taipower.com.tw"},
// {"sAMAccountName":"cwwu","mail":"u684163@taipower.com.tw"},
// {"sAMAccountName":"cyc","mail":"u878607@taipower.com.tw"},
// {"sAMAccountName":"dahoz","mail":"u683437@taipower.com.tw"},
// {"sAMAccountName":"DAI","mail":"u156962@taipower.com.tw"},
// {"sAMAccountName":"David","mail":"u076188@taipower.com.tw"},
// {"sAMAccountName":"davsonnn","mail":"u076125@taipower.com.tw"},
// {"sAMAccountName":"deepyellow","mail":"u076202@taipower.com.tw"},
// {"sAMAccountName":"DEO0029","mail":"a270188@taipower.com.tw"},
// {"sAMAccountName":"dyguo","mail":"u823474@taipower.com.tw"},
// {"sAMAccountName":"fangho","mail":"u367577@taipower.com.tw"},
// {"sAMAccountName":"hch","mail":"u683553@taipower.com.tw"},
// {"sAMAccountName":"hsw","mail":"u806695@taipower.com.tw"},
// {"sAMAccountName":"huiyu","mail":"u283263@taipower.com.tw"},
// {"sAMAccountName":"Inmor","mail":"u076190@taipower.com.tw"},
// {"sAMAccountName":"james","mail":"u827725@taipower.com.tw"},
// {"sAMAccountName":"Jedi","mail":"u459317@taipower.com.tw"},
// {"sAMAccountName":"jhy1960","mail":"u823486@taipower.com.tw"},
// {"sAMAccountName":"jimmyhuang","mail":"u365332@taipower.com.tw"},
// {"sAMAccountName":"joney48","mail":"u417434@taipower.com.tw"},
// {"sAMAccountName":"joombuopre","mail":"u162154@taipower.com.tw"},
// {"sAMAccountName":"jsliu","mail":"u807610@taipower.com.tw"},
// {"sAMAccountName":"kctseng","mail":"u554826@taipower.com.tw"},
// {"sAMAccountName":"KHT","mail":"u117794@taipower.com.tw"},
// {"sAMAccountName":"klyang","mail":"u683502@taipower.com.tw"},
// {"sAMAccountName":"krbtgt","mail":""},
// {"sAMAccountName":"lincy","mail":"a274297@taipower.com.tw"},
// {"sAMAccountName":"mao","mail":"u809133@taipower.com.tw"},
// {"sAMAccountName":"mjlin","mail":"u002840@taipower.com.tw"},
// {"sAMAccountName":"MSAD$","mail":""},
// {"sAMAccountName":"mykuo","mail":"u805616@taipower.com.tw"},
// {"sAMAccountName":"nailun","mail":"u366688@taipower.com.tw"},
// {"sAMAccountName":"nclee","mail":"u807420@taipower.com.tw"},
// {"sAMAccountName":"NEDTPC$","mail":""},
// {"sAMAccountName":"ray","mail":"u807204@taipower.com.tw"},
// {"sAMAccountName":"rcwang","mail":"u254348@taipower.com.tw"},
// {"sAMAccountName":"Rock","mail":"u117782@taipower.com.tw"},
// {"sAMAccountName":"scchen","mail":"u076012@taipower.com.tw"},
// {"sAMAccountName":"SEOIMS$","mail":""},
// {"sAMAccountName":"shinya0812","mail":"u809590@taipower.com.tw"},
// {"sAMAccountName":"stephen","mail":"u670253@taipower.com.tw"},
// {"sAMAccountName":"stevecc","mail":"u839934@taipower.com.tw"},
// {"sAMAccountName":"swallow","mail":"u076113@taipower.com.tw"},
// {"sAMAccountName":"theway_home","mail":"u382655@taipower.com.tw"},
// {"sAMAccountName":"tmlee","mail":"u809018@taipower.com.tw"},
// {"sAMAccountName":"tsunghan","mail":"u777603@taipower.com.tw"},
// {"sAMAccountName":"tywang","mail":"u807723@taipower.com.tw"},
// {"sAMAccountName":"u003525","mail":"u003525@taipower.com.tw"},
// {"sAMAccountName":"u076214","mail":"u076214@taipower.com.tw"},
// {"sAMAccountName":"u117857","mail":"u117857@taipower.com.tw"},
// {"sAMAccountName":"u252876","mail":"u252876@taipower.com.tw"},
// {"sAMAccountName":"u273375","mail":"u273375@taipower.com.tw"},
// {"sAMAccountName":"u381208","mail":"u381208@taipower.com.tw"},
// {"sAMAccountName":"u773061","mail":"u773061@taipower.com.tw"},
// {"sAMAccountName":"u805919","mail":"ccyao@taipower.com.tw"},
// {"sAMAccountName":"u806226","mail":"u806226@taipower.com.tw"},
// {"sAMAccountName":"u910683","mail":"u910683@taipower.com.tw"},
// {"sAMAccountName":"wernlong","mail":"u265811@taipower.com.tw"},
// {"sAMAccountName":"whchang","mail":"u806303@taipower.com.tw"},
// {"sAMAccountName":"xioyu","mail":"u365229@taipower.com.tw"},
// {"sAMAccountName":"yctu","mail":"d0270501@taipower.com.tw"},
// {"sAMAccountName":"ydeng","mail":"u779126@taipower.com.tw"},
// {"sAMAccountName":"yswu","mail":"d02709@taipower.com.tw"},
// {"sAMAccountName":"ytc","mail":"u807216@taipower.com.tw"},
// {"sAMAccountName":"ywchu","mail":"d02742@taipower.com.tw"},
// {"sAMAccountName":"zwchen","mail":"u777476@taipower.com.tw"}]);

  USER_URL="home/getdneusers";
  constructor(private http:Http) { }

  getDneUsers():Observable<User[]>{
    return this.http.get(this.USER_URL)
             .do(console.log)
             .map(res=>res.json() as User[]);
            //  .data as User[]);
  }

  // validateDneUser(c: FormControl){
  //   return new Promise((resolve, reject)=>{
  //       this.getDneUsers()
  //           .subscribe(
  //             res=>{
  //               _.each(res, (user:User)){
  //               if(c.value === user){
  //                 console.log(res.name+"is valid.");
  //                 resolve({'isDneUser':true})
  //               }else{
  //                 console.log(c.value+"is not Dne User");
  //                 resolve(null);
  //               }}
  //               },
  //               console.error
  //           );
            
  //   });
  // }

}


