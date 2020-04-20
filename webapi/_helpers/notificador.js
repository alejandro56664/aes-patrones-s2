const axios = require('axios');

module.exports = {
  notificarComprador,
  notificarProveedor
};

const host_notificador = "http://localhost:2020/api/v1/notificacion/enviar"
const host_portal = "http://localhost:8080"
/*
Plantilla predefinidas
{
	"celularUsuario": "3183852172",
	"nombrePlantilla": "prueba_producto",
	"parametros": "param1|param2"
}

*/

async function notificarComprador(comprador, idSolicitud) {
  try {
    await axios.post(host_notificador, {
            celularUsuario: comprador.celular,
            nombrePlantilla: "prueba_solicitud",
            parametros: `${idSolicitud}|${host_portal}`
          })
  } catch (error) {
    console.log(error.response.body);
  }
}

async function notificarProveedor(proveedor, idSolicitud) {
  try {
    await axios.post(host_notificador, {
      celularUsuario: proveedor.celular,
      nombrePlantilla: "prueba_producto",
      parametros: `${idSolicitud}|${host_portal}`
    })

  } catch (error) {
    console.log(error.response.body);
  }
}
