import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/pages/login/login.component';
import { MantainanceComponent } from './components/pages/mantainance/mantainance.component';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { MapComponent } from './components/pages/map/map.component';
import { AboutComponent } from './components/pages/about/about.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ManagmentModule } from './components/pages/managment/managment.module';
import { AuthGuard } from './guards/auth.guard';
import { ReportsComponent } from './components/pages/reports/reports.component';
//Rutas hijas
const managmentModule = () => import('./components/pages/managment/managment.module').then(x => x.ManagmentModule);

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent },
  { path: 'managment', loadChildren: managmentModule, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'mantainance', component: MantainanceComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  //{useHash: true} esto añadirá un # a la ruta, que es un viejo truco de los navegadores para evitar que el navegador recargue la pagina.
  imports: [RouterModule.forRoot(routes, { useHash: true }), ManagmentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
