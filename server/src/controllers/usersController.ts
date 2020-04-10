import {Request, Response, response, request } from 'express';
import db from '../database'
import pool from '../database';
class UsersController{
    public async list (req: Request,res: Response)
    { 
        const users = await pool.query('select * from t_usuario ');
        console.log(users);
        res.json(users);  

    }
    public async create(req: Request,res: Response): Promise<void>{
       

        await pool.query('INSERT INTO t_usuario set ?',[req.body]);
        
        res.json({message: 'Guardado un usuario'});

    }
    public async update(req: Request,res: Response)
    {
        req.body.create_at=null;

        await pool.query('UPDATE t_usuario set ? WHERE id = ?',[req.body, req.params.id]);
        
        res.json({message: 'Modificado un usuario'});
   

    }
    public async delete(req: Request,res: Response)
    {

        
        const {id}=req.params;
        const users = await pool.query('DELETE from t_usuario where id='+req.params.id);
        console.log("Delete"+users )
        
        //const users = await pool.query('select * from user where id='+[id]);
        res.json({message: 'usuario Eliminado'});

    }
    public async getOne(req: Request,res: Response)
    {
        
        const {id}=req.params;
        const users = await pool.query('select * from t_usuario where id='+req.params.id);
        if(users.length > 0)
        {
            return res.json(users);
            console.log(users);
        }
            res.status(404).json({text: "El usuario no existe"});
        
        //const users = await pool.query('select * from user where id='+[id]);

    }
}
 const usersController = new UsersController();
export default usersController 