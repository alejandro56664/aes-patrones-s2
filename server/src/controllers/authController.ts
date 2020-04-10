import {Request, Response, response, request } from 'express';
import db from '../database'
import pool from '../database';
class AuthController{

    public async login(req: Request,res: Response){
        const user =await pool.query('SELECT * FROM t_usuario WHERE correo= ? and password=?',[req.body.user.correo, req.body.user.password]);
        console.log(req)

        if(user.length > 0)
        {        
            console.log(user)
            return res.json(user);
            console.log(res)
        }
            res.status(404).json({text: "Usuario Invalido"});
        

    }
    public async logout(req: Request,res: Response)
    {
    
     logout: Boolean;
        const user=await pool.query('UPDATE game set token="" WHERE token = ?',[req.params.token]);
        if(user.length > 0)
        {
            user.token='';

            return res.json(user);

        }
            res.status(404).json({text: "No se cerró sesiòn"});
        
   

    }
   
}
 const authController = new AuthController();
export default authController 