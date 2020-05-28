import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  public registerForm: FormGroup
  public loading: boolean = false
  public submitted: boolean = false

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  get f() { return this.registerForm.controls; }

  createForm():void {
    this.registerForm = this.formBuilder.group({
      emailAtual: ['',[Validators.email, Validators.required]],
      emailNovo: ['',[Validators.email, Validators.required]]
    })
  }

  updateBtnClick(){
    console.log(this.registerForm.value)
  }

}
