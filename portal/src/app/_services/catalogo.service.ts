import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario, Cotizable } from '@/_models';
import { Observable } from 'rxjs';
import { ConfiguracionCatalogo } from '@/_models/catalogo-configuracion';

@Injectable({ providedIn: 'root' })
export class CatalogoService {
    
    constructor(private http: HttpClient) { }


    update(id: number, cotizable: Cotizable) {
        return this.http.post(`${config.apiUrl}/catalogo/item/${id}`, cotizable);
    }

    get(id: number): Observable<Cotizable> {
        return this.http.get<Cotizable>(`${config.apiUrl}/catalogo/item/${id}`);
    }


    getAll(idCatalogo: number) {
        return this.http.get<Cotizable[]>(`${config.apiUrl}/catalogo/${idCatalogo}`);
    }

    register(idCatalogo: number, cotizable: Cotizable) {
        return this.http.post(`${config.apiUrl}/catalogo/${idCatalogo}/registrar`, cotizable);
    }


    configure(idCatalogo: number, configuracion: ConfiguracionCatalogo) {
        return this.http.post(`${config.apiUrl}/catalogo/${idCatalogo}/configuracion`, configuracion);
    }

    getConfig(idCatalogo: number) {
        return this.http.get<ConfiguracionCatalogo>(`${config.apiUrl}/catalogo/${idCatalogo}/configuracion`);
    }

    search(frase: string): Observable<Cotizable[]> {
        return this.http.get<Cotizable[]>(`${config.apiUrl}/catalogo/buscar?q=${frase}`);
    }

    delete( id: number) {
        return this.http.delete(`${config.apiUrl}/catalogo/item/${id}`);
    }
}