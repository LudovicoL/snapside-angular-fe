import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IUser } from '../interfaces/user';
import { InteractionService } from '../services/interaction.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifService } from '../services/notif.service';
import { GuiService } from '../services/gui.service';
import { MessagingService } from '../shared/messaging.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-admin-home',
  templateUrl: './user-admin-home.component.html',
  styleUrls: ['./user-admin-home.component.css']
})
export class UserAdminHomeComponent implements OnInit {
  public userData : IUser
  userid : string;
  name: string;
  parentMessage = "message from parent"
  mobile;
  dateNow;
  notifs=[]
  //config
  persistPush=true
  //
  token='';

  ngOnChange(){
    this.mobile=this.isMobile()

  }
  constructor(private _interactionService: InteractionService,
    private userService: UserService,
    private http: HttpClient,
    private _Activatedroute:ActivatedRoute,
    private _data: DataService,
    private cdRef:ChangeDetectorRef,
    private _notif:NotifService,
    private _gui:GuiService,
    private router: Router,
    private messagingService: MessagingService) { }

  ngOnInit() {
    this._Activatedroute.paramMap.subscribe(params => {
      this.userid = params.get('userid');
      this._data.sendUserid(this.userid)
    });

  }



  isMobile(){
    if($(window).width()< 550 ){

    return true; }
    else{

      return false;
  }
  }
}
