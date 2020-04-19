import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, switchMap } from 'rxjs/operators';

import { AlertService, CatalogoService, AuthenticationService } from '@/_services';
import { Cotizable, Usuario } from '@/_models'
import { Observable } from 'rxjs';

@Component({ selector: 'gestionar-cotizable', templateUrl: 'gestionar-cotizable.component.html' })
export class GestionarCotizableComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    modoOperacion: string;//modo registrar, modo gestionar
    currentUser: Usuario;
    cotizable$: Observable<Cotizable>;
    idCotizable: number;
    imagen: string;
    constructor(
        
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private catalogoService: CatalogoService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;

        // si solo vamos a crear un nuevo Bien
        let url = this.router.url
        if(url.endsWith('registrar')){
            this.registerForm = this.crearFormulario();
            this.modoOperacion = 'registrar'
        } else { //si vamos a gestionar: editar o eliminar
            this.modoOperacion = 'gestionar'
            this.cotizable$ = this.route.paramMap.pipe(
                switchMap((params: ParamMap) =>{
                    this.idCotizable = +params.get('idCotizable')
                    return this.catalogoService.get(this.idCotizable)
                })
            );
            this.cotizable$.subscribe(bien => {
                this.registerForm = this.crearFormulario(bien)
            })
        }
    }
    

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.catalogoService.register(this.currentUser.id, this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Su Bien/Servicio ha sido registrado exitosamente', true);
                    this.router.navigate(['/catalogo/'+this.currentUser ]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private crearFormulario(bien?: Cotizable) {
        if(!bien) bien = new Cotizable()
        return this.formBuilder.group({
            tipo: [bien.tipo || '', Validators.required],
            titulo: [bien.titulo || '', Validators.required],
            descripcion: [bien.descripcion || '', Validators.required],
            imagen: [bien.imagen || '', Validators.required],
            codigo: [bien.codigo || '', [Validators.required, Validators.minLength(6)]],
            id_usu_proveedor: this.currentUser.id
        });
    }

    onEliminarClick(){
        console.log('click en eliminar')
        this.loading = true;
        this.catalogoService.delete(this.currentUser.id, this.idCotizable)
                        .pipe(first())
                        .subscribe(
                            data => {
                                this.alertService.success('El Bien/Servicio ha sido eliminado exitosamente', true);
                                this.router.navigate(['/catalogo/buscarporusuario/'+this.currentUser ]);
                            },
                            error => {
                                this.alertService.error(error);
                                this.loading = false;
                            });
    }

}