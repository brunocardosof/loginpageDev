import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacaoService } from 'app/infra/http/autenticacao.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  public post: boolean = true

  private usuario: Usuario


  constructor(
    public autenticacaoService: AutenticacaoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.createForm()
    if(this.route.snapshot.paramMap.get('update')) {
      this.post = false
      this.registerForm.get('nome').setValue(this.route.snapshot.paramMap.get('nome'))
    }
    let nome = this.route.snapshot.paramMap.get('nome')
    let email = this.route.snapshot.paramMap.get('email')
    let telefone = this.route.snapshot.paramMap.get('telefone')
    let update = this.route.snapshot.paramMap.get('update')
  }

  get f() { return this.registerForm.controls; }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      senha: ['', [Validators.required]],
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
  updateBtnClick(){
    alert('UPDATE')
  }

  validatepassword(): boolean {
    const senha = this.registerForm.get("senha").value
    const confirmacaoPassword = this.registerForm.get("confirmarPassword").value
    if (senha !== confirmacaoPassword) {
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
