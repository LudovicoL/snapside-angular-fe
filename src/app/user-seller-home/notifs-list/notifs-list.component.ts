import { Component, OnInit } from '@angular/core';
declare var $: any

import * as $AB from 'jquery';
import { NotifService } from 'src/app/services/notif.service';
import { GuiService } from 'src/app/services/gui.service';
import { DataService } from 'src/app/services/data.service';

import * as moment from "moment"
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-notifs-list',
  templateUrl: './notifs-list.component.html',
  styleUrls: ['./notifs-list.component.css']
})
export class NotifsListComponent implements OnInit {

  constructor(private _notif: NotifService, private _gui: GuiService, private _data: DataService, private router: Router, private activatedroute: ActivatedRoute) {}
  notifs=[]
  userid;
  loaded=false
  u_clear;
  c_interval;

  ngOnDestroy(){
    this.u_clear.unsubscribe()
    clearInterval(this.c_interval)
  }

  ngOnInit() {
    this.clearAll()



    this.loaded=false
    this._data.userid.subscribe(data=>{this.userid=data;})

    this.displayNotifications()
    this.c_interval = setInterval(() => {
        this.displayNotifications()
        this.newNotifsBadge()
        }, 2000);

  }
ngDoCheck(){
  // this.clearAll()

  // this.displayNotifications()

}

async newNotifsBadge(){
       if(this.notifs.length>0){
        this._gui.newNotifsBadge('1')

      }
      else this._gui.newNotifsBadge('0')
}

clearAll(){
  var data
     this.u_clear= this._gui.clear.subscribe(data=>{

      if (data==='1'){
        console.log('Cleared all')
        this.notifs=[]
        this._notif.clearAllByUser(this.userid).subscribe(()=>{this._gui.clearAllNotifs('0')})


        }})
}


  getNotifications()
  {
    return this._notif.getAllNotifsByUser(this.userid)
  }

delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

async displayNotifications()
{
  var that=this;
  this.getNotifications().subscribe(data=>{
  // console.log(JSON.stringify(data))
  // console.log(this.notifs.toString())
  if(data!==null && data!==[]){
  if (JSON.stringify(data)!==JSON.stringify(this.notifs) || false) {


    data.forEach(function(entry,index){
      if(entry.cleared<2 && !that.notifs.some((item) => item.idNotif === entry.idNotif) ){
        that.notifs.push(entry)


      }
      // console.log(entry.idNotif)

    })

  }
}
this.loaded=true
},()=>{},()=>this.loaded=true)
}


async clearNotif(idNotif){

  await this._notif.clearNotif(idNotif).toPromise()
  this.notifs=this.notifs.filter(item=>item.idNotif!==idNotif)
}
prettyDate(timestamp) {
  const t = parseInt(timestamp);
  return moment(t).format('DD-MMM-YYYY HH:mm');
}


}
