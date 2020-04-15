import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let cotizables = JSON.parse(localStorage.getItem('bienes')) || [];
let cotizaciones = JSON.parse(localStorage.getItem('cotizaciones')) || [];
let solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/usuarios/autenticar') && method === 'POST':
                    return authenticate();
                case url.endsWith('/usuarios/registrar') && method === 'POST':
                    return register();
                case url.endsWith('/usuarios') && method === 'GET':
                    return getUsers();
                case url.match(/\/usuarios\/\d+$/) && method === 'DELETE':
                    return deleteUser();

                //catalogo
                //--------------------------------------------------------
                case url.endsWith('/catalogo/registrar') && method === 'POST':
                    return registrarCotizable();
                case url.endsWith('/catalogo') && method === 'GET':
                    return getCatalogo();
                case url.match(/\/catalogo\/\d+$/) && method === 'DELETE':
                    return deleteCotizable();
                case url.match(/\/catalogo\/\d+$/) && method === 'GET':
                    return getCotizable();
                case url.match(/\/catalogo\/buscar\?=\w+$/) && method === 'GET':
                    return getCatalogo();

                //solicitudes
                case url.endsWith('/solicitudes-cotizacion/registrar') && method === 'POST':
                    return registrarSolicitud();
					   case url.endsWith('/responder') && method === 'POST':
                    return responderSolicitud();												 
												
                case url.endsWith('/solicitudes-cotizacion') && method === 'GET':
                    return getSolicitudes();
                case url.match(/\/solicitudes-cotizacion\/\d+$/) && method === 'DELETE':
                    return deleteSolicitud();
                case url.match(/\/solicitudes-cotizacion\/\d+$/) && method === 'GET':
                        return getSolicitud();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { email, password } = body;
            const user = users.find(x => x.email === email && x.password === password);
            if (!user) return error('El correo electrónico o la contraseña son incorrectos');
            return ok({
                id: user.id,
                tipo: user.tipo,
                celular: user.celular,
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body
            console.log(user)
            if (users.find(x => x.email === user.email)) {
                return error('El correo electrónico "' + user.email + '" ya esta registrado')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl(1));
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        //-----------------------------------------------------------------
        // catalogo
        function registrarCotizable() {
            const cotizable = body

            if (cotizables.find(x => x.codigo === cotizable.codigo)) {
                return error('Ya exite un Cotizable con el codigo "' + cotizable.codigo + '"')
            }

            cotizable.id = cotizables.length ? Math.max(...cotizables.map(x => x.id)) + 1 : 1;
            cotizables.push(cotizable);
            localStorage.setItem('catalogo', JSON.stringify(cotizables));

            return ok();
        }

        function getCotizable() {
            if (!isLoggedIn()) return unauthorized();
            return ok({
                id: 0,
                tipo: 'Bien',
                titulo: 'Mock Titulo',
                descripcion: 'Mock Descripción',
                codigo: 'Mock0001',
                imagen: 'No'
            });
        }

        function getCatalogo() {
            if (!isLoggedIn()) return unauthorized();
            return ok(cotizables);
        }

        function deleteCotizable() {
            if (!isLoggedIn()) return unauthorized();

            cotizables = cotizables.filter(x => x.id !== idFromUrl(1));
            localStorage.setItem('catalogo', JSON.stringify(cotizables));
            return ok();
        }

        //-----------------------------------------------------------------
        // Solicitudes
        function registrarSolicitud() {
            const solicitud = body
            solicitud.fechaCreacion = new Date();
            solicitud.id = solicitudes.length ? Math.max(...solicitudes.map(x => x.id)) + 1 : 1;
            solicitudes.push(solicitud);
            localStorage.setItem('solicitudes', JSON.stringify(solicitudes));

            return ok();
		 }

        function responderSolicitud(){
            if (!isLoggedIn()) return unauthorized();

            const cotizacion = body
            let _idFromUrl = idFromUrl(2)
            let lsolicitud = solicitudes.filter(x => x.id === _idFromUrl);

            if(lsolicitud.length > 0){
                let solicitud = lsolicitud[0]
                let cotizaciones = solicitud.cotizaciones || []
                cotizaciones.push(cotizacion)
                solicitud.cotizaciones = cotizaciones

                solicitudes = solicitudes.filter(x => x.id !== idFromUrl(1));
                solicitudes.push(solicitud)
                localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
            }
            

            return ok();
 
        }

        function getSolicitudes() {
            if (!isLoggedIn()) return unauthorized();
            return ok(solicitudes);
        }

        function deleteSolicitud() {
            if (!isLoggedIn()) return unauthorized();

            solicitudes = solicitudes.filter(x => x.id !== idFromUrl(1));
            localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
            return ok();
        }

        function getSolicitud() {
            if (!isLoggedIn()) return unauthorized();

            let solicitud = solicitudes.filter(x => x.id === idFromUrl(1));
            return ok(solicitud[0]);
        }
        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl(index) {
           const urlParts = url.split('/');
            let last = urlParts[urlParts.length - index]
            return parseInt(last);			  
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};