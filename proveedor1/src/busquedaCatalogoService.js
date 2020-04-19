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
                        body: '{ "codProveedor": "${row}[codProveedor]", "resultado":[ { "codProducto": "${row}[codProducto]", "descripcion": "${row}[descripcion]", "img": "${row}[image]" } ] }'
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
                                    "keyColumn": "codProveedor"
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