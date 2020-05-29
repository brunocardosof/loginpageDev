import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';
import { Password } from "../interface/Password";
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  getByToken(token): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.urlApi}usuario/${token}`)
  }

  update(id, usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${environment.urlApi}usuario/${id}`,usuario)
  }

  changePassword(id, password): Observable<Password> {
    return this.http.put<Password>(`${environment.urlApi}usuario/changePassword/${id}`,password)
  }
}
