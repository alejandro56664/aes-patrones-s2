"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class CotizacionController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Entro a listado de cotizaciones");
            const cotizacions = yield database_1.default.query('select * from solicitud_cotizacion order by id desc ');
            console.log(cotizacions);
            res.json(cotizacions);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Entro a la cotizacion:    " + req.params.id_producto);
            yield database_1.default.query('INSERT INTO solicitud_cotizacion set ?', [req.body]);
            res.json({ message: 'Guardado un cotizacion' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.fecha_creacion = null;
            yield database_1.default.query('UPDATE solicitud_cotizacion set ? WHERE id = ?', [req.body, req.params.id]);
            res.json({ message: 'Modificado un cotizacion' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const cotizacions = yield database_1.default.query('DELETE from solicitud_cotizacion where id=' + req.params.id);
            console.log("Delete" + cotizacions);
            //const cotizacions = await pool.query('select * from cotizacion where id='+[id]);
            res.json({ message: 'Producto Eliminado' });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const cotizacions = yield database_1.default.query('select * from solicitud_cotizacion where id=' + req.params.id);
            if (cotizacions.length > 0) {
                return res.json(cotizacions);
                console.log(cotizacions);
            }
            res.status(404).json({ text: "La cotizacion no existe" });
            //const cotizacions = await pool.query('select * from cotizacion where id='+[id]);
        });
    }
}
const cotizacionsController = new CotizacionController();
exports.default = cotizacionsController;
