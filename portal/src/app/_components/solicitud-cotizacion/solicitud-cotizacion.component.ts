import { Component, Input, EventEmitter, Output } from '@angular/core';
import { SolicitudCotizacion } from '@/_models';

@Component({ selector: 'solicitud-cotizacion', templateUrl: 'solicitud-cotizacion.component.html' })
export class SolicitudCotizacionComponent {
    @Input() solicitud: SolicitudCotizacion;
    @Output() solicitudClicked: EventEmitter<any> = new EventEmitter();
    constructor() {
    }

    verDetalle() {
        console.log('Ver detalle Solicitud Cotización');
        this.solicitudClicked.emit(this.solicitud.id);
    }
}
