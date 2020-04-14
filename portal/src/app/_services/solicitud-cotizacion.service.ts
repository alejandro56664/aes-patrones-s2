import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SolicitudCotizacion, Cotizable, Cotizacion } from '@/_models';

@Injectable({ providedIn: 'root' })
export class SolicitudCotizacionService {
    constructor(private http: HttpClient) { }

    getAll(idUsuario: number) {
        return this.http.get<SolicitudCotizacion[]>(`${config.apiUrl}/usuario/${idUsuario}/solicitudes-cotizacion`);
    }

    get(idUsuario: number, idSolicitud: number){
        return this.http.get<SolicitudCotizacion>(`${config.apiUrl}/usuario/${idUsuario}/solicitudes-cotizacion/${idSolicitud}`);
    }

    register(idUsuario: number, solicitudCotizacion: SolicitudCotizacion) {
        return this.http.post(`${config.apiUrl}/usuario/${idUsuario}/solicitudes-cotizacion/registrar`, solicitudCotizacion);
    }

    respond(idUsuario: number, cotizacion: Cotizacion) {
        return this.http.post(`${config.apiUrl}/usuario/${idUsuario}/solicitudes-cotizacion/${cotizacion.idSolicitud}/responder`, cotizacion);
    }

    delete(idUsuario: number, idSolicitudCotizacion: number) {
        return this.http.delete(`${config.apiUrl}/usuario/${idUsuario}/solicitudes-cotizacion/${idSolicitudCotizacion}`);
    }
}