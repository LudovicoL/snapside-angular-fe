import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AdService } from 'src/app/services/ad.service';
import { ActivatedRoute, RoutesRecognized, Router, ParamMap } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { SearchService } from 'src/app/services/search.service';
import { GuiService } from 'src/app/services/gui.service';
import { CategoryService } from 'src/app/services/category.service';
import * as guiGlobals from '../../globals/guiGlobals';
import { transition, style, animate, trigger, state, keyframes, stagger, query } from '@angular/animations';
// import moment = require('moment');
import * as $AB from 'jquery';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';
import { NotifService } from 'src/app/services/notif.service';
declare var $: any

@Component({
  selector: 'app-admin-ads-list',
  templateUrl: './admin-ads-list.component.html',
  styleUrls: ['./admin-ads-list.component.css']
})
export class AdminAdsListComponent implements OnInit {
  public ads = [];
  public fullAds = [];
  userid: string;
  deleteTitle: string;
  deleteId;
  searchContent = '';
  foundCheck = 1;
  sortAdBy = 'id';
  filterByCat = 'All'
  filterByStatus = 'All'
  filterByItem = 'All'
  itemsInPage=15
  currency=guiGlobals.currency;
  items=[]

  private loaded = false;
  constructor(private _adService: AdService,
              private _activatedroute: ActivatedRoute,
              private router: Router,
              private data: DataService,
              private _sanitizer: DomSanitizer,
              private _search: SearchService,
              private _gui: GuiService,
              private _category: CategoryService,
              private _item: ItemService,
              private _user: UserService,
              private _notif: NotifService) { }

  ngOnInit() {
    console.log(this._activatedroute.snapshot.data);

    $(document).ready(function() {
      $("body").tooltip({ selector: '[data-toggle=tooltip]' });
  });

  this.data.userid.subscribe(message => this.userid = message);
  this._category.getAllItems().subscribe(data=>this.items=data)
    // this.ads=null;
    // console.log(this.ads+':')
  var that=this;
  this._adService.getAll()
    .subscribe(data => {this.loaded = false;
                        this.ads = data;
                        this.ads.forEach(function(entry, index) {
                        that._category.getCatFromAd(entry.idAd).subscribe(data => {entry['category'] = data.categoryName; entry['idcategory'] = data.idcategory;});
                        that._category.getItemFromAd(entry.idAd).subscribe(data => {entry['idItem'] = data.idItem; entry['nameItem'] = data.name;});
                        that._user.getUserById(entry.user_id_seller).subscribe(data=>{entry['sellerUsername']=data.username})
                        entry.files=that.getImageSanitized(entry.files)
                        that.fullAds = that.ads;
                          });
      },
      (error) =>{alert(error); this.loaded = false},
      () => this.loaded = true);
  }


  noPropagation(key, event) {
    event.preventDefault();
    event.stopPropagation();

}
ngDoCheck() {

this._search.searchContent.subscribe(message => this.searchContent = message);
this.doSearchFilter()
this._gui.sortAdBy.subscribe(message => this.sortAdBy = message);
this.sortAds(this.sortAdBy);
this._gui.filterByCat.subscribe(message => this.filterByCat=message)
this._gui.filterByStatus.subscribe(message =>this.filterByStatus=this.statusFilterMapper(message))
}

parseJSON(str){
  return JSON.parse(str)
}

getImageSanitized(base64img) {
  console.log('getImageSanitized executed')
  if (base64img === null) {

    return ('assets/utils_imgs/noimg.svg');
  } else if (base64img.lastIndexOf('/9j', 0) === 0) {
  return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + base64img);
  } else {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64, ' + base64img);
    }
}



setDeleteTitle(title) {
  this.deleteTitle = title;
}

getDeleteTitle() {
  return this.deleteTitle;
}

setDeleteId(id) {
  this.deleteId = id;
}

getDeleteId() {
  return this.deleteId;
}

myAlert(msg) {
  alert(msg);
}
refresh(): void {
  window.location.reload();
}

// incasina this.ads per vedere ngfor cambiare
// - ngfor cambia se elementi vengono aggiungi, tolti o riordinati
// https://medium.com/@MatheusCAS/making-you-ngfor-render-again-92659fe23b41


prettyDate(timestamp) {
  const t = parseInt(timestamp);
  return moment(t).format('DD-MMM-YYYY');
}


incasinaAds() {if (this.ads.length === 0) {console.log('ADS RESTORED');
                                           this._adService.getAllAdsBySeller(this.userid)
    .subscribe(data => {this.loaded = false; this.ads = data;
       }, () => this.loaded = true, () => this.loaded = true);

  } else {
  this.ads = [];
  console.log('ADS DELETED');
}}

