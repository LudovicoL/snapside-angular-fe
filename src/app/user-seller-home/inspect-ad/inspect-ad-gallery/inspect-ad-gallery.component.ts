import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaService } from 'src/app/services/media.service';
import { AdService } from 'src/app/services/ad.service';
import b64toBlob from 'b64-to-blob';

@Component({
  selector: 'app-inspect-ad-gallery',
  templateUrl: './inspect-ad-gallery.component.html',
  styleUrls: ['./inspect-ad-gallery.component.css'],
  // for modal size css
  //encapsulation: ViewEncapsulation.Emulated
  // encapsulation: ViewEncapsulation.None
})
export class InspectAdGalleryComponent implements OnInit {
  @Input() idAd: string;
  //nImgs=10;
  nImgsArray=[];

  public media;
  public ad;
  displayMedia=[]
  frontImg;

  constructor(private _sanitizer: DomSanitizer, private _media: MediaService, private _ad : AdService) { }

  ngOnInit() {


    this._ad.getAdById(this.idAd).subscribe(data=>{this.ad=data; this.frontImg=this.getImageSanitized(this.ad.files); })



    this._media.getAllImagesFromAd(this.idAd).subscribe(data=>{this.media=data;
      this.nImgsArray = Array(data.length+1).fill(0).map((x,i)=>i);
      this.nImgsArray.shift()

      console.log(this.nImgsArray)

      this.media.forEach((img, index) => {
      this.displayMedia.push({content:this.getImageSanitized(img.content), mediaName:img.mediaName})
    });
    console.log(this.displayMedia)
      })

    this._ad.getAdById(this.idAd).subscribe(data=>{this.ad=data})


  }

push(){
  console.log(this.displayMedia)
}
  blob(base64img){
    var blob = b64toBlob(base64img,'image/jpeg');
    var blobUrl = URL.createObjectURL(blob);
    console.log(blobUrl)
    return blobUrl
  }

  getImageSanitized(base64img)
{
  console.log('getImageSanitized called')
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


myAlert(msg){
  alert(msg)
}
}
