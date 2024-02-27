import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authguard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { CallvolumeComponent } from './components/callvolume/callvolume.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'callvolume',component:CallvolumeComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
