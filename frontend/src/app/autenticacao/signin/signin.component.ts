import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Usuario } from 'app/infra/models/Usuario';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'app/infra/http/autenticacao.service';
import { Signin } from 'app/infra/models/Signin';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public registerForm: FormGroup
  public loading: boolean;
  public submitted = false;

  private signin: Signin
  private currentUser: Object

  constructor(
    private autenticacaoService: AutenticacaoService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
    })
  }
  get f() { return this.registerForm.controls; }

  signinGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => {
        this.authService.authState.subscribe((user) => {
          this.autenticacaoService.signinSocialUser(user).subscribe(
            signin => {
              this.router.navigate(['/home'])
            },
            error => {
              console.log(error)
            })
        });
      })
  }

  signinFacebook(){    
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then(() => {
      this.authService.authState.subscribe((user) => {
        this.autenticacaoService.signinSocialUser(user).subscribe(
          signin => {
            this.router.navigate(['/home'])
          },
          error => {
            console.log(error)
          })
      });
    })  
  }

  signinEmail(): void {
    this.signin = this.registerForm.value
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true
    this.autenticacaoService.signin(this.signin).subscribe(
      signin => {
        setTimeout(() => {
          this.loading = false
          if (Object.keys(signin).length !== 0) {
            this.router.navigate(['/home'])
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erro ao realizar o login, tente novamente!',
            })
          }
        }, 1500)
      },
      error => {
        this.loading = false
        if (error.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Email ou Senha inválido',
          })
        }
        if (error.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao realizar o login, tente novamente!',
          })
        }

      })
  }

}
