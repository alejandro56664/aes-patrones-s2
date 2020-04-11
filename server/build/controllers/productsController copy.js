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
class ProductsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield database_1.default.query('select * from producto order by id desc ');
            console.log(products);
            res.json(products);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO producto set ?', [req.body]);
            res.json({ message: 'Guardado un producto' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.fecha_creacion = null;
            yield database_1.default.query('UPDATE producto set ? WHERE id = ?', [req.body, req.params.id]);
            res.json({ message: 'Modificado un producto' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const products = yield database_1.default.query('DELETE from producto where id=' + req.params.id);
            console.log("Delete" + products);
            //const products = await pool.query('select * from product where id='+[id]);
            res.json({ message: 'Producto Eliminado' });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const products = yield database_1.default.query('select * from producto where id=' + req.params.id);
            if (products.length > 0) {
                return res.json(products);
                console.log(products);
            }
            res.status(404).json({ text: "El Producto no existe" });
            //const products = await pool.query('select * from product where id='+[id]);
        });
    }
}
const productsController = new ProductsController();
exports.default = productsController;
