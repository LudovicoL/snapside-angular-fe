import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DepartmentListComponent } from './department-list/department-list.component';

const loginRoutes: Routes = [
  {
      path: 'login',            //<---- parent component declared here
      component: LoginComponent,
      children: [                          //<---- child components declared here
          {
              path:'departments',
              component: DepartmentListComponent
          },
          {
              path:'employees',
              component: EmployeeListComponent
          }
      ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class LoginRoutingModule { }

