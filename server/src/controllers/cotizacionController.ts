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
    public async listByUser(req: Request, res: Response) {
        console.log("Entro a listado de cotizaciones por usuario"+ req.params.id) 
        //const cotizacions = await pool.query('select * from solicitud_cotizacion sc inner join t_usuario tu on tu.id=sc.id_usuario where sc.id_usuario='+req.params.id);
        //let cotizacions = await pool.query ("select 'id', c.id, 'id_usuario', c.id_usuario, \
        //JSON_ARRAYAGG( json_object( 'id', p.id, 'descripcion', p.descripcion ) ) as producto   \
        //from solicitud_cotizacion c inner join producto p on p.id = c.id_producto  where c.id_usuario='1' \
        //group by c.id",[req.params.id])
        const cotizacions = await pool.query('select sc.id, sc.id_producto, sc.id_usuario, sc.estado, sc.fecha_creacion, sc.fecha_modificacion, tu.nombres, tu.celular , tu.correo , tu.fecha_creacion as tu_fecha_creacion , tu.fecha_modificacion as tu_fecha_modificación, p.descripcion , p.titulo   from solicitud_cotizacion sc left join t_usuario tu on tu.id=sc.id_usuario left join producto p on p.id = sc.id_producto  where sc.id_usuario='+req.params.id);
        console.log("Cotizations"+cotizacions);
   
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