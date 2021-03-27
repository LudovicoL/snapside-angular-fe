import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { NewAdComponent } from './new-ad/new-ad.component';
import { UserSellerHomeComponent } from './user-seller-home.component';
import { TestComponent } from './test/test.component';
import { AdsListComponent } from './ads-list/ads-list.component';
import { NotifsListComponent } from './notifs-list/notifs-list.component';
import { InspectAdComponent } from './inspect-ad/inspect-ad.component';
import { EditAdComponent } from './edit-ad/edit-ad.component';
import { SellerReservationsComponent } from './seller-reservations/seller-reservations.component';

const homeRoutes: Routes = [

  {
      path: 'user/seller/:userid/home',            //<---- parent component declared here
      component: UserSellerHomeComponent,
      data: {urlTag: 'ads-list'},
      children: [
        {
          path:'ads-list',
          component: AdsListComponent, data: {urlTag: 'ads-list'}
      },                        //<---- child components declared here
          {
              path:'new-ad',
              component: NewAdComponent,
          },
          {
            path:'edit-ad',
            component: EditAdComponent,
        },
          {
            path:'test',
            component: TestComponent,
        },
        {
          path:'notifs-list',
          component: NotifsListComponent,
          data: {urlTag: 'notifs-list'}
      },
      {
        path:'inspect-ad',
        component: InspectAdComponent,
    },
    {
      path:'seller-reservations',
      component: SellerReservationsComponent,
  },
      ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class SellerHomeRoutingModule { }

