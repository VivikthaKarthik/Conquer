import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CallvolumeComponent } from './components/callvolume/callvolume.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'callvolume',component:CallvolumeComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

//const routes: Routes = [
  //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent },
  // { path: 'random1', component: RandomComponent1, canActivate: [AuthGuard] },
  // { path: 'random2', component: RandomComponent2, canActivate: [AuthGuard] },
  // Add more routes as needed
//];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
