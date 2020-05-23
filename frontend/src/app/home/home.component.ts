import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'app/infra/http/autenticacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.autenticacaoService.currentUserValue === null) {
      this.router.navigate(['/autenticacao'])
    }
  }

}
