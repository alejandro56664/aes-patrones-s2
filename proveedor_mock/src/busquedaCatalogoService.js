const mbHelper = require('./mountebank-helper');
const settings = require('./settings');

function addService() {
    const stubs = [
        {
            predicates: [{
                and: [
                    { equals: { method: "GET" } },
                    { startsWith: { "path": "/busqueda/" } }
                ]
            }],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: '[{ "externo": "${row}[externo]", "tipo": "${row}[tipo]", "idCatalogo": "${row}[idCatalogo]", "codigo": "${row}[codigo]", "descripcion": "${row}[descripcion]", "imagen": "${row}[imagen]", "fecha_modificacion": "${row}[fecha_modificacion]", "fecha_creacion": "${row}[fecha_creacion]", "titulo": "${row}[titulo]" } ]'
                    },
                    _behaviors: {
                        lookup: [
                            {
                                "key": {
                                  "from": "path",
                                  "using": { "method": "regex", "selector": "/busqueda/(.*)$" },
                                  "index": 1
                                },
                                "fromDataSource": {
                                  "csv": {
                                    "path": "app/data/catalogo.csv",
                                    "keyColumn": "descripcion"
                                  }
                                },
                                "into": "${row}"
                              }
                        ]
                    }
                }
            ]
        }
    ];

    const imposter = {
        port: settings.busqueda_service_port,
        protocol: 'http',
        stubs: stubs
    };

    return mbHelper.postImposter(imposter);
}

module.exports = { addService };