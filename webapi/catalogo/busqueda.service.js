const catalogoService = require('./catalogo.service');
const cotizableService = require('./cotizable.service');
const broadcast = require('../_helpers/broadcast');

module.exports = {
   search
};

async function search(terms) {

    //Broadcast Gather-Scatter
    //buscamos catalogos externos,
    //por cada catalogo externo hacemos la busqueda
    //recopilamos la respuestas y las mostramos

    //busqueda interna
    let resultadosInternos =  cotizableService.search(terms);

    //busquda externa, catalogos externos
    let catalogosExternos = await catalogoService.externals();

    //obtenemos las url
    let urls = catalogosExternos.map(catalogo => `${catalogo.url_cotizar}/${terms}`)

    //aquí se aplica el gather-scatter, haciendo el broadcast
    let resultadosExternos = broadcast.runGet(urls)
    
    //por cada catalogo externo hacemos la busqueda
    //recopilamos la respuestas y las mostramos

    //mezclamos los resultados
    return merge(resultadosInternos, resultadosExternos)
    
}


async function merge(listaA, listaB) {
    //listaA y listaB son promesas
    //en este punto se podría tener un mejor criterio para hacer la mezcla, como ordenar por relevancia
    let result = [...await listaA, ...await listaB];
    console.log('merge: ', result);
    return result;
}

