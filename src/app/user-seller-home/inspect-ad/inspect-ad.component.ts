import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdService } from 'src/app/services/ad.service';

import { ChangeDetectorRef } from '@angular/core';

import * as $AB from 'jquery';
import dayGridPlugin from '@fullcalendar/daygrid';

import { ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { delay } from 'q';
import { CategoryService } from 'src/app/services/category.service';
import { attributes } from '@syncfusion/ej2-base';
import * as guiGlobals from '../../globals/guiGlobals';
import { GuiService } from 'src/app/services/gui.service';


// declare var $: any;

@Component({
  selector: 'app-inspect-ad',
  templateUrl: './inspect-ad.component.html',
  styleUrls: ['./inspect-ad.component.css']
})
export class InspectAdComponent implements OnInit {
  idAd : string;
  calendarPlugins = [dayGridPlugin]; // important!
  // books=[{ title: 'event 1', start: '2019-12-01',end:'2019-12-10',backgroundColor: 'green',id:'78' },
  // { title: 'event 1', start: '2019-12-04',end:'2019-12-10',backgroundColor: 'white',id:'79' }]
  dateNow: Date;
  mobile=false;
  // messageViewInit: string;


  constructor(private route: ActivatedRoute,
    private _adService: AdService,
    private _catService: CategoryService,
    private _sanitizer: DomSanitizer,
    private _gui: GuiService,
    private cdRef:ChangeDetectorRef,private el: ElementRef, private renderer:Renderer2) { }

  public ad;
  public category;
  public item;
  public isCollapsed = false;
  public attributes=[];

  currency=guiGlobals.currency;

  ngOnInit() {
    const param_idAd: string = this.route.snapshot.queryParamMap.get('idAd');
    this.idAd=param_idAd

    this._gui.sendFocusedAdId(param_idAd)

    this._adService.getAdById(this.idAd).subscribe(data => {this.ad=data});

    this._catService.getCatFromAd(this.idAd).subscribe(data=>{this.category=data})
    this._catService.getItemFromAd(this.idAd).subscribe(data=>{this.item=data})


    this.getAttributeInfo(this.idAd)





  }



  ngAfterViewInit(){

// this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor', 'black');

}
  //  ngAfterViewInit() {
  //   this.messageViewInit = 'all done loading :)'
  //   this.cdRef.detectChanges();
  // }

// suppresses "ERROR: Expression has changed after it was checked. " it occurs when resizing windows for ngif isMobile condition
  ngAfterViewChecked()
  {
    this.mobile=this.isMobile();
    this.dateNow = new Date();
    this.cdRef.detectChanges();
  }
  getImageSanitized(base64img)
  {

    if (base64img===null){

      return ("assets/utils_imgs/noimg.svg")
    }
    else if (base64img.lastIndexOf('/9j',0)===0){
    return this._sanitizer.bypassSecurityTrustResourceUrl("data:image/jpg;base64, " + base64img);
    }
    else {
      return this._sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64, " + base64img);
      }
  }

  isMobile(){
    if($(window).width()< 1200 ){

    return true; }
    else{

      return false
  }
  }

  prettyDate(timestamp) {
    const t = parseInt(timestamp);
    return moment(t).format('DD-MMM-YYYY');
  }

  getAttributeInfo(idAd){
    var that=this
    var attributeNames;
    var attributeValues;
    this._adService.getAttributes(idAd).subscribe(responseList => {
      attributeNames=responseList[0];
      attributeValues=responseList[1];

      var mergedAttributes=[]
      attributeNames.forEach(function(entry,index) {
        console.log(entry.attributeName)
        var attribute = {};
        attribute['name'] = entry.attributeName
        attribute['value'] = attributeValues[index].attributeValue

        mergedAttributes=mergedAttributes.concat(attribute);

      });
      that.attributes=mergedAttributes;
      // console.log(this.attributes)

    }

    )
  }


  prettyPrice(price){
    return Number(price).toFixed(2).toString().replace(".",",") // pads the zeros and then replaces . with ,
    }

    now(){
  return moment().valueOf()
}
}

