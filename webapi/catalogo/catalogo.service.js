const db = require('_helpers/db');
const Catalogo = db.Catalogo;

//Nota: La entidad Catalogo representa la configuración del catálogo

//Nota: el registro del catálogo y su eliminación dependen de la entidad usuario
module.exports = {
    externals,
    register,
    registerDefault,
    update,
    getById,
    delete: _delete
};

async function externals() {
    //Broadcast Gather-Scatter
    //buscamos catalogos externos,
    return await Catalogo.find({ tipo: 'externo'});
}

async function registerDefault(idUsuario){
    let catalogoParam ={
        id: idUsuario,
        tipo: 'interno',
        url_buscar: '',
        url_cotizar: ''
    }

    await register(catalogoParam)
}

async function register(catalogoParam) {
   // validate
    if (await Catalogo.findOne({ id: catalogoParam.id })) {
        throw 'Catalogo "' + catalogoParam.id  + '" is already taken';
    }
    const catalogo = new Catalogo(catalogoParam);
    // save user
    await catalogo.save();
}


async function update(id, catalogoParam) {
    const catalogo = await Catalogo.findOne({ id: id});

    // validate
    if (!catalogo) throw 'Catalogo not found';
    if (catalogo.id !== catalogoParam.id && await Catalogo.findOne({ id: catalogoParam.id })) {
        throw 'Catalogo "' + catalogoParam.id + '" is already taken';
    }
    // copy properties
    Object.assign(catalogo, catalogoParam);

    await catalogo.save();
   
}

async function getById(id) {
    console.log('buscar catalogo: ', id)
    return await Catalogo.findOne({ id: id })
}

async function _delete(id) {
    return await Catalogo.findOneAndRemove({ id: id });
}





