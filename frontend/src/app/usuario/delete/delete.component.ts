import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    Swal.fire({
      title: 'Tem certeza que deseja deletar o usuário?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim!'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          icon: 'success',
          title: 'Usuário deletado com sucesso(Não esta deletando ainda!!!!!)',
        })
        this.router.navigate(['autenticacao'])
      }
      if(result.dismiss) {
        this.router.navigate(['usuario/update'])
      }
    })
  }

}
