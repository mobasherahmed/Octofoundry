import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/employees',
    pathMatch:'full'
  },
  {
    path:'employees',
    loadChildren:()=>import('./layout/layout.module').then(m=>m.LayoutModule)
  },
  {
    path:'**',
    redirectTo:'/employees',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
