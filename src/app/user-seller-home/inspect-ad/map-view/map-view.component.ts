import { Component, OnInit, NgZone, ElementRef, ViewChild, Input } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  @Input() points;
  start={lat: 40.351382, long: 18.174981}
  parsedPoints=[]
  ngOnInit(){

    // this.gatherCoordinates()
  }
  ngOnChanges(){
this.gatherCoordinates()

}


  gatherCoordinates(){

    this.parsedPoints=JSON.parse(this.points)
    if(this.parsedPoints!==null && this.parsedPoints.length!==0){
       this.initMapPan()
    }
    // console.log(this.parsedPoints)
    // console.log(this.points)

  }

  initMapPan(){

    this.start=this.parsedPoints[0]
  }
  toStr(integer){
  return integer.toString()
}
}
