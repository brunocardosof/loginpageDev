import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes =[
  {
    path: 'autenticacao',
    loadChildren: () => import('./autenticacao/autenticacao.module').then(m => m.AutenticacaoModule)

  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)

  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }