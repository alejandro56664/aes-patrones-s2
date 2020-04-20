const express = require('express');
const router = express.Router();
const catalogoService = require('./catalogo.service');
const cotizableService = require('./cotizable.service');
const busquedaService = require('./busqueda.service');
// routes

//configuracion catálogo
router.get('/buscar', search);

//catalogo -> RU
router.post('/:idCatalogo/configuracion', updateConfig);
router.get('/:idCatalogo/configuracion', getConfig);

//catalogo->cotizable CRUD
router.post('/:idCatalogo/registrar', register);
router.get('/:idCatalogo', getAll);
router.get('/item/:id', getById);
router.post('/item/:id', update);
router.delete('/item/:id', _delete);
module.exports = router;

function search(req, res, next) {
    //obtener del querystring los terminos de busqueda
    busquedaService.search(req.query.q)
                    .then(results => res.json(results))
                    .catch(err => next(err));
}

function updateConfig(req, res, next) {

    catalogoService.update(req.params.idCatalogo, req.body)
                    .then(() => res.json({}))
                    .catch(err => next(err));
}

function getConfig(req, res, next) {
    catalogoService.getById(req.params.idCatalogo)
                    .then(config => res.json(config))
                    .catch(err => next(err));
}


// Servicios para la entidad Cotizable
function register(req, res, next) {
    cotizableService.create(req.params.idCatalogo, req.body)
                    .then(() => res.json({}))
                    .catch(err => next(err));
}

function getAll(req, res, next) {
    
    cotizableService.getAll(req.params.idCatalogo)
                    .then(cotizables => res.json(cotizables))
                    .catch(err => next(err));
}

function getById(req, res, next) {
    cotizableService.getById(req.params.id)
                    .then(cotizable => cotizable ? res.json(cotizable) : res.sendStatus(404))
                    .catch(err => next(err));
}

function update(req, res, next) {
    cotizableService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    cotizableService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}