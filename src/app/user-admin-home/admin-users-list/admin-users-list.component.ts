import { Component, OnInit } from '@angular/core';
import { BenefitService } from 'src/app/services/benefit.service';
import { DataService } from 'src/app/services/data.service';
import { IBenefit } from 'src/app/interfaces/benefit';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { AdService } from 'src/app/services/ad.service';
import { IUser } from 'src/app/interfaces/user';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.css']
})
export class AdminUsersListComponent implements OnInit {
  userid;
  selectedCustomer: IUser;
  benefits : IBenefit[]
  constructor(private _data:DataService, private _user: UserService, private _ad: AdService, private _sanitizer: DomSanitizer) {
    this._data.userid.subscribe(data=>{this.userid=data})
   }

   users : IUser[];
  ngOnInit() {

    this._user.getAllUsers().subscribe(data=>{this.users=data;
    this.users.forEach(element => {
      element['userImgSanitized']=this.getImageSanitized(element.userImg)
    });
    })



  }


  prettyDate(timestamp) {
    const t = parseInt(timestamp);
    return moment(t).format('DD-MMM-YYYY');
  }

  prettyDateTime(timestamp) {
    const t = parseInt(timestamp);
    return moment(t).format('DD-MMM-YYYY HH:mm:ss');
  }



  getImageSanitized(base64img)

{

  if (base64img===null){
    console.log('getimg')

    return ("assets/utils_imgs/nouserimg.svg")
  }
  else if (base64img.lastIndexOf('/9j',0)===0){
  return this._sanitizer.bypassSecurityTrustResourceUrl("data:image/jpg;base64, " + base64img);
  }
  else {
    return this._sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64, " + base64img);
    }
}
}
