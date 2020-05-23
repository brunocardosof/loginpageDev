import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacaoService } from 'app/infra/http/autenticacao.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from 'app/infra/models/Usuario';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public registerForm: FormGroup
  public submitted: boolean = false
  public loading: boolean = false

  private usuario: Usuario


  constructor(
    public autenticacaoService: AutenticacaoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  get f() { return this.registerForm.controls; }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      password: ['', [Validators.required]],
      confirmarPassword: ['', [Validators.required]],
    })
  }

  signupBtnClick() {
    this.submitted = true;
    this.loading = true;

    if (this.registerForm.invalid) {
      this.loading = false;
      return;
    }

    this.validatepassword()

    this.usuario = this.registerForm.value
    this.autenticacaoService.signup(this.usuario).subscribe(
      signup => {
        setTimeout(() => {
          this.loading = false
          if (Object.keys(signup).length !== 0) {
            Swal.fire({
              icon: 'success',
              title: 'Cadastro realizado com sucesso!',
            })
            this.router.navigate(['/autenticacao'])
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erro ao realizar o cadastro, tente novamente!',
            })
          }
        }, 1500)
      },
      error => {
        console.log(error)
      })

  }

  validatepassword(): boolean {
    const password = this.registerForm.get("password").value
    const confirmacaoPassword = this.registerForm.get("confirmarPassword").value
    if (password !== confirmacaoPassword) {
      Swal.fire({
        icon: 'error',
        title: 'senhas não conferem',
      })
      this.loading = false;
      return false
    }
    return true
  }

}
