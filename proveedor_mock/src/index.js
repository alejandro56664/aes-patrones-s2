const mb = require('mountebank');
const settings = require('./settings');
const helloService = require('./helloservice');
const customerService = require('./customer-service');
const recolertorCotizacionService = require('./recolectorCotizacionService');
const solicitudCotizacionService = require('./solicitudCotizacionService');
const busquedaCatalogoService = require('./busquedaCatalogoService');
const mbServerInstance = mb.create({
    port: settings.port,
    pidfile: '../mb.pid',
    logfile: '../mb.log',
    protofile: '../protofile.json',
    ipWhitelist: ['*']
});
mbServerInstance.then(function () {
    helloService.addService();
    customerService.addService();
    recolertorCotizacionService.addService();
    solicitudCotizacionService.addService();
    busquedaCatalogoService.addService();
});