import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Cotizacion, Usuario, Cotizable } from '@/_models';
import { AuthenticationService, SolicitudCotizacionService, AlertService } from '@/_services';
import { first } from 'rxjs/operators';

@Component({ selector: 'crear-cotizacion', templateUrl: 'crear-cotizacion.component.html' })
export class CrearCotizacionComponent {

    @Input()
    idSolicitud: number;

    currentUser: Usuario;
    precio: number;
    loading = false;

    constructor(
        private authenticationService: AuthenticationService,
        private solicitudCotizacion: SolicitudCotizacionService,
        private alertService: AlertService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    private crearCotizacion(): Cotizacion {
        let cotizacion = new Cotizacion();

        cotizacion.idSolicitud = this.idSolicitud;
        cotizacion.idProveedor = this.currentUser._id;
        cotizacion.nombreProveedor = this.currentUser.nombre;
        cotizacion.precio = this.precio;
        cotizacion.fechaCreacion = new Date();
        return cotizacion;
    }

    onPrecioChange(event){
        this.precio = event.target.value;
    }

    onEnviarClicked(){
        this.loading = true;
        let cotizacion = this.crearCotizacion();
        console.log(cotizacion)
        //enviar al servicio para crear la cotización
        this.solicitudCotizacion.respond(this.currentUser._id, cotizacion)
            .pipe(first())
            .subscribe(
                data => {
                    //alert
                    this.alertService.success('La cotización fue enviada')
                    this.loading = false;
                },
                error => {
                    console.log(error)
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
