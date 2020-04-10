import {Request, Response, response, request } from 'express';
import db from '../database'
import pool from '../database';
class GamesController{
    public async list (req: Request,res: Response)
    { 
        const games = await pool.query('select * from game ');
        console.log(games);
        res.json(games);  

    }
    public async create(req: Request,res: Response): Promise<void>{
       

        await pool.query('INSERT INTO game set ?',[req.body]);
        
        res.json({message: 'Guardado un juego'});

    }
    public async update(req: Request,res: Response)
    {
        req.body.create_at=null;

        await pool.query('UPDATE game set ? WHERE id = ?',[req.body, req.params.id]);
        
        res.json({message: 'Modificado un juego'});
   

    }
    public async delete(req: Request,res: Response)
    {

        
        const {id}=req.params;
        const games = await pool.query('DELETE from game where id='+req.params.id);
        console.log("Delete"+games )
        
        //const games = await pool.query('select * from game where id='+[id]);
        res.json({message: 'Juego Eliminado'});

    }
    public async getOne(req: Request,res: Response)
    {
        
        const {id}=req.params;
        const games = await pool.query('select * from game where id='+req.params.id);
        if(games.length > 0)
        {
            return res.json(games);
            console.log(games);
        }
            res.status(404).json({text: "El juego no existe"});
        
        //const games = await pool.query('select * from game where id='+[id]);

    }
}
 const gamesController = new GamesController();
export default gamesController 