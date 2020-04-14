import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Cotizacion } from '@/_models';

@Component({ selector: 'cotizacion', templateUrl: 'cotizacion.component.html' })
export class CotizacionComponent {
    @Input() cotizacion: Cotizacion;
    @Output() cotizacionClicked: EventEmitter<any> = new EventEmitter();
    constructor() {
    }

    verDetalle() {
        console.log('Ver detalle cotización');
        this.cotizacionClicked.emit(this.cotizacion.id);
    }
}
