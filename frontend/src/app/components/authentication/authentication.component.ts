import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { AuthenticationService } from '../../../app/infra/service/authentication.service'
import Swal from 'sweetalert2'
import { OAuthService } from 'angular-oauth2-oidc'

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  public registerForm: FormGroup
  public submitted: Boolean = false

  private usuario: Object

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private oauthService: OAuthService
  ) { }

  ngOnInit() {
    this.createForm()
  }

  public authenticationGoogle() {
    this.oauthService.initLoginFlow();
  }

  public logoff() {
    this.oauthService.logOut();
  }

  public get name() {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims;
  }

  get f() { return this.registerForm.controls }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    })
  }

  authentication() {
    this.submitted = true
    if (this.registerForm.invalid) {
      return
    }
    const email = this.registerForm.get('email').value
    const password = this.registerForm.get('password').value
    this.authenticationService.login(email, password).subscribe(data => {
      if (data) {
        Swal.fire({
          type: 'success',
          title: 'Redirecionando',
          showConfirmButton: false,
          timer: 1500
        });
        window.location.reload()
      } else {
        Swal.fire({
          type: 'error',
          title: 'Email/Senha incorreto',
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

}
