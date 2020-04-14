import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegistrarUsuarioComponent } from './registrar-usuario';
import { AlertComponent } from './_components/alert';

//Bien
import { CatalogoComponent } from './catalogo';
import { CotizableComponent } from './_components/cotizable'
import { GestionarCotizableComponent } from './gestionar-cotizable';
import { BuscarCotizablesComponent } from './buscar-cotizable';

//Cotizacion
import { CotizacionComponent } from './_components/cotizacion';

//SolicitudCotizacion
import { SolicitudCotizacionComponent } from './_components/solicitud-cotizacion';
import { MisSolicitudesComponent } from './solicitudes';
import { GestionarSolicitudCotizacionComponent } from './gestionar-solicitud-cotizacion';
import { FooterComponent } from './_components/footer/footer.component';




@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegistrarUsuarioComponent,
        AlertComponent,
        FooterComponent,

        // COmponentes propios de la aplicación (dominio)
        //Bien
        CotizableComponent,
        CatalogoComponent,
        GestionarCotizableComponent,
        BuscarCotizablesComponent,

        //Cotizacion
        CotizacionComponent,

        //SolicitudCotizacion
        SolicitudCotizacionComponent,
        MisSolicitudesComponent,
        GestionarSolicitudCotizacionComponent


    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };