import {Request, Response, response, request } from 'express';
import db from '../database'
import pool from '../database';
class CatalogsController{
    public async list (req: Request,res: Response)
    { 
        const catalogs = await pool.query('select * from catalog ');
        console.log(catalogs);
        res.json(catalogs);  

    }
    public async create(req: Request,res: Response): Promise<void>{
       

        await pool.query('INSERT INTO catalog set ?',[req.body]);
        
        res.json({message: 'Guardado un juego'});

    }
    public async update(req: Request,res: Response)
    {
        req.body.create_at=null;

        await pool.query('UPDATE catalogo set ? WHERE id = ?',[req.body, req.params.id]);
        
        res.json({message: 'Modificado un catalogo'});
   

    }
    public async delete(req: Request,res: Response)
    {

        
        const {id}=req.params;
        const catalogs = await pool.query('DELETE from catalogo where id='+req.params.id);
        console.log("Delete"+catalogs )
        
        //const catalogs = await pool.query('select * from catalog where id='+[id]);
        res.json({message: 'Catalogo Eliminado'});

    }
    public async getOne(req: Request,res: Response)
    {
        
        const {id}=req.params;
        const catalogs = await pool.query('select * from catalogo where id='+req.params.id);
        if(catalogs.length > 0)
        {
            return res.json(catalogs);
            console.log(catalogs);
        }
            res.status(404).json({text: "El Catalogo no existe"});
        
        //const catalogs = await pool.query('select * from catalog where id='+[id]);

    }
}
 const catalogsController = new CatalogsController();
export default catalogsController 