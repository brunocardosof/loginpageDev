import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";
import { Usuario } from '../models/Usuario';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;


  constructor(
    private http: HttpClient,    
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  
  signin(usuario): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}autenticacao/signin`, usuario)
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  signinSocialUser(usuario): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}autenticacao/signinSocialUser`, usuario)
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  signup(usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.urlApi}autenticacao/signup`,usuario)
  }
  
  logout(isSocialUser) {
    localStorage.removeItem('currentUser')
    if (isSocialUser) {
      this.authService.signOut(true)
    }
    this.router.navigate(['/autenticacao'])
  }
}
