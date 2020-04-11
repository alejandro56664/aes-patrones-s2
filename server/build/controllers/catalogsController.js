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
class CatalogsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const catalogs = yield database_1.default.query('select * from catalog ');
            console.log(catalogs);
            res.json(catalogs);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO catalog set ?', [req.body]);
            res.json({ message: 'Guardado un juego' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.create_at = null;
            yield database_1.default.query('UPDATE catalogo set ? WHERE id = ?', [req.body, req.params.id]);
            res.json({ message: 'Modificado un catalogo' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const catalogs = yield database_1.default.query('DELETE from catalogo where id=' + req.params.id);
            console.log("Delete" + catalogs);
            //const catalogs = await pool.query('select * from catalog where id='+[id]);
            res.json({ message: 'Catalogo Eliminado' });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const catalogs = yield database_1.default.query('select * from catalogo where id=' + req.params.id);
            if (catalogs.length > 0) {
                return res.json(catalogs);
                console.log(catalogs);
            }
            res.status(404).json({ text: "El Catalogo no existe" });
            //const catalogs = await pool.query('select * from catalog where id='+[id]);
        });
    }
}
const catalogsController = new CatalogsController();
exports.default = catalogsController;
