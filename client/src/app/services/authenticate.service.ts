import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../environments/environment";

import { User } from '../models/User';
import { error } from 'protractor';
import { UsersService } from './users.service';
import { JsonPipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public usuario: User;
    reqUrl: string = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    public getCurrentUser(): Observable<any> {
        return this.currentUser;
    }

    login(user: User) : Observable<any>  {

        return this.http.post<any>(this.reqUrl + '/auth/login', user)
            .pipe(map(users => {


                console.log("antes login: " + users);

                if (users) {
                    
                    // store user details in local storage to keep user logged in
                    localStorage.setItem('currentUser', JSON.stringify(users));
                    localStorage.setItem('idUsuario', JSON.stringify(users[0].id));
                    localStorage.setItem('id_tipo_usuario', JSON.stringify(users[0].id_tipo_usuario));                 
                    this.usuario = JSON.parse(JSON.stringify(user));
                    this.currentUserSubject.next(user);

                }

                return user;
            }));
    }


    logout() {
        // remove user data from local storage for log out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}