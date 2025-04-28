import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth.guard';

import { PatientComponent } from './patient.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { DetailPatientComponent } from './detail-patient/detail-patient.component';
import { TemperaturePatientComponent } from './temperature-patient/temperature-patient.component';
import { OxygenSaturationPatientComponent } from './oxygen-saturation-patient/oxygen-saturation-patient.component';
import { LocationPatientComponent } from './location-patient/location-patient.component';
import { HeartRatePatientComponent } from './heart-rate-patient/heart-rate-patient.component';
import { FallDetectorPatientComponent } from './fall-detector-patient/fall-detector-patient.component';

const routes: Routes = [
  { 
    path: '', component: PatientComponent,canActivate: [AuthGuard],
    children: [
      { path: 'new-patient', component: NewPatientComponent, canActivate: [AuthGuard] },
      { path: "edit-patient/:hash", component: EditPatientComponent, canActivate: [AuthGuard] },
      { path: "detail-patient/:hash", component: DetailPatientComponent, canActivate: [AuthGuard] },
      //Indicadores
      { path: "detail-patient/temperature/:hash", component: TemperaturePatientComponent, canActivate: [AuthGuard] },
      { path: "detail-patient/oxygen-saturation/:hash", component: OxygenSaturationPatientComponent, canActivate: [AuthGuard] },
      { path: "detail-patient/location/:hash", component: LocationPatientComponent, canActivate: [AuthGuard] },
      { path: "detail-patient/heart-rate/:hash", component: HeartRatePatientComponent, canActivate: [AuthGuard] },
      { path: "detail-patient/fall-detector/:hash", component: FallDetectorPatientComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
