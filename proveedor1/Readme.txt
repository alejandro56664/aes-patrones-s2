Modelo Canonico

Servicios que debe exponer el proveedor

Si los servicios no responden en 20 segundos, se da por perdido el mensaje y no hay reintentos.
- Servicio de busqueda de catalogo: REST - GET. header [ accept: application/json, content-type: application/json]

Request:
se envirá la consulta por querystring 
https://url_catalogo?q=" "
http://localhost:5005/busqueda/2
Response:
HTTP 200
{
	"codProveedor": "xxx",
	"resultado": [
		{
			"codProducto": "",
			"descripcion": "",
			"img": ""
		}	
	]
}

- Servicio de solicitud de cotizacion: REST - POST http://localhost:5004/solicitud/cotizacion . header [ accept: application/json, content-type: application/json]
Request:
{
	"idSolicitudCotizacion": "0123"
	"codProducto": "xxxx",
	"expiracion": "60"
}

Response:
HTTP 200:


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
