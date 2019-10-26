import { Component, OnInit, ChangeDetectorRef } from "@angular/core"
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'

import Swal from 'sweetalert2'

import { Page } from '../../../app/infra/models/Page'
import { Usuario } from '../../../app/infra/models/usuario'
import { UsuarioService } from "../../../app/infra/service/usuario.service"
import { AuthenticationService } from '../../../app/infra/service/authentication.service'

declare var $: any

@Component({
  selector: "app-principal",
  templateUrl: "./principal.component.html",
  styleUrls: ["./principal.component.css"]
})
export class PrincipalComponent implements OnInit {

  public dtOptions: DataTables.Settings = {}
  public loadingUsuario: boolean = false
  public post: boolean = false
  public submitted: Boolean = false
  public usuarioObj: Usuario
  public registerForm: FormGroup

  private tableWidget: any

  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
    ) {}

  ngOnInit() {
    this.loadTable()
    this.createForm()
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 1
    }
  }
  get f() { return this.registerForm.controls }

  logout(){
    this.authenticationService.logout()
  }

  loadTable(): void {
    this.usuarioService.getAll().subscribe(usuarios => {
      this.usuarioObj = usuarios.data
      this.cdr.detectChanges()
      this.tableWidget = $('#tableListUsuario').DataTable()
    })
  }

  reInitDatatable(): void {
    if (this.tableWidget) {
      this.tableWidget.destroy()
      this.tableWidget = null
    }
    setTimeout(() => this.loadTable(), 0)
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      id: new FormControl(""),
      email: new FormControl("", [Validators.required, Validators.email]),
      nome: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      password_hash: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required]),
    })
  }

  openModalInsert(){
    this.post = true
    this.createForm()
    $('.modalUsuario').modal('show')
  }

  openModalUpdate(usuario){
    this.post = false
    this.registerForm.get('id').setValue(usuario.id)
    this.registerForm.get('nome').setValue(usuario.nome)
    this.registerForm.get('email').setValue(usuario.email)
    $('.modalUsuario').modal('show')
  }

  closeCleanModal() {
    $('.modalUsuario').modal('hide')   
    this.createForm() 
    this.submitted = false
  }  
  
  finishService() {
    this.reInitDatatable()
    this.closeCleanModal()
    this.createForm()
    this.submitted = false
  }

  insert(){
    this.submitted = true
    const usuario = this.registerForm.value
    const password = this.registerForm.get('password_hash').value
    const confirmPassword = this.registerForm.get('confirmPassword').value

    if (this.registerForm.invalid) {
      return
    }

    if(password !== confirmPassword) {
      Swal.fire({
        type: 'error',
        title: 'Senhas não conferem!',
        showConfirmButton: false,
        timer: 2000
      })
      return
    }

    this.usuarioService.insert(usuario).subscribe(data =>{
      if (data) {
        Swal.fire({
          type: 'success',
          title: 'Cadastro realizado com sucesso!',
          showConfirmButton: false,
          timer: 2000,
          onClose: () => this.finishService()
        })
      } else {
        Swal.fire({
          type: 'error',
          title: 'Erro ao realizar cadastro!',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }

  update(){
    this.submitted = true
    const id = this.registerForm.get('id').value
    const usuario = this.registerForm.value
    const password = this.registerForm.get('password_hash').value
    const confirmPassword = this.registerForm.get('confirmPassword').value

    if (this.registerForm.invalid) {
      return
    }

    if(password !== confirmPassword) {
      Swal.fire({
        type: 'error',
        title: 'Senhas não conferem!',
        showConfirmButton: false,
        timer: 2000
      })
      return
    }

    this.usuarioService.update(id,usuario).subscribe(data =>{
      if (data) {
        console.log(usuario)
        console.log(this.registerForm)
        Swal.fire({
          type: 'success',
          title: 'Cadastro atualizado com sucesso!',
          showConfirmButton: false,
          timer: 2000,
          onClose: () => this.finishService()
        })
      } else {
        Swal.fire({
          type: 'error',
          title: 'Erro ao atualizar cadastro!',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }



  delete(usuarioId, usuarioNome) {
    Swal.fire({
      title: `Tem certeza que deseja deletar o usuario ${usuarioNome}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#61b765',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.delete(usuarioId).subscribe(usuario => {
          if (usuario.data) {
            Swal.fire({
              type: 'success',
              title: 'Usuario deletado!',
              showConfirmButton: false,
              timer: 2000,
              onClose: () => this.finishService()
            })
          } else {
            Swal.fire({
              type: 'error',
              title: `Erro ao deletar o usuario ${usuarioNome}?`,
              showConfirmButton: false,
              timer: 2000
            })
          }
        })
      }
    })
  }

}
