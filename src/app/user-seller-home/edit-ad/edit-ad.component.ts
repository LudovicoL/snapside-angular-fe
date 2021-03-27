import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, SecurityContext} from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ItemService } from 'src/app/services/item.service';

// var moment = require('moment');

import * as $AB from 'jquery';
import { DOCUMENT } from '@angular/common';
import { MapSectionComponent } from '../new-ad/map-section/map-section.component'
import { IAd } from 'src/app/interfaces/ad';
import { GuiService } from 'src/app/services/gui.service';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';
import { AdService } from 'src/app/services/ad.service';
import { IMedia } from 'src/app/interfaces/media';
import { MediaService } from 'src/app/services/media.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as guiGlobals from '../../globals/guiGlobals';
import { NotifService } from 'src/app/services/notif.service';
import { BenefitService } from 'src/app/services/benefit.service';
import { UserService } from 'src/app/services/user.service';

declare var $: any
@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.css']
})
export class EditAdComponent implements OnInit, AfterViewInit {
  @ViewChild(MapSectionComponent,{static:false}) mapComp;






  categories=[]
  items=[]
  selectedCatId=''
  selectedItemId=''
  properties=[]
  image;
  loadedImages:IMedia[]=[];
  beginDateTStamp=moment().valueOf();
  endDateTStamp=moment().valueOf()+1;
  points=[];
  attributeIndexes=[];
  newTitle='';
  newDescription='';
  newPrice;
  newAddress='';
  publishToggle;
  userid;
  idAd;
  category;
  item;
  ad:IAd;
  currency=guiGlobals.currency;
  public attributes=[]


  minDateBegin= new Date()
  minDateEnd= new Date()

  maxDateBegin= new Date(2120, 0, 1);
  maxDateEnd= new Date(2120, 0, 1);

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2120, 0, 1);

constructor(private _category:CategoryService, private _item:ItemService, private _data:DataService, private _ad:AdService,
  private _media:MediaService,private router: Router, private route: ActivatedRoute,private _sanitizer: DomSanitizer, private _gui: GuiService,
  private _notif: NotifService, private _benefits: BenefitService, private _user : UserService,
  private elementRef: ElementRef,@Inject(DOCUMENT) private doc) { }

