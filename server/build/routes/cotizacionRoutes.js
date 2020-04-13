"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cotizacionController_1 = __importDefault(require("../controllers/cotizacionController"));
class CotizacionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', cotizacionController_1.default.list);
        this.router.get('/:id', cotizacionController_1.default.listByUser);
        this.router.post('/add/', cotizacionController_1.default.create);
        this.router.delete('/:id', cotizacionController_1.default.delete);
        this.router.put('/:id', cotizacionController_1.default.update);
    }
}
const productsRoutes = new CotizacionRoutes();
exports.default = productsRoutes.router;
