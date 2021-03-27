import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
// import moment = require('moment');
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { serverUrl } from '../../../globals/globals';
import { HttpClient } from '@angular/common/http';
import { IComment } from 'src/app/interfaces/comment';
import { DataService } from 'src/app/services/data.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';



@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css'],
})
export class CommentSectionComponent implements OnInit {
  @Input() idAd;
  public userid;
  public comments = [];
  public selectedCommenter;
  maxRating=5
  maxRatingStars=[]
  mainCommentText=''
  ratingSel='-1'
  public commentIndexes=[]


  constructor(private _comment: CommentService, private _sanitizer: DomSanitizer,private http: HttpClient, private _data : DataService) { }

  ngOnInit() {
    this.ratingSel="-1"
    this._data.userid.subscribe(data => this.userid=data);
    console.log(this.userid)
    this.maxRatingStars = Array(this.maxRating+1).fill(0).map((x,i)=>i);
    this.maxRatingStars.shift()

    const that = this;
    this._comment.getAllCommentsFromAd(this.idAd)
    .subscribe(data => {this.comments = data;
                        // console.log(this.comments);
                        this.comments.forEach(function(entry, index) {that._comment.getUserFromComment(entry.idComment)
                          .subscribe(user => { entry['username'] = user.username;
                                              entry['uimage'] = user.userImg; });
      }); });
  }
ngAfterViewChecked(){
  // console.log(this.comments)
}


  prettyDate(timestamp) {
    const t = parseInt(timestamp);
    return moment(t).format('DD-MMM-YYYY HH:mm:ss');
  }


  getCommenterData(id){
    this._comment.getUserFromComment(id).subscribe(data => {this.selectedCommenter=data})
  }

myAlert(msg)
{
  alert(msg)
}
  getImageSanitized(base64img)

  {

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

ratingMapper(rating){
  if(rating==="No rating")
    return -1
  if(rating==="0 stars")
    return 0
  if(rating==="1 star")
    return 1
  if(rating==="2 stars")
    return 2
  if(rating==="3 stars")
   return 3
  if(rating==="4 stars")
    return 4
  if(rating==="5 stars")
    return 5
  else
   return -1
}

rate(star){
  this.ratingSel=star
}


saveComment(idcomment,text)
{
  this._comment.saveComment(idcomment,text,this.ratingSel,this.userid,this.idAd)
  .subscribe(res => {console.log(res); this.ngOnInit()});

}

deleteComment(idcomment){
  this._comment.deleteComment(idcomment).subscribe(data => {console.log(data);; this.ngOnInit()})

}


textareaFormatted(){
  var text = (<HTMLInputElement>document.getElementById('text-area-comment')).value;
  return text
}

}
