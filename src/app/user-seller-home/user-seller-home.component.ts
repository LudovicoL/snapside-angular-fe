import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { InteractionService } from '../services/interaction.service';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/user';
import { DataService } from '../services/data.service';
import { NotifService } from '../services/notif.service';
declare var $: any
import * as $AB from 'jquery';
import * as moment from "moment";
import { GuiService } from '../services/gui.service';
import { MessagingService } from '../shared/messaging.service';
import { Subscription } from 'rxjs';
import { AdService } from '../services/ad.service';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { notifTrigger } from '../globals/globals';
import * as firebase from 'firebase';

@Component({
  selector: 'app-user-seller-home',
  providers: [],
  templateUrl:'./user-seller-home.component.html',
  styles: []
})
export class UserSellerHomeComponent implements OnInit {
  public userData : IUser
  userid : string;
  name: string;
  parentMessage = "message from parent"
  mobile;
  dateNow;
  notifs=[]
  //config
  persistPush=true
  firebase_redundancy=false;
  //
  focusedAd=null;
  token='';
  u_firebaseToken:Subscription;
  c_interval;
  messaging = firebase.messaging()
  currentMessage = new BehaviorSubject(null);

  constructor(private _interactionService: InteractionService,
    private userService: UserService,
    private http: HttpClient,
    private _Activatedroute:ActivatedRoute,
    private data: DataService,
    private cdRef:ChangeDetectorRef,
    private _notif:NotifService,
    private _gui:GuiService,
    private router: Router,
    private messagingService: MessagingService,
    private _ad: AdService,
    private angularFireMessaging: AngularFireMessaging
    ) { }


ngOnChange(){
  this.mobile=this.isMobile()

}
ngOnDestroy(){
  this.u_firebaseToken.unsubscribe()
  clearInterval(this.c_interval)
}

ngDoCheck(){
  // this._gui.clear.subscribe(data=> {
  //   if (data==='1'){
  //       this.notifs=[]
  //       }
  // })


  this.clearAll()
}

receiveMessage() {
  this.angularFireMessaging.messages.subscribe(
    (payload) => {
      console.log("new message received. ", payload);
      this.currentMessage.next(payload);
      this.newNotifsBadge()
      this.displayNotifications()
    })
}


    ngOnInit() {
    this._Activatedroute.paramMap.subscribe(params => {
      this.userid = params.get('userid');
    });

    this._gui.focusedAdId.subscribe(data=>{if(data>0)this._ad.getAdById(data).subscribe(data=>{this.focusedAd=data})})

    this.data.sendUserid(this.userid)
    // this.messagingService.deleteToken()

    this.messagingService.requestPermission(this.userid)

    this.u_firebaseToken=this._notif.firebaseToken.subscribe(data=>{this.token=data;})




    // toast notification update system cicle.. it can be put also outside the firebaseToken subscription if firebase_redundacy is false
    if(notifTrigger!=='FIREBASE'){

    this.c_interval = setInterval(() => {
      this.newNotifsBadge()
      this.displayNotifications()
        }, 2000);

      }
    else{
        this.receiveMessage()
    }







    // this.data.userid.subscribe(message => this.userid = message);

  this.userService.getUserById(this.userid).
      subscribe(data => this.userData=data)
  }

  async newNotifsBadge(){
    if(this.notifs.length>0){
     this._gui.newNotifsBadge('1')

   }
   else this._gui.newNotifsBadge('0')
  }

getNotifications()
  {
    return this._notif.getAllNotifsByUser(this.userid)
  }

delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

 clearAll()
{

      this._gui.clear.subscribe( data =>{

        if (data==='1'){
          this.notifs=[]

          // this._gui.clearAllNotifs('0')
      }})
}

async displayNotifications()
{
  var that=this;
  this.getNotifications().subscribe( async data=>{

  // console.log(JSON.stringify(data))
  // console.log(this.notifs.toString())
  if(data!==null && data!==[]){

  if (JSON.stringify(data)!==JSON.stringify(this.notifs) || false) {
    data.forEach(function(entry,index){
      if(entry.cleared===0 && !that.notifs.some((item) => item.idNotif === entry.idNotif) ){
        that.notifs.push(entry)
        if(that.firebase_redundancy)
        that._notif.firebasePush(that.token,entry.subject,entry.title).subscribe(data=>console.log(data))
        if(!that.persistPush){
         that._notif.clearPush(entry.idNotif).subscribe(data => {console.log(data)}) }
      }
      // console.log(entry.idNotif)

    })

    await this.delay(10);
    $("#my-toast.toast").toast('show');
  }
}

})

}


async closePush(idNotif){
  if(this.persistPush){
  await this._notif.clearPush(idNotif).toPromise()}
  await this.delay(200)
  this.notifs=this.notifs.filter(item=>item.idNotif!==idNotif)


}

prettyTime(timestamp) {
  const t = parseInt(timestamp);
  return moment(t).format('HH:mm:ss');
}

myAlert(msg){alert(msg)}


  sendRequest(): void {
    this.http.get('http://localhost:8080/notif/getAll')
      .subscribe((res) => {
        console.log(res);
      });
  }



  getUserData(userid){
  this.http.get('http://localhost:8080/user/getById/'+userid)
  .subscribe((res) => { this.name = res['name']; });
  }

  sendName(){
    this._interactionService.sendName(this.name);
  }


  isMobile(){
    if($(window).width()< 550 ){

    return true; }
    else{

      return false;
  }
  }

getAdInfo(){
this._gui.focusedAdId.subscribe(data=>{if(data>0)this._ad.getAdById(data).subscribe(data=>{this.focusedAd=data})})
}

}