async sortAds(by) {

  if (by === 'idA') {
    this.ads.sort((a, b) => a.idAd < b.idAd ? -1 : a.idAd > b.idAd ? 1 : 0);
}
  if (by === 'idD') {
  this.ads.sort((a, b) => a.idAd > b.idAd ? -1 : a.idAd < b.idAd ? 1 : 0);
  }

  if (by === 'title') {
       this.ads.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (by === 'startDate') {
       this.ads.sort((a, b) => a.beginDate < b.beginDate ? -1 : a.beginDate > b.beginDate ? 1 : 0);
  }
  if (by === 'PriceLH') {
    this.ads.sort((a, b) => a.sellPrice < b.sellPrice ? -1 : a.sellPrice > b.sellPrice ? 1 : 0);
  }
  if (by === 'PriceHL') {
    this.ads.sort((a, b) => a.sellPrice > b.sellPrice ? -1 : a.sellPrice < b.sellPrice ? 1 : 0);
}

}

statusFilterMapper(message){
  if(message==='pending'){
    return '0'
  }
  if(message==='published'){
    return '1'
  }
  if(message==='refused'){
    return '2'
  }
  if(message==='drafts'){
    return '-1'
  }
  if(message==='All')
    return message

  if(message==='expired')
    return message
   if(message==='notExpired')
    return message
   if(message==='hidden')
    return message
}

async doSearchFilter(){

  if(this.searchContent==='' && this.filterByCat==='All' && this.filterByStatus==='All'){
    this.ads=this.fullAds;
  }
  else{
  var that=this;

  let searchedAds = []

  this.fullAds.forEach(function(entry, index) {

    if(entry.category!=null && entry.sellerUsername!=null){
        if (entry.title.toLowerCase().search(that.searchContent.toLowerCase()) > -1 ||
        entry.description.toLowerCase().search(that.searchContent.toLowerCase()) > -1 ||
        entry.category.toLowerCase().search(that.searchContent.toLowerCase()) > -1 ||
        (('#'+entry.idAd.toString()).search(that.searchContent) >-1 && that.searchContent.charAt(0)==='#') ||
        (('@'+entry.sellerUsername.toString()).search(that.searchContent) >-1 && that.searchContent.charAt(0)==='@')) {
          if(entry.idcategory === that.filterByCat || that.filterByCat==='All' ){

            if(entry.item_id_item===that.filterByItem || that.filterByItem==='All'){
            if(String(entry.approved)===that.filterByStatus||
            (that.filterByStatus === 'expired' && moment.now()>entry.endDate ) ||
            (that.filterByStatus === 'notExpired' && moment.now()<entry.endDate ) ||
            (that.filterByStatus==='hidden' && entry.deleted==='DELETED')
            || that.filterByStatus==='All'){

            searchedAds.push(entry);
            }
          }
          }
          }
        }else{}
    });
this.ads = searchedAds;


}

}


deleteAd(id){
  console.log(id)
  this._adService.deleteAd(id).subscribe(data=>{console.log(data);this.ngOnInit()})
}


prettyPrice(price){
return Number(price).toFixed(2).toString().replace(".",",") // pads the zeros and then replaces . with ,
}

now(){
  return moment().valueOf()
}

setFilterByItem(iditem){
  console.log(iditem)
  this.filterByItem=iditem;
}

approve(ad,decision)
{

  var title;
  var body;
  var token;
  if(decision==='approve'){
    decision=1
    title="Snapside Push Notification:\nAd approved! :)"
    body="Good news! Your ad '"+ad.title+"' has been approved and published. Now everyone can see it. (ID #"+ad.idAd+")"
  }
  else if (decision==='refuse'){
    title="Snapside Push Notification:\nAd refused! :("
    body="Sorry, your ad '"+ad.title+"' has been refused and cannot be published. (ID #"+ad.idAd+"). For more information contact service administrator."
    decision=2}

  this._adService.approve(ad.idAd,decision).subscribe(data=>{console.log('Approval decision '+data);
  this.loaded=false;
  this.ngOnInit()})

  this._user.getUserById(ad.user_id_seller).subscribe(data=>{token=data.token; console.log(token)
    this._notif.sendToastNotif(ad.user_id_seller,body,title).subscribe(data=>console.log(data))
    this._notif.firebasePush(token,body,title).subscribe(data=>console.log(data))
  })

}
}
