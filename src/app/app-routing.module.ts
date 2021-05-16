import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HivComponent } from './hiv/hiv.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
  { path: 'login', component:  LoginComponent, pathMatch: 'full'},
  { path: 'profile', component:  ProfileComponent, pathMatch: 'full'},
  { path: 'support', component:  SupportComponent, pathMatch: 'full'},
  { path: 'about', component:  AboutComponent, pathMatch: 'full'},
  { path: '', component:  HivComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
