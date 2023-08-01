import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManagmentRoutingModule } from './managment-routing.module';
import { ManagmentComponent } from './managment.component';


@NgModule({
  declarations: [
    ManagmentComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ManagmentRoutingModule,
    CommonModule,
    NgxPermissionsModule,
    NgxPermissionsModule.forRoot(),
    NgxPermissionsModule.forChild(),
  ],
  providers: []
})
export class ManagmentModule { }
