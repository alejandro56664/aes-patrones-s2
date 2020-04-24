const mbHelper = require('./mountebank-helper');
const settings = require('./settings');

function addService() {
    const response = { 
            idSolicitud: "",
            idProveedor: "5e9cffb671108c574026bc7e",
            precio: "50.5",
            nombreProveedor:  "Proveedor_Externo",
            fechaCreacion:  Date.now()
    }

    const stubs = [
        {
            predicates: [{
                and: [
                    { equals: { method: "POST" } },
                    { startsWith: { "path": "/solicitud/cotizacion/" } }
                ]
            }],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(response)
                    },
                    _behaviors: {
                        wait: 1500,
                        //"decorate": "(config) => { var pad = function (number) { return (number < 10) ? '0' + number : number.toString(); }, now = new Date(), time = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds()); config.response.body = config.response.body.replace('${TIME}', time); }"
                    }
                }
            ]
        }
    ];

    const imposter = {
        port: settings.solicitud_cotizacion_service_port,
        protocol: 'http',
        stubs: stubs
    };

    return mbHelper.postImposter(imposter);
}

module.exports = { addService };