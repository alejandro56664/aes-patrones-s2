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
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query('select * from game ');
            console.log(games);
            res.json(games);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO game set ?', [req.body]);
            res.json({ message: 'Guardado un juego' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.create_at = null;
            yield database_1.default.query('UPDATE game set ? WHERE id = ?', [req.body, req.params.id]);
            res.json({ message: 'Modificado un juego' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const games = yield database_1.default.query('DELETE from game where id=' + req.params.id);
            console.log("Delete" + games);
            //const games = await pool.query('select * from game where id='+[id]);
            res.json({ message: 'Juego Eliminado' });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const games = yield database_1.default.query('select * from game where id=' + req.params.id);
            if (games.length > 0) {
                return res.json(games);
                console.log(games);
            }
            res.status(404).json({ text: "El juego no existe" });
            //const games = await pool.query('select * from game where id='+[id]);
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
