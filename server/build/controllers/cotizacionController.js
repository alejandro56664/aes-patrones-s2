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
    listByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Entro a listado de cotizaciones por usuario" + req.params.id);
            //const cotizacions = await pool.query('select * from solicitud_cotizacion sc inner join t_usuario tu on tu.id=sc.id_usuario where sc.id_usuario='+req.params.id);
            //let cotizacions = await pool.query ("select 'id', c.id, 'id_usuario', c.id_usuario, \
            //JSON_ARRAYAGG( json_object( 'id', p.id, 'descripcion', p.descripcion ) ) as producto   \
            //from solicitud_cotizacion c inner join producto p on p.id = c.id_producto  where c.id_usuario='1' \
            //group by c.id",[req.params.id])
            const cotizacions = yield database_1.default.query('select sc.id, sc.id_producto, sc.id_usuario, sc.estado, sc.fecha_creacion, sc.fecha_modificacion, tu.nombres, tu.celular , tu.correo , tu.fecha_creacion as tu_fecha_creacion , tu.fecha_modificacion as tu_fecha_modificación, p.descripcion , p.titulo   from solicitud_cotizacion sc left join t_usuario tu on tu.id=sc.id_usuario left join producto p on p.id = sc.id_producto  where sc.id_usuario=' + req.params.id);
            console.log("Cotizations" + cotizacions);
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