ngAfterViewInit() {
this.points=this.mapComp.points;

}
// ngDoCheck(){
//   this.getPublishToggle()
// }

  ngOnInit() {

    // setInterval(()=>{
    //   console.log(this.loadedImages)
    // },1000)

    this._data.userid.subscribe(data => this.userid=data);

    const param_idAd: string = this.route.snapshot.queryParamMap.get('idAd');
    this.idAd=param_idAd
    this._gui.sendFocusedAdId(param_idAd)

    this._ad.getAdById(this.idAd).subscribe(data => {this.ad=data;this.newTitle=this.ad.title;this.newDescription=this.ad.description;this.newAddress=this.ad.address;
      this.newPrice=this.ad.sellPrice;
      this.beginDateTStamp=this.ad.beginDate;
      this.endDateTStamp=this.ad.endDate;
      (<HTMLInputElement>document.getElementById('beginDatePicker')).value=moment(this.beginDateTStamp).format('DD/MM/YYYY');

      this.minDateEnd= new Date(this.endDateTStamp);
      (<HTMLInputElement>document.getElementById('endDatePicker')).value=moment(this.endDateTStamp).format('DD/MM/YYYY');


      if(this.ad.coordinates!==null && this.ad.coordinates.length!==0){
      this.points=JSON.parse(this.ad.coordinates);}
    this._media.getAllImagesFromAd(this.idAd).subscribe(data=>{
      this.loadedImages.push({content: this.ad.files, contentSanitized: this.getImageSanitized(this.ad.files), mediaName : 'LoadedImage', adByAdIdAd: null})
      var that=this;
      data.forEach((entry, index) => {
        var img=entry;
        img.contentSanitized=that.getImageSanitized(img.content)

      that.loadedImages.push(img)
    });

      })

    });

    this._category.getCatFromAd(this.idAd).subscribe(data=>{this.category=data})
    this._category.getItemFromAd(this.idAd).subscribe(data=>{this.item=data})






// fixes bootstrap toggle issues,
// this js methods work only because bootstrap-toggle...js and .css scripts were included in angular.json
// in order to be loaded at ng serve boot
    $("#myPublishToggle").bootstrapToggle('destroy')
    $("#myPublishToggle").bootstrapToggle()


  this.publishToggleInit();
  this.publishToggleMapper();

 this.initializeSchema()
 this.getAttributeInfo(this.idAd)




  }

  getImageSanitized(base64img)
  {
    console.log('getImageSanitized in Edit')
    if (base64img===null){

      return ("assets/utils_imgs/noimg.svg")
    }
    else if(base64img.search('data:image')>-1)
      return this._sanitizer.bypassSecurityTrustResourceUrl(base64img);
    else if (base64img.lastIndexOf('/9j',0)===0){
    return this._sanitizer.bypassSecurityTrustResourceUrl("data:image/jpg;base64, " + base64img);
    }
    else {
      return this._sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64, " + base64img);
      }
  }

  getAttributeInfo(idAd){
    var that=this
    var attributeNames;
    var attributeValues;
    this._ad.getAttributes(idAd).subscribe(responseList => {
      attributeNames=responseList[0];
      attributeValues=responseList[1];

      var mergedAttributes=[]
      attributeNames.forEach(function(entry,index) {

        var attribute = {};
        attribute['name'] = entry.attributeName
        attribute['value'] = attributeValues[index].attributeValue
        that.attributeIndexes[entry.idattribute] = attributeValues[index].attributeValue
        mergedAttributes=mergedAttributes.concat(attribute);

      });
      that.attributes=mergedAttributes;
      // console.log(this.attributes)

    }

    )
  }

  setSelectedCategory(idcat){
    this.selectedCatId=idcat
  }

  setSelectedItem(iditem){

    this.selectedItemId=iditem
  }

  getItemsByCat(idcat){
    var that=this;
    this._item.getAllItems().subscribe(data => {
      that.items=[]
      data.forEach(function(entry,index){
        if (entry.category_idcategory==idcat)
        that.items.push(entry)
      });
    })
  }

  getAttributesByItem(idItem){
    this.properties=[]
    var that=this;
    this._item.getAllAttributes().subscribe(data=>{
    data.forEach(function(entry,index){
      if(idItem==entry.itemByItemIdItem)
      that.properties.push(entry)
    })})

  }

  addEventBegin(event){
    this.minDateEnd = new Date(event.value)
    let date = new Date(event.value)
    console.log(date.getTime())
    this.beginDateTStamp=date.getTime()

  }

  addEventEnd(event){
    this.maxDateBegin = new Date(event.value)
    let date = new Date(event.value)
    console.log(date.getTime())
    this.endDateTStamp=date.getTime()

  }

initializeSchema(){
  var that=this;
  this._category.getInitSchema().subscribe(responseList=>{
    that.categories=responseList[0];
    that.selectedCatId=that.category.idcategory;
    responseList[1].forEach(function(entry,index){
      if (entry.category_idcategory==that.selectedCatId)
      that.items.push(entry)
    });
    that.selectedItemId=that.item.idItem
    responseList[2].forEach(function(entry,index){
      if(that.selectedItemId==entry.itemByItemIdItem)
      that.properties.push(entry)

    })


  })
}


  updateSchema(){
  var that=this;
  this._category.getInitSchema().subscribe(responseList=>{
    that.properties=[]
    that.items=[]

    responseList[1].forEach(function(entry,index){

      if (entry.category_idcategory==that.selectedCatId)
      that.items.push(entry)
    });
    that.selectedItemId=that.items[0].idItem
    responseList[2].forEach(function(entry,index){
      if(that.selectedItemId==entry.itemByItemIdItem)
      that.properties.push(entry)

    })

  })

}


changeListener($event) : void {
  this.readThis($event.target);
}

readThis(inputValue: any): void {
  var file:File = inputValue.files[0];
  // console.log(inputValue.files[0].name)
  var filename=inputValue.files[0].name
  var myReader:FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
    const m:IMedia={
      mediaName: filename,
      content : this.image,
      contentSanitized: this.image,
      adByAdIdAd : null
    }
    this.loadedImages.push(m)
    // console.log(this.image)

  }
  myReader.readAsDataURL(file)
  console.log(this.loadedImages)
}


removeFile(i){
  this.loadedImages.splice(i,1);
  console.log(this.loadedImages)
}

