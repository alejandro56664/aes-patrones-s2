import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService, CatalogoService, SolicitudCotizacionService } from '@/_services';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cotizable, Usuario, Cotizacion, SolicitudCotizacion } from '@/_models';

@Component({ selector: 'buscar-cotizables', templateUrl: 'buscar-cotizables.component.html' })
export class BuscarCotizablesComponent implements OnInit {
    @Input()
    currentUser: Usuario;
    buscarForm: FormGroup;
    loading = false;
    submitted = false;

    resultados: Cotizable[] = [];
    terminosDeBusqueda: string;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private solicitudCotizacionService: SolicitudCotizacionService,
        private catalogoService: CatalogoService,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {
       this.buscarForm = this.formBuilder.group({
        terminosDeBusqueda: ['', Validators.required]})
    }

    // convenience getter for easy access to form fields
    get f() { return this.buscarForm.controls; }


    onSubmit() {
        console.log('dio click en buscar')
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        this.loading = true;
        this.catalogoService.search(this.buscarForm.value.terminosDeBusqueda)
            .pipe(first())
            .subscribe(
                data => {
                    this.resultados = data;
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    onCotizableClick(evento) {
        if(this.currentUser.id_tipo_usuario==='comprador'){
            this.loading = true;
            this.solicitudCotizacionService.register(this.currentUser.id, this.toSolicitudCotizacion(evento))
                .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigateByUrl(`/solicitud-cotizacion`);
                        this.loading = false;
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
           
        }
    }

    toSolicitudCotizacion(evento): SolicitudCotizacion {
        let solicitud = new SolicitudCotizacion();
        solicitud.cantidad = evento.cantidad
        solicitud.cotizable = evento.cotizable
        return solicitud;
    }
}