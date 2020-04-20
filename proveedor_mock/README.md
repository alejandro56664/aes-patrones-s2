# Proveedor Mock

Este proyecto sirve de ejemplo del funcionamiento de un proveedor externo a la aplicación

## Modelo Canonico

Servicios que debe exponer el proveedor

Si los servicios no responden en 20 segundos, se da por perdido el mensaje y no hay reintentos.

- Servicio de busqueda de catalogo: REST - GET. header [ accept: application/json, content-type: application/json]

Request:
se envirá la consulta por
http://localhost:5005/busqueda/terminos%20de%20busqueda
Response:
HTTP 200
[{
		tipo: 'Bien',
    titulo: 'ProductoInterno',
    descripcion: 'telefono iphone',
    imagen: 'https://cdn.arstechnica.net/wp-content/uploads/2019/09/iPhone-11-notch-hand-800x472.jpg',
    codigo: 'c0000012',
    idCatalogo: '5e9cffcd71108c574026bc7f',
    fecha_creacion: 2020-04-20T01:52:22.668Z,
    fecha_modificacion: 2020-04-20T01:52:22.668Z,
    score: 0.75
}]

- Servicio de solicitud de cotizacion: REST
POST http://localhost:5004/solicitud/cotizacion
header [ accept: application/json, content-type: application/json]
Request:
{
	"idSolicitudCotizacion": "0123"
	"codigo": "xxxx",
	"expiracion": "60"
}

Response:
HTTP 200:

## Configuración asincrona

Servicio que expone el sistema S2 para recibir las cotizaciones:

POST http://localhost:5003/recolector/cotizacion

Request  
{ 
	"idSolicitudCotizacion": "0123",
	"codProducto": 
	"codProveedor": "xxx",
	"precio": ""
}

Response
HTTP 200
