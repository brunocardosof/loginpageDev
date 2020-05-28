import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'app/infra/http/autenticacao.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isSocialUser: boolean = false

  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit(): void {
    this.autenticacaoService.currentUserValue.isSocialUser ?
      this.isSocialUser = true :
      this.isSocialUser = false 
  }

  update(){
    this.router.navigate(['usuario/update'])
  }

  changePassword(){
    this.router.navigate(['usuario/changePassword'])

  }

  changeEmail(){
    this.router.navigate(['usuario/changeEmail'])
  }
  delete(){
    this.router.navigate(['usuario/delete'])    
  }

  logout(){
    this.autenticacaoService.logout(this.isSocialUser)
  }

}
