const express = require('express');
const router = express.Router();
const rfqService = require('./rfq.service');

// routes
router.get('/usuario/:idUsuario/solicitudes-cotizacion', getAll);
router.get('/usuario/:idUsuario/solicitudes-cotizacion/:id', getById);
router.post('/usuario/:idUsuario/solicitudes-cotizacion/registrar', register);
router.post('/usuario/:idUsuario/solicitudes-cotizacion/responder', respond);
router.delete('/usuario/:idUsuario/solicitudes-cotizacion/:id', _delete);

module.exports = router;


// Servicios para la entidad Cotizable
function register(req, res, next) {
    rfqService.create(req.params.idUsuario, req.body)
            .then(() => res.json({}))
            .catch(err => next(err));
}

function getAll(req, res, next) {
    rfqService.getAll(req.params.idUsuario)
                    .then(rfqs => res.json(rfqs))
                    .catch(err => next(err));
}

function getById(req, res, next) {
    rfqService.getById(req.params.idUsuario, req.params.id)
                .then(rfq => rfq ? res.json(rfq) : res.sendStatus(404))
                .catch(err => next(err));
}

function respond(req, res, next) {
    rfqService.respond(req.params.idUsuario, req.body)
                .then(() => res.json({}))
                .catch(err => next(err));
}

function _delete(req, res, next) {
    rfqService.delete(req.params.id)
                .then(() => res.json({}))
                .catch(err => next(err));
}