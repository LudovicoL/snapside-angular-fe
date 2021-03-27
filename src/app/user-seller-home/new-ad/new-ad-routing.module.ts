import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewAdComponent } from './new-ad.component';

const routes: Routes = [
  {
    path: 'new-ad',
    component: NewAdComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
