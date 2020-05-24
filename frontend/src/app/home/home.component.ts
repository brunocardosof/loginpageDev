import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'app/infra/http/autenticacao.service';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private isSocialUser: Boolean = false
  
  public userName: string = "Usuario"

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (this.autenticacaoService.currentUserValue === null) {
      this.router.navigate(['/autenticacao'])
    }
    if (this.autenticacaoService.currentUserValue !== null) {
      this.autenticacaoService.currentUserValue.isSocialUser ?
        this.isSocialUser = true :
        this.isSocialUser = false
    }
    this.userName = this.autenticacaoService.currentUserValue.nome  
  }

  logout() {
    localStorage.removeItem('currentUser')
    if (this.isSocialUser) {
      this.authService.signOut(true)
    }
    this.router.navigate(['/autenticacao'])
  }

}
