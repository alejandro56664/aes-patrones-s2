import {Router} from 'express'
import catalogosController from '../controllers/catalogsController'

class CatalogRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
        
    }
    config():void{
        this.router.get('/', catalogosController.list);
        this.router.get('/:id', catalogosController.getOne);
        this.router.post('/:id/:id',catalogosController.create);
        this.router.delete('/:id',catalogosController.delete);
        this.router.put('/:id',catalogosController.update);

    }
}
const catalogosRoutes = new CatalogRoutes();
export default catalogosRoutes.router;