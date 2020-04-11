import {Request, Response, response, request } from 'express';
import db from '../database'
import pool from '../database';
class ProductsController{
    public async list (req: Request,res: Response)
    { 
        const products = await pool.query('select * from producto ');
        console.log(products);
        res.json(products);  

    }
    public async create(req: Request,res: Response): Promise<void>{
       

        await pool.query('INSERT INTO producto set ?',[req.body]);
        
        res.json({message: 'Guardado un producto'});

    }
    public async update(req: Request,res: Response)
    {
        req.body.create_at=null;

        await pool.query('UPDATE producto set ? WHERE id = ?',[req.body, req.params.id]);
        
        res.json({message: 'Modificado un producto'});
   

    }
    public async delete(req: Request,res: Response)
    {

        
        const {id}=req.params;
        const products = await pool.query('DELETE from product where id='+req.params.id);
        console.log("Delete"+products )
        
        //const products = await pool.query('select * from product where id='+[id]);
        res.json({message: 'Producto Eliminado'});

    }
    public async getOne(req: Request,res: Response)
    {
        
        const {id}=req.params;
        const products = await pool.query('select * from producto where id='+req.params.id);
        if(products.length > 0)
        {
            return res.json(products);
            console.log(products);
        }
            res.status(404).json({text: "El Producto no existe"});
        
        //const products = await pool.query('select * from product where id='+[id]);

    }
}
 const productsController = new ProductsController();
export default productsController 