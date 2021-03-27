import { OnInit, Component, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import * as globals from '../globals/globals';
import { map, filter, switchMap, catchError } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { EmployeeListComponent } from './employee-list/employee-list.component';
//import { routingComponents, AppRoutingModule } from '../app-routing.module';
import { AppComponent, } from '../app.component';
import { FormControl, FormGroup, NgForm } from '@angular/forms';


import { InteractionService } from '../services/interaction.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.1s ease-out', style({ opacity: '1' })),
      ]),
    ]),

    trigger('fadeOut', [
      transition(':leave', [
        style({ opacity: '1' }),
        animate('.2s ease-out', style({ opacity: '0' })),
      ]),
    ]),
  ],

})



export class LoginComponent implements OnInit {


  model: any = {};

  logInFailed = false;
  logUsername = '';


  appRoutes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/ERROR' }
  ];

  data: Promise<String>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private _interactionService: InteractionService,
    private _user: UserService


  ) { }

  ngOnInit() {

    sessionStorage.setItem('token', '');
    localStorage.setItem('token', '');
    // localStorage.setItem('token', btoa('and:pass')); // PER SVILUPPO

  }

  login(f: NgForm): void {
    this.validateLoginFields()
    if(this.model.username && this.model.password){
    localStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
    this.http.post(globals.loginUrl, { username: this.model.username, password: this.model.password })
      .subscribe((res) => {
        if (res['enabled']) {
          localStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
          // alert('LOGGED:\n Username: '+this.model.username+'\n Password: '+this.model.password+'\n token: '+localStorage.getItem('token'));
          this.logInFailed = false;


          if (res['userType'] === 'SELLER') {

            this.router.navigate(['user/seller', res['idUser'].toString(),'home']);
            this._user.updateLastAccess(res['idUser']).subscribe(data=>{console.log(data)})
          } else if (res['userType'] === 'ACQ') {
            alert('Sono un acquirente!')

            this._interactionService.sendUserID(res['idUser']);
            this.router.navigate(['acquirent']);
          }
          else if (res['userType'] === 'ADMIN') {
            // alert('Sono un admin!')

            this.router.navigate(['user/admin', res['idUser'].toString(),'home']);

          }

          else if (res['userType'] === 'CUSTOMER') {
            alert("Customers use mobile app")
            // this.router.navigate(['about']);
               }

        } else {
          this.logInFailed=true;
          // alert("Authentication failed.")
        }
      },
      (error) => {alert(error+'\nLogin request failed. There is a problem with HTTP request to backend server')}


      );
    }
    // f.reset();
  }



validateLoginFields(){
  var forms = document.getElementsByClassName('needs-validation');
  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, function(form) {
  form.addEventListener('submit', function(event) {
  if (form.checkValidity() === false) {
  event.preventDefault();
  event.stopPropagation();
  }
  form.classList.add('was-validated');
  }, false);
  });

}
onKeydown(event) {
  if (event.key !== "Enter") { // not strictly necessary condition
    this.logInFailed=false;
  }
}
}




/* (function() {
'use strict';
window.addEventListener('load', function() {
// Fetch all the forms we want to apply custom Bootstrap validation styles to
var forms = document.getElementsByClassName('needs-validation');
// Loop over them and prevent submission
var validation = Array.prototype.filter.call(forms, function(form) {
form.addEventListener('submit', function(event) {
if (form.checkValidity() === false) {
event.preventDefault();
event.stopPropagation();
}
form.classList.add('was-validated');
}, false);
});
}, false);
})();
 */
