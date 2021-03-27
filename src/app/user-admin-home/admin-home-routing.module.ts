import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




import { AdminAdsListComponent } from './admin-ads-list/admin-ads-list.component';
import { UserAdminHomeComponent } from './user-admin-home.component';
import { ErrorRouteComponent } from '../error-route/error-route.component';
import { AdminManageSchemaComponent } from './admin-manage-schema/admin-manage-schema.component';
import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { InspectAdComponent } from '../user-seller-home/inspect-ad/inspect-ad.component';

const homeRoutes: Routes = [

  {
      path: 'user/admin/:userid/home',            //<---- parent component declared here
      component: UserAdminHomeComponent,
      children: [
        {
          path: 'admin-ads-list',
          component: AdminAdsListComponent,
      },
      {
        path: 'admin-manage-schema',
        component: AdminManageSchemaComponent,
    },
    {
      path: 'admin-users-list',
      component: AdminUsersListComponent,
  },
  {
    path:'inspect-ad',
    component: InspectAdComponent,
  },
  //<---- child components declared here
      ]
  },
  {path: '**', component: ErrorRouteComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AdminHomeRoutingModule { }

