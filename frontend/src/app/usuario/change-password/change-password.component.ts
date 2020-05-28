import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public registerForm: FormGroup
  public submitted: boolean = false
  public loading: boolean = false

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  get f() { return this.registerForm.controls; }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      senhaAtual: ['',[Validators.required]],
      senhaNova: ['',[Validators.required]],
      senhaConfirmar: ['',[Validators.required]],
    })
  }

  updateBtnClick(){
    console.log(this.registerForm.value)
  }

}
