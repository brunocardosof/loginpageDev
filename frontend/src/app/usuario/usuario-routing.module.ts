import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [  
  {
    path: 'update',
    loadChildren: () => import('./update/update.module').then(m => m.UpdateModule)
  },
  {
    path: 'changePassword',
    loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule)
  },
  {
    path: 'changeEmail',
    loadChildren: () => import('./change-email/change-email.module').then(m => m.ChangeEmailModule)
  },
  {
    path: 'delete',
    loadChildren: () => import('./delete/delete.module').then(m => m.DeleteModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
