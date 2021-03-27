import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'angular-bootstrap-md';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDatepickerModule, MatToolbarModule, MatButtonModule, MatCardModule,
  MatInputModule, MatDialogModule, MatTableModule, MatMenuModule, MatIconModule, MatSliderModule, MatProgressSpinnerModule } from '@angular/material';
import {MatTreeModule} from '@angular/material/tree';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTreeModule
  ],
  declarations: [


  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    NgbModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatTreeModule

  ]
})
export class AdditiveModule { }
