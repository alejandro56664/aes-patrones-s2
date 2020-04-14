import { Component, Input, EventEmitter, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Cotizable } from '@/_models';
import { NgModel } from '@angular/forms';

@Component({ 
    selector: 'cotizable', 
    templateUrl: 'cotizable.component.html'})
export class CotizableComponent implements OnInit {
    @Input() cotizable: Cotizable;
    @Input() tipoUsuario: string;
    @Output() cotizableClicked: EventEmitter<any> = new EventEmitter();


    cantidad: number;

    constructor() {
    }

    ngOnInit(): void {
    }

    cotizableClickedEmit() {
        
        console.log('la cantidad es: '+ this.cantidad)
        this.cotizableClicked.emit({
            id: this.cotizable.id,
            cotizable: this.cotizable,
            cantidad: this.cantidad
        });
    }

    onCantidadChange(event){
        this.cantidad = event.target.value;
    }
}
