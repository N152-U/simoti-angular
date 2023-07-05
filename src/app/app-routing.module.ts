import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/pages/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  //{useHash: true} esto añadirá un # a la ruta, que es un viejo truco de los navegadores para evitar que el navegador recargue la pagina.
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
