import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { TrxnBoardComponent } from './components/trxn-board/trxn-board.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './_helpers';
const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'login', component: WelcomeComponent },
  { path: 'dashboard/:id', component: TrxnBoardComponent,canActivate: [AuthGuard]}, 
  { path: 'profile/:id', component: ProfileComponent,canActivate: [AuthGuard]},  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { initialNavigation: 'enabled' }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
