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
class UsersController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.default.query('select * from t_usuario ');
            console.log(users);
            res.json(users);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO t_usuario set ?', [req.body]);
            res.json({ message: 'Guardado un usuario' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.create_at = null;
            yield database_1.default.query('UPDATE t_usuario set ? WHERE id = ?', [req.body, req.params.id]);
            res.json({ message: 'Modificado un usuario' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const users = yield database_1.default.query('DELETE from t_usuario where id=' + req.params.id);
            console.log("Delete" + users);
            //const users = await pool.query('select * from user where id='+[id]);
            res.json({ message: 'usuario Eliminado' });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const users = yield database_1.default.query('select * from t_usuario where id=' + req.params.id);
            if (users.length > 0) {
                return res.json(users);
                console.log(users);
            }
            res.status(404).json({ text: "El usuario no existe" });
            //const users = await pool.query('select * from user where id='+[id]);
        });
    }
}
const usersController = new UsersController();
exports.default = usersController;
