import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../environments/environment";

import { User } from '../models/User';
import { error } from 'protractor';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    reqUrl : string = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(user : User) {

        return this.http.post<any>(this.reqUrl+'/auth/login', {user})
            .pipe(map(users => {

      
                console.log("antes login: " +users);

                if (users) {
                    console.log("si hizo login: " +users);
                    // store user details in local storage to keep user logged in
                    localStorage.setItem('currentUser', JSON.stringify(users));
                    this.currentUserSubject.next(users);
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