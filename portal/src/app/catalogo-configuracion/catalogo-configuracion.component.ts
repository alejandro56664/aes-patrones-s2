import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, switchMap } from 'rxjs/operators';

import { AlertService, CatalogoService, AuthenticationService } from '@/_services';
import { Usuario, ConfiguracionCatalogo } from '@/_models'
import { Observable } from 'rxjs';

@Component({ selector: 'catalogo-configuracion', templateUrl: 'catalogo-configuracion.component.html' })
export class CatalogoConfiguracionComponent implements OnInit {
    configuracionForm: FormGroup;
    loading = false;
    submitted = false;
    currentUser: Usuario;

    configuracion: ConfiguracionCatalogo;

    constructor(
        
        private formBuilder: FormBuilder,
        private router: Router,
        private catalogoService: CatalogoService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService
    ) {
        this.configuracion = this.router.getCurrentNavigation().extras.state.configuracion;
        console.log('configuracion enviada desde catalogo.componente', this.configuracion)
    }

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;
        this.configuracionForm = this.crearFormulario(this.configuracion);
    }
    

    // convenience getter for easy access to form fields
    get f() { return this.configuracionForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.configuracionForm.invalid) {
            return;
        }

        this.loading = true;
        this.catalogoService.configure(this.currentUser.id, this.configuracionForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('La configuración de su catálogo ha sido actualizada exitosamente', true);
                    this.router.navigate(['/catalogo/'+this.currentUser ]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private crearFormulario(configuracion: ConfiguracionCatalogo) {
        return this.formBuilder.group({
            tipo: [configuracion.tipo, Validators.required],
            url_buscar: [configuracion.url_buscar || ''],
            url_cotizar: [configuracion.url_cotizar || ''],
            idProveedor: this.currentUser.id
        });
    }
}