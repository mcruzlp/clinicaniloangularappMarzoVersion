import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  /* { path: 'home',  },
  { path: 'login', component: LoginComponent },
  { path: 'appointments', component: AppointmentsListComponent },
  { path: 'patients', component: PatientsListComponent }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
