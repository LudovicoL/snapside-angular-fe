import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IUser } from '../interfaces/user';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import * as globals from '../globals/globals';
import * as moment from "moment"
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private _sanitizer: DomSanitizer,private http: HttpClient,private _user:UserService) {


  }

  regUserImgSanitized=this.getImageSanitized(null)
  regUserImg=null
  regName
  regSurname
  regDob
  regUsername
  regPassword
  regAddress
  regEmail
  regPhone
  regRole="SELLER"
  alreadyExists=false;
  registered=false
  ngOnInit() {

      this.validateAndRegister()
  }


  changeListener($event) : void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    // console.log(inputValue.files[0].name)

    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.regUserImg = myReader.result;
      this.regUserImgSanitized = myReader.result;

    }
    myReader.readAsDataURL(file)

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


  setRole(r)
  {
    this.regRole=r
  }

  setDob(event){
    let date = new Date(event.value)
    this.regDob=date.getTime()
  }

  async register()
  {
    var res= await this._user.getByUsername(this.regUsername).toPromise()
    console.log(res)
    if(res.username!=null){
          this.alreadyExists=true;
          return false;
        }
    else{
      this.alreadyExists=false;
      if(this.regUserImg!=null)
        {this.regUserImg=this.regUserImg.split(',').slice(-1).pop()}

      var newUser: IUser={
        idUser: null,
        name: this.regName,
        surname: this.regSurname,
        dob: this.regDob,
        email: this.regEmail,
        username: this.regUsername,
        password: this.regPassword,
        address: this.regAddress,
        enabled: true,

        userType: this.regRole,
        userImg: this.regUserImg,
        lastAccess: moment().valueOf(),
        token: null,
        phone: this.regPhone
      }
      this._user.saveUser(newUser).subscribe(data=>{console.log(data);this.registered=true})



    }
  }


  validateAndRegister(){
    var that=this;
    (function() {
      'use strict';

      // window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission

        var validation = Array.prototype.filter.call(forms, function(form) {
        // form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            console.log('Not valid')
          }
          else{
            console.log('Valid')
            that.register()
          }
          form.classList.add('was-validated');
        // }, false);
      });
      // }, false);
    })();
  }


  removeImg()
  {
    this.regUserImg=null
    this.regUserImgSanitized=this.getImageSanitized(null)
  }
}
