import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdService } from 'src/app/services/ad.service';



import * as $AB from 'jquery';
import dayGridPlugin from '@fullcalendar/daygrid';

import { ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import * as moment from 'moment';
import { IAd } from 'src/app/interfaces/ad';
import { callbackify } from 'util';
import { BenefitService } from 'src/app/services/benefit.service';
import { IBenefit } from 'src/app/interfaces/benefit';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/interfaces/user';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-ad-calendar',
  templateUrl: './ad-calendar.component.html',
  styleUrls: ['./ad-calendar.component.css']
})
export class AdCalendarComponent implements OnInit {
  @Input() idAd: string;
  calendarPlugins = [dayGridPlugin]; // important!
  books_test=[{ title: 'Available interval', start: '2019-12-14',end:'2019-12-27',backgroundColor: 'lightgreen', textColor:'black', id:'78' },
  { title: 'Occupied by user: ...', start: '2019-12-19',end:'2019-12-23',backgroundColor: 'pink', textColor:'black',id:'79' }];

  constructor(private route: ActivatedRoute,private _adService: AdService, private _benefitService: BenefitService, private _userService:UserService,
    private _sanitizer: DomSanitizer) { }

  public ad;
  available_time=[];
  total_books=[];
  defDate;
  selectedEventCustomer: IUser
  ngOnInit() {

    var that=this;
    this._benefitService.getAdandItsBenefits(this.idAd).subscribe(responseList => {
      this.ad=responseList[0];

      if (String(this.ad.beginDate).length < 5 ||  String(this.ad.endDate).length<5){
        this.defDate= moment().format(moment.HTML5_FMT.DATE)

      }
      else{
      this.defDate= this.timestampMilliSecToDate(this.ad.beginDate),
      this.available_time=[{
        title: 'Available interval',
        start: this.timestampMilliSecToDate(this.ad.beginDate),
        end: this.timestampMilliSecToDate(this.ad.endDate),
        backgroundColor: 'lightgreen', textColor:'black' }];
      }
      var event_list = [];
      var benefits = responseList[1];

      benefits.forEach(function(entry) {
        if (!(String(entry.checkinDate).length < 5 ||  String(entry.checkoutDate).length<5)){
        var singleBook = {};
          singleBook['title'] = 'Booked by customer #'+entry.user_id_user;
          singleBook['start'] = that.timestampMilliSecToDate(entry.checkinDate);
          singleBook['end'] = that.timestampMilliSecToDate(entry.checkoutDate);
          singleBook['customer_id'] = entry.user_id_user;
          singleBook['backgroundColor'] = 'gold';
          singleBook['textColor'] = 'black';
          event_list=event_list.concat(singleBook);
        }
      });


      this.total_books=this.available_time.concat(event_list)

      this.callbackCalendar()

  });


  }
  callbackCalendar() {
    let that=this;
    // *FULLCALENDAR codice jquery da usare con div id=calendar in .html
    $(function() {

      $('#calendar').fullCalendar({
        themeSystem:'bootstrap4',
        //themeName:'Cosmo',
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },

        // plugins:[dayGridPlugin],
        // defaultView: 'agendaDay',
        // defaultView: $(window).width() < 765 ? 'basicDay':'agendaWeek',
        editable: false,
        defaultDate: that.defDate,
        weekNumbers: true,
        eventLimit: true, // allow "more" link when too many events
        // events: 'https://fullcalendar.io/demo-events.json',
        events: that.total_books,
        function (){
          $('#flip').html('FLAP')
        },
        eventClick: function(event) {
          if (event.title !== 'Available interval'){

            $(document).keydown(function(event) {
        if (event.keyCode == 27) {

        (<any> $('#createEventModal')).modal('hide');
          }
        });
          //alert('Event: '+event.title)

         (<any> $('#createEventModal')).appendTo('body').modal('show');

        //  $("#createEventModal").css("z-index", "1500");
         $('#modalTitle').html('Customer details');
         that._userService.getUserById(event.customer_id).subscribe(data => {
           that.selectedEventCustomer=data
           that.selectedEventCustomer['userImgSanitized']=that.getImageSanitized(that.selectedEventCustomer.userImg)
        //    $('#realName').html(data['name'])
        //    $('#surname').html(data['surname'])
        //    $('#username').html(data['username'])
        //    $('#phone').html(data['phone'])
        //    $('#email').html(data['email'])
        //    $('#address').html(data['address'])
        //
      } )
          }
          else{
            alert('This is the time interval in which the ad is available for customers booking');
          }
        }

      });


    });
  }



timestampMilliSecToDate(tstampMilli): string
  {

    var str=String(tstampMilli);
    var intstamp=parseInt(tstampMilli)
    // if (str.length<5){
    // return moment().format(moment.HTML5_FMT.DATE)
    // }
    // var tstamp=parseInt(str.substring(0,str.length-3));
    var date=moment(intstamp).format(moment.HTML5_FMT.DATE);
    return date;
  }

flipFlap(customer_id){
  $(function()  {
    $('#flip').html('FLAP')
  })
  // do stuff here
}

getImageSanitized(base64img)

{
 console.log('userimg')
  if (base64img===null){

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
