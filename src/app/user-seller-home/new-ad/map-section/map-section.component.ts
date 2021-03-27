import { Component, OnInit, ElementRef, ViewChild, NgZone, Input } from '@angular/core';
import { MapsAPILoader, MouseEvent, KmlMouseEvent } from '@agm/core';
// import { google } from '@google/maps';
//  import * as $AB from 'jquery';
//  declare var $: any // hides: error TS2339: Property 'toast' does not exist on type 'JQuery<HTMLElement>'.
declare var $: any;
declare var google: any;

declare namespace google.maps.places {
    export interface PlaceResult { geometry }
}

@Component({
  selector: 'app-map-section',
  templateUrl: './map-section.component.html',
  styleUrls: ['./map-section.component.css']
})
export class MapSectionComponent implements OnInit {
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  // points :any =[];
  @Input() points=[];

  @ViewChild('search',{static: false})
  public searchElementRef: ElementRef;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }


  rooms=[{lat : -7.025253, long:107.519760},{lat : -17.025253, long:17.519760},{lat : -7.925253, long:15.519760}]
  start={lat: 40.351382, long: 18.174981}

    async keyAddress(){

      await this.delay(500)
      this.getAddress(this.latitude,this.longitude)

    }

delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }


 initMapPan(){

 var interval = setInterval(() => {
    if(this.points!==null && this.points.length!==0){
    this.start=this.points[0]
    clearInterval(interval)
  }
                }, 500);

  }

  ngOnInit() {




    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      // tslint:disable-next-line: new-parens
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result


          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    // FOR GEOLOCATION
    // if ('geolocation' in navigator) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.latitude = position.coords.latitude;
    //     this.longitude = position.coords.longitude;
    //     this.zoom = 8;
    //     this.getAddress(this.latitude, this.longitude);
    //     console.log(this.latitude)
    //   });
    // }

    this.zoom=10
    this.latitude = this.start.lat;
    this.longitude = this.start.long;
    this.geoCoder = new google.maps.Geocoder;
    this.getAddress(this.latitude, this.longitude);

  }

  ngAfterViewInit(){
    this.initMapPan()
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
    console.log('Get dragged coords: '+this.latitude+', '+this.longitude);
  }

  getAddress(latitude, longitude) {

    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          console.log('No results found');
          //window.alert('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
        //window.alert('Geocoder failed due to: ' + status);
      }

    });
  }




addMapLocation(){
  if(this.points===null)
  this.points=[]
this.points.push({address: this.address, lat : this.latitude, long: this.longitude});
if (this.points.length>0){
this.start=this.points[this.points.length-1]
}
}


removeMapLocation(i){
  this.points.splice(i,1);
  if (this.points.length===0){
  this.start={lat: 40.351382, long: 18.174981}
  }
}

toStr(integer){
  return integer.toString()
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
}
