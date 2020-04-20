import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Usuario[]>(`${config.apiUrl}/usuarios`);
    }

    register(user: Usuario) {
        console.log(user)
        return this.http.post(`${config.apiUrl}/usuarios/registrar`, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/usuarios/${id}`);
    }
}