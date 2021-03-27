import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentListComponent } from './login/department-list/department-list.component';
import { EmployeeListComponent } from './login/employee-list/employee-list.component';
import { LoginComponent } from './login/login.component';
import { UserSellerHomeComponent } from './user-seller-home/user-seller-home.component';
import { AboutComponent } from './about/about.component';
import { UserAcquirentHomeComponent } from './user-acquirent-home/user-acquirent-home.component';
import { AppComponent } from './app.component';
import { NewAdComponent } from './user-seller-home/new-ad/new-ad.component';
import { TestComponent } from './user-seller-home/test/test.component';
import { InspectAdComponent } from './user-seller-home/inspect-ad/inspect-ad.component';
import { UserAdminHomeComponent } from './user-admin-home/user-admin-home.component';
import { ErrorRouteComponent } from './error-route/error-route.component';
import { RegisterUserComponent } from './register-user/register-user.component';


const routes: Routes = [

  // {path: '', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},

  { path: 'user/seller/:userid/home',
  redirectTo: 'user/seller/:userid/home/ads-list',
  pathMatch: 'full',
  data: {urlTag: 'ads-list'}
  },

  // {path: 'user/admin/:userid/home', component: UserAdminHomeComponent},

  // {path: 'user/seller/:userid/home', component: UserSellerHomeComponent},
  { path: 'user/admin/:userid/home',
  redirectTo: 'user/admin/:userid/home/admin-ads-list',
  pathMatch: 'full'
  },



  {path: 'about', component: AboutComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'user/acquirent', component: UserAcquirentHomeComponent},
  // {path: 'user/seller/:userid/home/new-ad', component: NewAdComponent}
   {path: 'test', component: TestComponent},
  //{path: 'departments', component: DepartmentListComponent},
  //{path: 'employees', component: EmployeeListComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [AppComponent, DepartmentListComponent, EmployeeListComponent,
  LoginComponent,UserSellerHomeComponent,AboutComponent,UserAcquirentHomeComponent,NewAdComponent,TestComponent,InspectAdComponent];
