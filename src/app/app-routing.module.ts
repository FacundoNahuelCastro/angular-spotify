import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '@core/guards/admin.guard';
import { SessionGuard } from '@core/guards/session.guard';


const routes: Routes = [ //TODO: router-outlet (Padre)
  {
    path: 'auth', //TODO (Public) Login, Register, Forgot...
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',//TODO (Private) 🔴🔴
    component: HomePageComponent,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'admin',//TODO (Private) 🔴🔴
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [adminGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }