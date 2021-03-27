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
  selector: 'app-seller-reservations',
  templateUrl: './seller-reservations.component.html',
  styleUrls: ['./seller-reservations.component.css']
})
export class SellerReservationsComponent implements OnInit {
  userid;
  selectedCustomer: IUser;
  benefits : IBenefit[]
  constructor(private _benefits: BenefitService, private _data:DataService, private _user: UserService, private _ad: AdService, private _sanitizer: DomSanitizer) {
    this._data.userid.subscribe(data=>{this.userid=data})
   }

  ngOnInit() {

    this._benefits.getAllBenefitsBySeller(this.userid).subscribe(data=>{
      this.benefits=data;
      this.benefits.forEach(async entry => {
        var ad = await this._ad.getAdById(entry.ad_id_ad).toPromise()
        entry['adTitle'] = ad.title
        entry['preview'] = this.getImageSanitized(ad.files)
        entry['idAd'] = ad.idAd
        var u = await this._user.getUserById(entry.user_id_user).toPromise()
        entry['idCustomer'] = u.idUser
        entry['customer'] = u.username
      });
    })
  }


  prettyDate(timestamp) {
    const t = parseInt(timestamp);
    return moment(t).format('DD-MMM-YYYY');
  }

  async selectCustomer(id){
    this.selectedCustomer = await this._user.getUserById(id).toPromise()
    this.selectedCustomer['userImgSanitized']=this.getImageSanitized(this.selectedCustomer.userImg)
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
