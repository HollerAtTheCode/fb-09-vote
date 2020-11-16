import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformationComponent } from './information/information.component';
import { LoginComponent } from './login/login.component';
import { VotingCompletedComponent } from './voting-completed/voting-completed.component';
import { VotingPageComponent } from './voting-page/voting-page.component';


const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'voting-page', component: VotingPageComponent, pathMatch: 'full'},
  {path: 'voting-completed', component: VotingCompletedComponent, pathMatch: 'full'},
  {path: 'info', component: InformationComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
