const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const catalogoService = require('../catalogo/catalogo.service');

const Usuario = db.Usuario;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }) {

    const user = await Usuario.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await Usuario.find().select('-hash');
}

async function getById(id) {
    return await Usuario.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await Usuario.findOne({ email: userParam.email })) {
        throw 'Username "' + userParam.email + '" is already taken';
    }

    const user = new Usuario(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();

    //una vez guardado, si es proveedor creamos el catalogo por defecto
    if(userParam.tipo === 'proveedor'){
        console.log('Se crea catálogo por defecto para el usuario proveedor con id: ', user._id)
        catalogoService.registerDefault(user._id)
    }
    
}

async function update(id, userParam) {
    const user = await Usuario.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await Usuario.findOne({ email: userParam.email })) {
        throw 'email "' + userParam.email + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await Usuario.findByIdAndRemove(id);
    await catalogoService.delete(id);
}