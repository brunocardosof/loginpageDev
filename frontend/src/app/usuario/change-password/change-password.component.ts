import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'app/infra/http/usuario.service';
import { Password } from 'app/infra/interface/Password';
import Swal from 'sweetalert2';
import { AutenticacaoService } from 'app/infra/http/autenticacao.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public registerForm: FormGroup
  public submitted: boolean = false
  public loading: boolean = false

  private password: Password

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private autenticacaoService: AutenticacaoService,
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  get f() { return this.registerForm.controls; }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      id: [this.autenticacaoService.currentUserValue.id],
      senhaAtual: ['',[Validators.required]],
      senhaNova: ['',[Validators.required]],
      senhaConfirmar: ['',[Validators.required]],
    })
  }

  updateBtnClick(){
    this.password = this.registerForm.value
    if(!this.confirmarSenha()) {        
      Swal.fire({
        icon: 'error',
        title: 'Senhas não conferem!',
      })
      return false
    }

    this.loading = true

    this.usuarioService.changePassword(this.password.id, this.password).subscribe(
      password => {
        this.loading = false
        if(password) {          
          Swal.fire({
            icon: 'success',
            title: 'Cadastro atualizado com sucesso!',
          })
        } else {       
          Swal.fire({
            icon: 'error',
            title: 'Erro ao realizar a atualização da senha, tente novamente mais tarde!',
          })          
        }
      },
      error => {
        this.loading = false   
        if(error.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Senha atual inválida!',
          })             
        }  else {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao realizar a atualização da senha, tente novamente mais tarde!',
          })   
        }  
      })
  }

  confirmarSenha(): boolean{
    const senha = this.registerForm.get("senhaNova").value
    const confirmacaoSenha = this.registerForm.get("senhaConfirmar").value
    if(senha !== confirmacaoSenha) {    
      return false
    }
    return true
  }

}
