import { Component, OnInit, OnDestroy } from '@angular/core';

import { CatalogoService, AuthenticationService } from '@/_services';
import { Usuario, Cotizable } from '@/_models';
import { Router } from '@angular/router';

@Component({ selector: 'catalogo', templateUrl: 'catalogo.component.html' })
export class CatalogoComponent implements OnInit {
    currentUser: Usuario;
    cotizables: Cotizable[] = [];
    constructor(
        private authenticationService: AuthenticationService,
        private catalogoService: CatalogoService,
        private router: Router
    ) { }

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;
        this.loadAllCotizables();
    }

    private loadAllCotizables() {
        this.catalogoService.getAll()
            .subscribe(cotizables => this.cotizables = cotizables);
    }

    onCotizableClick(evento) {
        if(this.currentUser.id_tipo_usuario==='proveedor'){
            this.router.navigateByUrl(`/catalogo/${evento.id}/gestionar`);
        }
    }
}