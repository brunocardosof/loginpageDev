import { Component, OnInit } from '@angular/core';
import { Usuario } from 'app/infra/models/Usuario';
import { AutenticacaoService } from 'app/infra/http/autenticacao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  public registerForm: FormGroup
  public submitted: boolean = false
  public loading: boolean = false

  private currentUser: Usuario

  constructor(
    private formBuilder: FormBuilder,
    private autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.autenticacaoService.currentUserValue
    this.createForm()
  }

  get f() { return this.registerForm.controls; }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      nome: [this.currentUser.nome, [Validators.required]],
      telefone: [this.currentUser.telefone],

    })
  }

  updateBtnClick(){
    console.log(this.registerForm.value)
  }

}
