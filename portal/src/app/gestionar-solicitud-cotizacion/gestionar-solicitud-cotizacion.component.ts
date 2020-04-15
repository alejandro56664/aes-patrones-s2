import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SolicitudCotizacionService, AuthenticationService } from '@/_services';
import { SolicitudCotizacion, Usuario } from '@/_models';
import { Observable } from 'rxjs';

@Component({ selector: 'gestionar-solicitud-cotizacion', templateUrl: 'gestionar-solicitud-cotizacion.component.html' })
export class GestionarSolicitudCotizacionComponent implements OnInit {
    //TODO: debe permitir ver la lista de cotizaciones, si es comprador
    //deber permitir crear la cotización, si es proveedor

    currentUser: Usuario;
    solicitud: SolicitudCotizacion;
    idSolicitud: number;

    constructor(
        private route: ActivatedRoute,
        private solicitudCotizacionServicio: SolicitudCotizacionService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.idSolicitud = +params.get('idSolicitud')
                return this.solicitudCotizacionServicio.get(this.currentUser.id, this.idSolicitud)
            })
        ).subscribe(s => this.solicitud = s)
    }
    clickCotizacion(evento) {

    }



}