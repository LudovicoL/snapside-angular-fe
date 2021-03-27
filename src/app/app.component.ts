import { Component, OnInit } from '@angular/core';
import {LoginComponent} from './login/login.component'
import { MessagingService } from './shared/messaging.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'snapside-angular-fe';
  message;


  constructor(
    private messagingService: MessagingService
    ) { }
  ngOnInit() {//FIREBASE PUSH OK*
    // const userId = 'user001';
    // this.messagingService.requestPermission(userId)
    // this.messagingService.deleteToken()
    // this.messagingService.requestPermission(userId)
    // this.messagingService.receiveMessage()
    // this.message = this.messagingService.currentMessage
  }



}

