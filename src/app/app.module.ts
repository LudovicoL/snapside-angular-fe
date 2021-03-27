import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';


import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

import { MatToolbarModule,
   MAT_DATE_LOCALE} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { LoginRoutingModule,  } from './login/login-routing.module';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import { UserSellerHomeComponent } from './user-seller-home/user-seller-home.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { HeaderLoggedComponent } from './header-logged/header-logged.component';
import { SellerHeaderComponent } from './user-seller-home/seller-header/seller-header.component';
import { GlobalHttpInterceptorService } from './interceptors/global-http-interceptor.service';

import { UserAcquirentHomeComponent } from './user-acquirent-home/user-acquirent-home.component';
import { NewAdComponent } from './user-seller-home/new-ad/new-ad.component';
import { TestComponent } from './user-seller-home/test/test.component';
import { SellerHomeRoutingModule } from './user-seller-home/seller-home-routing.module';
import { AdsListComponent } from './user-seller-home/ads-list/ads-list.component';
import { NotifsListComponent } from './user-seller-home/notifs-list/notifs-list.component';
import { InspectAdComponent } from './user-seller-home/inspect-ad/inspect-ad.component';
import { DataService } from './services/data.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AdCalendarComponent } from './user-seller-home/inspect-ad/ad-calendar/ad-calendar.component';
import { InspectAdGalleryComponent } from './user-seller-home/inspect-ad/inspect-ad-gallery/inspect-ad-gallery.component';
import { SearchService } from './services/search.service';
import { GuiService } from './services/gui.service';
import { InspectAdAttributesComponent } from './user-seller-home/inspect-ad/inspect-ad-attributes/inspect-ad-attributes.component';
import { MediaService } from './services/media.service';
import { SharedModule } from './shared.module';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { CommentSectionComponent } from './user-seller-home/inspect-ad/comment-section/comment-section.component';
import { CommentService } from './services/comment.service';
import { MapSectionComponent } from './user-seller-home/new-ad/map-section/map-section.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AgmCoreModule } from '@agm/core';
import { AddHeaderInterceptor } from './interceptors/httpauth.service'


// FIREBASE
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './shared/messaging.service';
import { environment } from '../environments/environment';
import { AsyncPipe } from '../../node_modules/@angular/common';


import { EditAdComponent } from './user-seller-home/edit-ad/edit-ad.component';
import { MapViewComponent } from './user-seller-home/inspect-ad/map-view/map-view.component';
import { NotifService } from './services/notif.service';
import { AdditiveModule } from './additive.module';
import { UserAdminHomeComponent } from './user-admin-home/user-admin-home.component';
import { AdminHeaderComponent } from './user-admin-home/admin-header/admin-header.component';
import { AdminAdsListComponent } from './user-admin-home/admin-ads-list/admin-ads-list.component';
import { AdminHomeRoutingModule } from './user-admin-home/admin-home-routing.module';
import { ErrorRouteComponent } from './error-route/error-route.component';
import { AdminManageSchemaComponent } from './user-admin-home/admin-manage-schema/admin-manage-schema.component';
import { UsersListComponent } from './user-admin-home/users-list/users-list.component';
import { SellerReservationsComponent } from './user-seller-home/seller-reservations/seller-reservations.component';
import { AdminUsersListComponent } from './user-admin-home/admin-users-list/admin-users-list.component';
import { RegisterUserComponent } from './register-user/register-user.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    routingComponents,
    UserSellerHomeComponent,
    AboutComponent,
    HeaderComponent,
    HeaderLoggedComponent,
    SellerHeaderComponent,
    UserAcquirentHomeComponent,
    NewAdComponent,
    TestComponent,
    AdsListComponent,
    NotifsListComponent,
    InspectAdComponent,
    AdCalendarComponent,
    InspectAdGalleryComponent,
    InspectAdAttributesComponent,
    CommentSectionComponent,
    MapSectionComponent,
    EditAdComponent,
    MapViewComponent,
    UserAdminHomeComponent,
    AdminHeaderComponent,
    AdminAdsListComponent,
    ErrorRouteComponent,
    AdminManageSchemaComponent,
    UsersListComponent,
    SellerReservationsComponent,
    AdminUsersListComponent,
    RegisterUserComponent,


  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [

    MDBBootstrapModule.forRoot(),
    NavbarModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA4KdwJtPi9jK0GZvctyj4L0efaZa_bnv4',
      libraries: ['places']
    }),
    ReactiveFormsModule, BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    LoginRoutingModule,
    SellerHomeRoutingModule,
    AdminHomeRoutingModule,
    CalendarModule,
    FullCalendarModule, // for FullCalendar!,
    SharedModule,
    NgxPaginationModule,
    AdditiveModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),



  ],
  exports:[CommonModule,
    MatToolbarModule,

  ],
  //schemas:[CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
    },
    {provide: MAT_DATE_LOCALE, useValue: 'it-IT'},
    DataService,
    SearchService,
    GuiService,
    MediaService,
    CommentService,
    MessagingService, //firebase
    AsyncPipe, //firebase
    NotifService],
  bootstrap: [AppComponent]
})
export class AppModule { }
