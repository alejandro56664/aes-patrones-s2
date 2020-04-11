import { Request, Response, response, request } from 'express';
import db from '../database'
import pool from '../database';
class CotizacionController {
    public async list(req: Request, res: Response) {
        console.log("Entro a listado de cotizaciones");
        const cotizacions = await pool.query('select * from solicitud_cotizacion order by id desc ');
        console.log(cotizacions);
        res.json(cotizacions);
    }
    public async create(req: Request, res: Response): Promise<void> {

        console.log("Entro a la cotizacion:    " + req.params.id_producto)
        await pool.query('INSERT INTO solicitud_cotizacion set ?', [req.body]);

        res.json({ message: 'Guardado un cotizacion' });

    }
    public async update(req: Request, res: Response) {
        req.body.fecha_creacion = null;

        await pool.query('UPDATE solicitud_cotizacion set ? WHERE id = ?', [req.body, req.params.id]);

        res.json({ message: 'Modificado un cotizacion' });


    }
    public async delete(req: Request, res: Response) {


        const { id } = req.params;
        const cotizacions = await pool.query('DELETE from solicitud_cotizacion where id=' + req.params.id);
        console.log("Delete" + cotizacions)

        //const cotizacions = await pool.query('select * from cotizacion where id='+[id]);
        res.json({ message: 'Producto Eliminado' });

    }
    public async getOne(req: Request, res: Response) {

        const { id } = req.params;
        const cotizacions = await pool.query('select * from solicitud_cotizacion where id=' + req.params.id);
        if (cotizacions.length > 0) {
            return res.json(cotizacions);
            console.log(cotizacions);
        }
        res.status(404).json({ text: "La cotizacion no existe" });

        //const cotizacions = await pool.query('select * from cotizacion where id='+[id]);

    }
}
const cotizacionsController = new CotizacionController();
export default cotizacionsController 