arrangeElements(i,direction,array){
  if (direction === 'toBegin'){
    array.splice(0,0,array[i])
    array.splice(i+1,1)
  }
  if (direction === 'toEnd'){
    array.splice(array.length,0,array[i])
    array.splice(i,1)
  }

  if (direction === '-1' && i>0){
    array.splice(i-1,0,array[i])
    array.splice(i+1,1)
  }

  if (direction === '+1'){
    array.splice(i+2,0,array[i])
    array.splice(i,1)
  }
}

editAd()
{
  console.log(this.newTitle)
  console.log(this.attributeIndexes)
  // tslint:disable-next-line: prefer-const
  if(this.newTitle.length===0){
    this.newTitle="No title"}
  if(this.newDescription.length===0){
      this.newDescription="No description"}
  if(this.newPrice==null || this.newPrice=='')
  {
    this.newPrice=0;
  }

  let f
  f=this.loadedImages.slice(0)

  if(this.loadedImages.length===0 || this.loadedImages[0].content==null)
   f=null
  else{
    console.log(f)
    // f=f[0].content
    // .split(',').slice(-1).pop()
    f=f[0].content.split(',').slice(-1).pop()

    }

  var newAd: IAd={
  idAd:this.ad.idAd,
  title:this.newTitle,
  description:this.newDescription,
  sellPrice: Math.abs(Math.max(this.newPrice,0)).toString(),
  address:this.newAddress,
  coordinates:JSON.stringify(this.points),
  approved:this.publishToggle,
  user_id_seller:this.userid,
  beginDate:this.beginDateTStamp,
  endDate:this.endDateTStamp+(86400*1000), //86400=seconds in a day,
  item_id_item:parseInt(this.selectedItemId),
  adType:'AD_TYPE_HARDCODED',
  // files:"iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAE0lEQVR42mPcztD3nwENMNJAEACrnQtaam/wngAAAABJRU5ErkJggg==",
  files: f,
  deleted:null,
  lastEdit:moment().valueOf(),
  creationDate:moment().valueOf(),
  active:true,
  }
  var that=this;
  // let newIdAd
  this._ad.editAd(newAd).subscribe(data0=>
    {console.log(data0);
      this._media.resetMedia(this.idAd)
      let mediaToLoad=[]
      mediaToLoad=that.loadedImages.slice(0)
      mediaToLoad.shift()
      that._media.addMediaArrayAsync(mediaToLoad,this.ad.idAd)
      that._ad.resetAttributes(this.idAd)
      that._ad.saveAttributes(that.attributeIndexes,this.ad.idAd)
      $("#adEdited.toast").toast('show');
      this.router.navigate(['../ads-list'], { relativeTo: this.route });






  // this._media.addMedia(this.loadedImages,newIdAd).subscribe(data=>{console.log(data)})
 })
this._benefits.getBenefitsHaveAd(this.idAd).subscribe(data=>{
  // console.log('notif sent')
  var that=this;
  var customers=[]
  data.forEach(async function(entry,index){
    customers.push(entry.user_id_user)
  })
  customers=customers.filter(
    (thing, i, arr) => arr.findIndex(t => t.id === thing.id) === i
  ).slice(0);
console.log(customers)
  customers.forEach(async function(entry,index){
    var token
    var title="Ad '"+that.ad.title+ "' modified"
    var subject="The ad '"+that.ad.title+"' (#"+that.ad.idAd+") that you purchased has been modified by seller."

    that._user.getUserById(entry).subscribe(data=>{
      console.log(data)
    that._notif.firebasePush(data.token,subject,title).subscribe(data=>console.log(data))
    })
    await that._notif.sendToastNotif(entry,subject,title).toPromise()


  })
})

  // console.log(this.loadedImages[0].content.split(',')[1])
}

publishToggleInit(){
  var that=this;
    if($("#myPublishToggle").prop("checked")==true){
    that.publishToggle=0;}
  else{
    that.publishToggle=-1
  }
  console.log(that.publishToggle)
}

publishToggleMapper(){

  var that=this;
  $("#myPublishToggle").change(function(){
    if($(this).prop("checked") == true){
      if(that.ad.approved===-1){
      that.publishToggle=0;}
      else that.publishToggle=that.ad.approved;
      console.log(that.publishToggle)
    }else{
      that.publishToggle=-1;
      console.log(that.publishToggle)
    }
});

}
showToast(){

$("#adEdited.toast").toast('show');
}


resetPropertiesInput(){
  // this.properties=[]
  this.attributeIndexes=[]
  console.log('Attributes schema resetted')

}
}
