"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catalogsController_1 = __importDefault(require("../controllers/catalogsController"));
class CatalogRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', catalogsController_1.default.list);
        this.router.get('/:id', catalogsController_1.default.getOne);
        this.router.post('/', catalogsController_1.default.create);
        this.router.delete('/:id', catalogsController_1.default.delete);
        this.router.put('/:id', catalogsController_1.default.update);
    }
}
const catalogosRoutes = new CatalogRoutes();
exports.default = catalogosRoutes.router;
