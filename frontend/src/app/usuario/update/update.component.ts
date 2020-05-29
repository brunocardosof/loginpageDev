import { Component, OnInit } from '@angular/core';
import { Usuario } from 'app/infra/models/Usuario';
import { AutenticacaoService } from 'app/infra/http/autenticacao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'app/infra/http/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  public registerForm: FormGroup
  public submitted: boolean = false
  public loading: boolean = false

  private usuario: Usuario

  constructor(
    private formBuilder: FormBuilder,
    private autenticacaoService: AutenticacaoService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuario = new Usuario()
    this.createForm()

  }

  get f() { return this.registerForm.controls; }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      id: [this.autenticacaoService.currentUserValue.id],
      nome: [this.autenticacaoService.currentUserValue.nome, [Validators.required]],
      telefone: [this.autenticacaoService.currentUserValue.telefone],

    })
  }

  updateBtnClick(){
    this.loading = true
    this.usuario = this.registerForm.value
    this.usuarioService.update(this.usuario.id,this.usuario).subscribe(
      usuario => {
        this.loading = false
        if(usuario){          
          localStorage.setItem('currentUser', JSON.stringify(usuario));
          this.autenticacaoService.currentUserSubject.next(usuario);
          Swal.fire({
            icon: 'success',
            title: 'Cadastro atualizado com sucesso!',
          })
        } else {          
          Swal.fire({
            icon: 'error',
            title: 'Erro ao realizar a atualização, tente novamente mais tarde!',
          })
        }
      },
      error => {
        this.loading = false        
        Swal.fire({
          icon: 'error',
          title: 'Erro ao realizar a atualização, tente novamente mais tarde!',
        })
        console.log(error)
      })
  }

}
