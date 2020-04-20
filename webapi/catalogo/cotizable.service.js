const db = require('_helpers/db');
const Cotizable = db.Cotizable;

module.exports = {
    search,
    create,
    getById,
    getAll,
    update,
    delete: _delete
};

async function search(terms){
    console.log('terms: ', terms)
    return await Cotizable.find({ $text : { $search : terms } }, 
                                { score : { $meta: "textScore" } })
                            .sort({ score : { $meta : 'textScore' } })
}

async function create(idCatalogo, cotizableParam) {
    // validate
    
    cotizableParam.idCatalogo = idCatalogo
    console.log(cotizableParam)
    const cotizable = new Cotizable(cotizableParam);
    // save
    await cotizable.save();
}

async function getById(id) {
    //todo select
    return await Cotizable.findById(id).select();
}

async function getAll(idCatalogo) {
    //todo select
    return await Cotizable.find({idCatalogo: idCatalogo}).select();
}

async function update(id, cotizableParam) {
    const cotizable = await Cotizable.findById(id);

    // validate
    if (!cotizable) throw 'Cotizable not found';
    if (cotizable.codigo !== cotizableParam.codigo && await Cotizable.findOne({ codigo: cotizableParam.codigo })) {
        throw 'Cotizable "' + cotizableParam.id + '" is already taken';
    }
    // copy properties
    Object.assign(cotizable, cotizableParam);

    await cotizable.save();
    
}

async function _delete(id) {
    await Cotizable.findByIdAndRemove(id);
}

