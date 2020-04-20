const db = require('_helpers/db');
const broadcast = require('../_helpers/broadcast');
const notificador = require('../_helpers/notificador');
const catalogoService = require('./catalogo.service');
const userService = require('./usuario.service');

const RFQ = db.RFQ;
const Cotizacion = db.Cotizacion;

module.exports = {
    getAll,
    getById,
    register,
    respond,
    delete: _delete
};

async function getAll(idUsuario) {
    //traemos todas las rfq que creo un usuario (comprador)
    return await RFQ.find({idUsuario: idUsuario}).select();
}

async function register(idUsuario, rfqParam) {
    const rfq = new RFQ(rfqParam);
    //TODO: agregar idUsuario
    rfq.idUsuario = idUsuario
    await rfq.save();

    rfqParam.idSolicitud = rfq._id

    //hacemos el scatter and gather a los proveedores
    await scatterngather(rfqParam);
}


async function respond(idUsuario, cotizacionParam) {
    //creamos una nueva Cotización
    let cotizacion = new Cotizacion(cotizacionParam);
    //TODO agregar idUsuario
    cotizacion.idProveedor = idUsuario;
    await cotizacion.save();

    //buscar comprador
    let comprador = await buscarComprador(cotizacionParam.idSolicitud)

    await notificador.notificarComprador(comprador, cotizacionParam.idSolicitud)

}

async function getById(idUsuario, id) {
    //aqui debemos traer la rfq
    //mas las cotizaciones mejores cotizaciones asociadas. 

    let rfq = await RFQ.findOne({ _id: id })
    
    let cotizaciones = await Cotizacion.find({idSolicitud: id}).select();

    //Content-enrichment
    rfq.cotizaciones = cotizaciones;

    return rfq;
}

async function _delete(id) {
    return await RFQ.findOneAndRemove({ _id: id });
}


async function scatterngather(rfq) {

    //buscamos proveedores interesados
    let proveedoresInteresados = buscarProveedores(rfq)

    //enviamos notificacion
    for (const proveedor of proveedoresInteresados) {
        await notificador.notificarProveedor(proveedor, rfq.idSolicitud)
    }

    //busqueda externa, catalogos externos
    let catalogosExternos = await catalogoService.externals();

    //obtenemos las url
    let urls = catalogosExternos.map(catalogo => `${catalogo.url_cotizar}/${terms}`)
    
    //aquí se aplica el gather-scatter
    let resultadosExternos = broadcast.runPost(urls, rfq)

    //agregamos los resultados
    aggregate(resultadosExternos)
}

async function buscarComprador(idSolicitud){
    let rfq = await getById(idSolicitud);
    return await userService.getById(rfq.idUsuario);
}

async function buscarProveedores(rfq){
    return await userService.getAllByTipo('proveedor');
}

async function aggregate(resultados){
    resultados.sort((a, b) =>  a.precio - b.precio);
    //solo devolvemos los mejores 3
    return resultados.slice(0,3)
}




