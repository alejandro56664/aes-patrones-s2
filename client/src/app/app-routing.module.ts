import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component'
import { GameFormComponent } from './components/game-form/game-form.component';
import { ProductListComponent } from './components/product-list/product-list.component'
import { ProductFormComponent } from './components/product-form/product-form.component'
import { UserFormComponent } from './components/user-form/user-form.component'
import { UserLoginComponent } from './components/user-login/user-login.component'
import { UserLogoutComponent } from './components/user-logout/user-logout.component'
import { AuthGuard } from '../app/components/athGuard/authGuard';
const routes: Routes = [

  {
    path: '',
    redirectTo: '/users/login',
    canActivate: [AuthGuard],
    pathMatch: 'full'
  }, 
  {
    path: 'auth/login',
    redirectTo: '/users/login',
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'cotizaciones',
    component: GameListComponent
  },
  {
    path: 'cotizaciones/add',
    component: GameFormComponent
  },
  {
    path: 'cotizaciones/edit/:id',
    component: GameFormComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'products/add',
    component: ProductFormComponent
  },
  {
    path: 'users/add',
    component: UserFormComponent
  },
  {
    path: 'users/login',
    component: UserLoginComponent
  },
  {
    path: 'users/logout',
    component: UserLogoutComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
