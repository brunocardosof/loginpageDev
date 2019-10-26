import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/* import Swal from 'sweetalert2'; */

import { environment } from '../../../environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Usuario>;
    public currentUser: Observable<Usuario>;

    constructor(
        private http: HttpClient,
        private router: Router,
        ) {
        this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Usuario {
        return this.currentUserSubject.value;
    }

    login(email, password) {
        return this.http.post<any>(`${environment.apiUrl}/api/signin`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        window.location.reload();
        /* if (!this.currentUserValue) {
            Swal.fire({
                title: 'Redirecionando...',
                showConfirmButton: false,
                timer: 2500
            });
            window.location.reload();
        } */
    }
}