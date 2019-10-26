import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
    ) { }

    getAll():Observable<any> {
      return this.http.get(`${environment.apiUrl}/api/usuario`);
    }
  
    insert(usuario):Observable<any> {
      return this.http.post<any>(`${environment.apiUrl}/api/usuario`,usuario);
    }
  
    update(id,usuario):Observable<any> {
      return this.http.put<any>(`${environment.apiUrl}/api/usuario/${id}`,usuario)
    }
  
    delete(id):Observable<any> {
      return this.http.delete<any>(`${environment.apiUrl}/api/usuario/${id}`)
    }
}
