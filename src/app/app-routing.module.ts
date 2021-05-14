import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HivComponent } from './hiv/hiv.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
  { path: 'support', component:  SupportComponent, pathMatch: 'full'},
  { path: 'about', component:  AboutComponent, pathMatch: 'full'},
  { path: '', component:  HivComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
