import { Component, OnInit, Input } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SolicitudCotizacionService, AuthenticationService } from '@/_services';
import { SolicitudCotizacion, Usuario, Cotizacion } from '@/_models';
import { Observable } from 'rxjs';

@Component({ selector: 'gestionar-solicitud-cotizacion', templateUrl: 'gestionar-solicitud-cotizacion.component.html' })
export class GestionarSolicitudCotizacionComponent implements OnInit {
    //TODO: debe permitir ver la lista de cotizaciones, si es comprador
    //deber permitir crear la cotización, si es proveedor

    currentUser: Usuario;
    solicitud: SolicitudCotizacion;
    idSolicitud: number;

    //para la grafica
    proveedores: string[] = [];
    ofertas: number[] = [];

    //para la lista
    limiteParaMostrar = 5;
    cotizacionesParaMostrar: Cotizacion[] = [];

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
                return this.solicitudCotizacionServicio.get(this.currentUser._id, this.idSolicitud)
            })
        ).subscribe(s =>{
            this.solicitud = s
            this.solicitud.cotizaciones = s.cotizaciones || []
            //esta tarea se puede quitar y hacerlo desde el backend
            this.ordenarCotizaciones()
            this.obtenerDatosGrafica()
        })
    }

    clickCotizacion(){
        
    }

    //se ordenan de menor a mayor precio
    private ordenarCotizaciones(){
        this.solicitud.cotizaciones.sort((a, b) =>  a.precio - b.precio)
    }

    private obtenerDatosGrafica(){
        const limiteGrafica = 3;
        let contador = 0;
        for (const cotizacion of this.solicitud.cotizaciones) {
           
            contador++;
            if(contador < limiteGrafica){
                this.proveedores.push(cotizacion.nombreProveedor);
                this.ofertas.push(cotizacion.precio)
            }
            if(contador < this.limiteParaMostrar){
                this.cotizacionesParaMostrar.push(cotizacion)
            } else {
                break;
            }
        }
    }
}