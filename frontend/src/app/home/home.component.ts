import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'app/infra/http/autenticacao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private isSocialUser: Boolean = false

  public userName: string = ""
  public urlImg: string = ""

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (this.autenticacaoService.currentUserValue === null) {
      this.router.navigate(['/autenticacao'])
    }
    let nome = this.route.snapshot.paramMap.get('nome')
    let foto = this.route.snapshot.paramMap.get('foto')
    if (this.autenticacaoService.currentUserValue !== null) {

      if (foto) {
        this.urlImg = foto
      } else {
        this.urlImg = "./assets/img/angular2-logo-red.png"
      }

      if (nome) {
        this.userName = nome
      } else {
        this.userName = "Usuário"
      }


    }
  }

  prepareUpdateUser() { }

  logout() {
    localStorage.removeItem('currentUser')
    this.userName = ""
    this.urlImg = ""
    if (this.isSocialUser) {
      this.authService.signOut(true)
    }
    this.router.navigate(['/autenticacao'])
  }

}
