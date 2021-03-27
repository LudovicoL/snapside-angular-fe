import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/user';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header-logged',
  templateUrl: './header-logged.component.html',
  styleUrls: ['./header-logged.component.css']
})
export class HeaderLoggedComponent implements OnInit {

  constructor(private router: Router,private route:ActivatedRoute, private userService: UserService, private _sanitizer: DomSanitizer,
    ) { }

    public userData: IUser;
    state;
  userid: string;
  userRole=''
  ngOnInit() {

    this.route.paramMap.subscribe( paramMap => {this.userid = paramMap.get('userid'); })

    this.userService.getUserById(this.userid).subscribe(data => {this.userData=data; this.userRole=this.prettyString(this.userData.userType);
      this.userData['userImgSanitized']=this.getImageSanitized(this.userData.userImg)})
  }
do(){
  alert("ciao")
  return true
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


prettyString(str){
// str.toLowerCase()
str=str[0].toUpperCase()+str.substr(1).toLowerCase()
// console.log(str)
return str
}
}
