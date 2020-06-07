import { Component, OnInit } from '@angular/core';
import  {Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Email } from 'app/infra/interface/Email';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtValidatorService } from 'app/infra/http/jwt-validator.service';
import Swal from 'sweetalert2';
import { UsuarioService } from 'app/infra/http/usuario.service';
import { AutenticacaoService } from 'app/infra/http/autenticacao.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  private email: Email
  private currentUserId
  private currentUserIsSocialLogin

  public registerForm: FormGroup
  public loading: boolean = false
  public submitted: boolean = false
  public jwt: string
  public isValidJwt: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private autenticacaoService: AutenticacaoService,
    private jwtValidatorService: JwtValidatorService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.createForm()
    this.jwt = this.route.snapshot.params['jwt'] ? this.route.snapshot.params['jwt'] : ""
    if (this.jwt !== "") {
      this.jwtValidatorService.usuarioChangeEmailValidate(this.jwt).subscribe(
        jwt => {
          if (!jwt) {
            Swal.fire({
              icon: 'error',
              title: `Token inválido! solicite um novo informando seu email atual!`,
            })
            this.location.replaceState('/usuario/changeEmail')
          } else {            
          document.getElementById("formNoParam").style.display = "none"
          document.getElementById("formParam").style.display = "block"
          }
        },
        error => {
          if (error.status === 401) {
            document.getElementById("formNoParam").style.display = "block"
            document.getElementById("formParam").style.display = "none"
            Swal.fire({
              icon: 'error',
              title: `Token inválido! solicite um novo informando seu email atual!`,
            })
            this.location.replaceState('/usuario/changeEmail')
          }
        })
    } else {
      document.getElementById("formNoParam").style.display = "block"
      document.getElementById("formParam").style.display = "none"
      this.location.replaceState('/usuario/changeEmail')
    }
  }

  get f() { return this.registerForm.controls; }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      emailAtual: ['', [Validators.email, Validators.required]],
      emailNovo: ['', [Validators.email, Validators.required]]
    })
  }
  sendEmail() {
    this.loading = true
    const email = { destinatario: this.registerForm.get("emailAtual").value }
    this.usuarioService.sendLinkTochangeEmail(email).subscribe(
      emailResponse => {
        if (emailResponse.response.match(/OK/)) {
          this.loading = false
          Swal.fire({
            icon: 'success',
            title: `Acesse o link que foi enviado para seu email ${email.destinatario} para modifica-lo!`,
          })
        } else {
          this.loading = false
          Swal.fire({
            icon: 'error',
            title: `Erro ao enviar o email, tente novamente!`,
          })
        }
      },
      error => {
        this.loading = false
        Swal.fire({
          icon: 'error',
          title: `Erro ao enviar o email, tente novamente!`,
        })
      })
  }

  updateBtnClick() {
    this.loading = true
    this.getCurrentUser()
    const email = { emailNovo: this.registerForm.get("emailNovo").value }
    this.usuarioService.changeEmail(this.currentUserId, email).subscribe(
      email => {
        this.loading = false
        if(email) {
          Swal.fire({
            icon: 'success',
            title: `Email atualizado com sucesso, reloge na plataforma por gentileza!`,
          })
          this.autenticacaoService.logout(this.currentUserIsSocialLogin)
        } else {
          this.loading = false
          Swal.fire({
            icon: 'error',
            title: `Erro na atualização do email, tente novamente`,
          })
        }
      }, 
      error => {
        this.loading = false
        Swal.fire({
          icon: 'error',
          title: `Erro na atualização do email, tente novamente`,
        })
        console.log(error)
      }
    )
  }

  getCurrentUser(){
    if (this.autenticacaoService.currentUserValue !== null) {
      this.currentUserId = this.autenticacaoService.currentUserValue.id
      this.currentUserIsSocialLogin = this.autenticacaoService.currentUserValue.isSocialUser
    }
  }

}
