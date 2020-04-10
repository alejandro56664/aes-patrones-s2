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
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.default.query('SELECT * FROM t_usuario WHERE correo= ? and password=?', [req.body.user.correo, req.body.user.password]);
            console.log(req);
            if (user.length > 0) {
                console.log(user);
                return res.json(user);
                console.log(res);
            }
            res.status(404).json({ text: "Usuario Invalido" });
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logout: Boolean;
            const user = yield database_1.default.query('UPDATE game set token="" WHERE token = ?', [req.params.token]);
            if (user.length > 0) {
                user.token = '';
                return res.json(user);
            }
            res.status(404).json({ text: "No se cerró sesiòn" });
        });
    }
}
const authController = new AuthController();
exports.default = authController;
