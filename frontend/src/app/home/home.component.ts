import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'app/infra/http/autenticacao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { UsuarioService } from 'app/infra/http/usuario.service';
import { Usuario } from 'app/infra/models/Usuario';

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
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (this.autenticacaoService.currentUserValue === null) {
      this.router.navigate(['/autenticacao'])
    }
    if (this.autenticacaoService.currentUserValue !== null) {
      let nome = this.autenticacaoService.currentUserValue.nome
      let foto = this.autenticacaoService.currentUserValue.foto

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

  prepareUpdateUser() {
    const token = JSON.parse(localStorage.getItem('currentUser'))
    this.usuarioService.getByToken(token.token).subscribe(
      usuario => {
        this.router.navigate(['/usuario/update'])
      },
      error => {
        console.log(error)
      })
  }

  logout() {
    this.autenticacaoService.logout(this.isSocialUser)
  }

}
