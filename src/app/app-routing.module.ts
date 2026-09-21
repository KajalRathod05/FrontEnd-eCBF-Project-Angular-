import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
 
  { path : 'pages',loadChildren:()=> import('./pages/pages.module').then(m=>m.PagesModule)},

  { path : 'login' , loadChildren: ()=> import('./auth/auth.module').then(u=>u.AuthModule)},

  { path: '',redirectTo:'login', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
