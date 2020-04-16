import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario, Cotizable } from '@/_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CatalogoService {
    
    constructor(private http: HttpClient) { }

    get(id: number): Observable<Cotizable> {
        return this.http.get<Cotizable>(`${config.apiUrl}/catalogo/${id}`);
    }

    getAll() {
        return this.http.get<Cotizable[]>(`${config.apiUrl}/catalogo`);
    }
    getAllbyUsuario(idUsuario) {
        return this.http.get<Cotizable[]>(`${config.apiUrl}/catalogo/buscarporusuario/${idUsuario}`);
    }

    register(cotizable: Cotizable) {
        return this.http.post(`${config.apiUrl}/catalogo/registrar`, cotizable);
    }

    search(frase: string): Observable<Cotizable[]> {
        return this.http.get<Cotizable[]>(`${config.apiUrl}/catalogo/buscar?=${frase}`);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/catalogo/${id}`);
    }
}