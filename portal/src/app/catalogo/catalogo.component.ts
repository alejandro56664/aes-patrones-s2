import { Component, OnInit, OnDestroy } from '@angular/core';

import { CatalogoService, AuthenticationService, AlertService } from '@/_services';
import { Usuario, Cotizable, ConfiguracionCatalogo } from '@/_models';
import { Router } from '@angular/router';

@Component({ selector: 'catalogo', templateUrl: 'catalogo.component.html' })
export class CatalogoComponent implements OnInit {
    currentUser: Usuario;
    cotizables: Cotizable[] = [];
    configuracion: ConfiguracionCatalogo;
    constructor(
        private authenticationService: AuthenticationService,
        private catalogoService: CatalogoService,
        private alertService: AlertService,
        private router: Router
    ) { }

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;
        this.loadConfig(this.currentUser.id);
    }

    private loadConfig(idUsuario) {
        this.catalogoService.getConfig(idUsuario)
            .subscribe(configuracion => {
                this.configuracion = configuracion;
                console.log('configuracion en Mi Catalogo', this.configuracion)
                if(this.configuracion.tipo == 'interno') {
                    this.loadAllCotizable(idUsuario)
                } else {
                    this.alertService.info('Tienes actualmente configurado un catálogo externo');
                }
            });
    }

    private loadAllCotizable(idUsuario) {
        this.catalogoService.getAll(idUsuario)
            .subscribe(cotizables => this.cotizables = cotizables);
    }

    onCotizableClick(evento) {
        if(this.currentUser.tipo==='proveedor'){
            this.router.navigateByUrl(`/catalogo/${evento.id}/gestionar`);
        }
    }

    onConfigurarClick(){
        if(this.currentUser.tipo==='proveedor'){
            this.router.navigate(['catalogo','configurar'], { state: { configuracion: this.configuracion } });
        }
    }

    onAnadirClick(){
        if(this.currentUser.tipo==='proveedor'){
            if(this.configuracion.tipo === 'interno'){
                this.router.navigateByUrl(`/catalogo/registrar`);
            } else {
                this.alertService.error('Tienes actualmente configurado un catálogo externo. Para agregar elementos al catálogo debes configurarlo como interno');
            }
            
        }
    }
}