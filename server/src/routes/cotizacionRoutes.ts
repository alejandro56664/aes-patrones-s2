import {Router} from 'express'
import cotizacionController from '../controllers/cotizacionController'

class CotizacionRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
        
    }
    config():void{
        this.router.get('/', cotizacionController.list);
        this.router.get('/:id', cotizacionController.getOne);
        this.router.post('/add/',cotizacionController.create);
        this.router.delete('/:id',cotizacionController.delete);
        this.router.put('/:id',cotizacionController.update);

    }
}
const productsRoutes = new CotizacionRoutes();
export default productsRoutes.router;