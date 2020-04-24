const db = require('_helpers/db');
const broadcast = require('../_helpers/broadcast');
const notificador = require('../_helpers/notificador');
const catalogoService = require('../catalogo/catalogo.service');
const userService = require('../usuarios/usuario.service');
const cotizableService = require('../catalogo/cotizable.service');

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
    const usuario = await userService.getById(idUsuario);

    let params = {}
    if(usuario.tipo === 'comprador'){
        params = {idUsuario: idUsuario}
    } 

    return await RFQ.find(params).select().populate('cotizable');
}

async function register(idUsuario, rfqParam) {
    console.log('Solicitud de registro ', rfqParam)

    if(rfqParam.cotizable.externo){
        console.log('TODO: guardar rfq para externo')
       
    } else {
       
    }

    const rfq = new RFQ(rfqParam);

    //TODO: agregar idUsuario
    rfq.idUsuario = idUsuario
    await rfq.save();

    rfqParam.idSolicitud = rfq._id
    console.log('Se guardo la solicitud: ')
    //hacemos el scatter and gather a los proveedores
    await scatterngather(rfqParam);
}


async function respond(idUsuario, idSolicitud, cotizacionParam) {
    //creamos una nueva Cotización
    let cotizacion = new Cotizacion(cotizacionParam);

    //TODO agregar idUsuario
    cotizacion.idProveedor = idUsuario;
    await cotizacion.save();

    //buscar comprador
    let comprador = await buscarCompradorPorSolicitud(idSolicitud)

    await notificador.notificarComprador(comprador, cotizacionParam.idSolicitud)
    console.log('se respondió la solicitud')
}

async function getById(idUsuario, id) {
    //aqui debemos traer la rfq
    //mas las cotizaciones mejores cotizaciones asociadas. 

    const rfq = await RFQ.findOne({ _id: id }).populate('cotizable');
    
    const cotizaciones = await Cotizacion.find({idSolicitud: id}).select();
    let result = {}
    Object.assign(result, rfq._doc)
    result.cotizaciones = cotizaciones || []

    return result;
}

async function _delete(id) {
    return await RFQ.findOneAndRemove({ _id: id });
}


async function scatterngather(rfq) {

    console.log(rfq)

    //buscamos proveedores interesados
    let proveedoresInteresados = await buscarProveedores(rfq)

    console.log('proveedoresInteresados: ', proveedoresInteresados)
    //enviamos notificacion
    for (const proveedor of proveedoresInteresados) {
        await notificador.notificarProveedor(proveedor, rfq.idSolicitud)
    }

    //busqueda externa, catalogos externos
    let catalogosExternos = await catalogoService.externals();

    console.log('catalogosExternos: ', catalogosExternos)

    
    //obtenemos las url
    let urls = catalogosExternos.map(catalogo => `${catalogo.url_cotizar}`)
    
    //aquí se aplica el gather-scatter
    let resultadosExternos = broadcast.runPost(urls, rfq)

    //agregamos los resultados
    aggregate(resultadosExternos)
}

async function buscarCompradorPorSolicitud(idSolicitud){
    let rfq = await getById(null,idSolicitud);
    return await userService.getById(rfq.idUsuario);
}

async function buscarProveedores(rfq){
    return await userService.getAllByTipo('proveedor');
}

async function aggregate(resultados){
    let result = []
    if(resultados){
        resultados.sort((a, b) =>  a.precio - b.precio);
        //solo devolvemos los mejores 3
        return resultados.slice(0,3)
    }
    return result
    
}




