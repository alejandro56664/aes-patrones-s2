import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegistrarUsuarioComponent } from './registrar-usuario';
import { AuthGuard } from './_helpers';

//componentes de dominio
import { CatalogoComponent } from './catalogo';
import { GestionarCotizableComponent } from './gestionar-cotizable';
import { MisSolicitudesComponent } from './solicitudes';
//import { BuscarCotizablesComponent } from './buscar-cotizable';
import { GestionarSolicitudCotizacionComponent } from './gestionar-solicitud-cotizacion';


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },

    //proveedores
    { path: 'catalogo', component: CatalogoComponent, canActivate: [AuthGuard]},
    { path: 'catalogo/buscarporusuario', component: CatalogoComponent, canActivate: [AuthGuard]},
    { path: 'catalogo/registrar', component: GestionarCotizableComponent, canActivate: [AuthGuard]},
    { path: 'catalogo/:idCotizable/gestionar', component: GestionarCotizableComponent, canActivate: [AuthGuard]},

    //común
    { path: 'solicitud-cotizacion', component: MisSolicitudesComponent, canActivate: [AuthGuard]},
     { path: 'solicitud-cotizacion', component: MisSolicitudesComponent, canActivate: [AuthGuard]},
    { path: 'solicitud-cotizacion/:idSolicitud/gestionar', component: GestionarSolicitudCotizacionComponent, canActivate: [AuthGuard]},

    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistrarUsuarioComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);