import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Usuario } from 'app/infra/models/Usuario';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'app/infra/service/autenticacao.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public registerForm: FormGroup
  public loading: boolean;
  public submitted = false;

  private user: SocialUser;
  private usuario: Usuario;

  constructor(
    private autenticacaoService: AutenticacaoService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }
  get f() { return this.registerForm.controls; }

  signinGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => {
        this.authService.authState.subscribe((user) => {
          this.autenticacaoService.signinSocialUser(user).subscribe(
            signin => {
              console.log(signin)
              this.router.navigate(['/home'])
            },

            error => {
              console.log(error)
            })
        });
      })
  }
  signinEmail(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }

  }
  signup(): void {
    alert('signup')
  }

  signOut(): void {
    this.authService.signOut(true)
      .then(signOut => console.log(signOut))
  }

}
