import { Component, OnInit, OnDestroy } from '@angular/core';

import { CatalogoService, AuthenticationService, SolicitudCotizacionService } from '@/_services';
import { Cotizable, Usuario, SolicitudCotizacion } from '@/_models';
import { Router } from '@angular/router';

@Component({ selector: 'mis-solicitudes', templateUrl: 'solicitudes.component.html' })
export class MisSolicitudesComponent implements OnInit {
    currentUser: Usuario;
    
    solicitudes: SolicitudCotizacion[] = [];
    solicitud: SolicitudCotizacion;
    
    constructor(
        private authenticationService: AuthenticationService,
        private solicitudCotizacionService: SolicitudCotizacionService,
        private router: Router
    ) { }

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;
        this.traerMisSolicitudesDeCotizacion(this.currentUser._id);
    }

    
    private traerMisSolicitudesDeCotizacion(idUsuario: number) {
        this.solicitudCotizacionService.getAll(idUsuario)
            .subscribe(solicitudes => this.solicitudes = solicitudes);
    }

    clickSolicitudCotizacion(id: number) {
        console.log('MisSolicitudesComponent: ', id)
        this.router.navigate(['solicitud-cotizacion','gestionar'], { state: { idSolicitud: id } });
        
      }

}