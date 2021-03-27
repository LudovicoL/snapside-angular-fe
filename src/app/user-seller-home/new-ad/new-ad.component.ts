import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject} from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ItemService } from 'src/app/services/item.service';

// var moment = require('moment');

import * as $AB from 'jquery';
import { DOCUMENT } from '@angular/common';
import { MapSectionComponent } from './map-section/map-section.component';
import { IAd } from 'src/app/interfaces/ad';
import { GuiService } from 'src/app/services/gui.service';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';
import { AdService } from 'src/app/services/ad.service';
import { IMedia } from 'src/app/interfaces/media';
import { MediaService } from 'src/app/services/media.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any
@Component({
  selector: 'app-new-ad',
  templateUrl: './new-ad.component.html',
  styleUrls: ['./new-ad.component.css']
})
export class NewAdComponent implements OnInit, AfterViewInit {
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

  minDateBegin= new Date()
  minDateEnd= new Date()

  maxDateBegin= new Date(2120, 0, 1);
  maxDateEnd= new Date(2120, 0, 1);

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2120, 0, 1);

constructor(private _category:CategoryService, private _item:ItemService, private _data:DataService, private _ad:AdService,
  private _media:MediaService,private router: Router, private route: ActivatedRoute,
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

// fixes bootstrap toggle issues,
// this js methods work only because bootstrap-toggle...js and .css scripts were included in angular.json
// in order to be loaded at ng serve boot
    $("#myPublishToggle").bootstrapToggle('destroy')
    $("#myPublishToggle").bootstrapToggle()


  this.publishToggleInit();
  this.publishToggleMapper();

 this.initializeSchema()

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
    that.selectedCatId=that.categories[0].idcategory;
    responseList[1].forEach(function(entry,index){
      if (entry.category_idcategory==that.selectedCatId)
      that.items.push(entry)
    });
    that.selectedItemId=that.items[0].idItem
    responseList[2].forEach(function(entry,index){
      if(that.selectedItemId==entry.itemByItemIdItem)
      that.properties.push(entry)
      // that.attributeIndexes[entry.idAttribute]='Not set'
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
      adByAdIdAd : null,
      contentSanitized: null
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

createAd()
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

  let f=[];
  f=this.loadedImages.slice(0)

  if(this.loadedImages.length===0)
   f=null
  else{
    f=f[0].content.split(',')[1];
    }



  var newAd: IAd={
  idAd:null,
  title:this.newTitle,
  description:this.newDescription,
  // sellPrice: Math.max(this.newPrice, 0).toString(),
  sellPrice: Math.abs(Math.max(this.newPrice,0)).toString(),
  address:this.newAddress,
  coordinates:JSON.stringify(this.points),
  approved:this.publishToggle,
  user_id_seller:this.userid,
  beginDate:this.beginDateTStamp,
  endDate:this.endDateTStamp+(86400*1000), //86400=seconds in a day
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
  let newIdAd
  this._ad.createAd(newAd).subscribe(data0=>
    {console.log(data0);
      that._ad.getLastBySeller(newAd).subscribe(data1=>{ newIdAd=data1.idAd;
      console.log(newIdAd);
      let mediaToLoad=[]
      mediaToLoad=that.loadedImages.slice(0)
      mediaToLoad.shift()
      that._media.addMediaArrayAsync(mediaToLoad,newIdAd)
      that._ad.saveAttributes(that.attributeIndexes,newIdAd)
      $("#newAdCreated.toast").toast('show');
      this.router.navigate(['../ads-list'], { relativeTo: this.route });
      })





  // this._media.addMedia(this.loadedImages,newIdAd).subscribe(data=>{console.log(data)})
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
      that.publishToggle=0;
      console.log(that.publishToggle)
    }else{
      that.publishToggle=-1;
      console.log(that.publishToggle)
    }
});

}
showToast(){

$("#newAdCreated.toast").toast('show');
}

resetPropertiesInput(){
  // this.properties=[]
  this.attributeIndexes=[]
  console.log('resetted')

}

}
