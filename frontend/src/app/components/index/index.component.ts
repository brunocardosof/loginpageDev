import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../app/infra/service/authentication.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  public usuario: any

  constructor(
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
    this.usuario = this.authenticationService.currentUserValue  
  }

}
