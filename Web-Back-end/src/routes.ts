import {Router} from 'express';
import OrphanagesController from './controllers/OrphanegesCotroller';

import multer from 'multer';
import uploadsConfig from './configs/upload';

const routes = Router();


    // Configurando o multer
        const upload = multer(uploadsConfig); 
    //

    // Rotas
        routes.get('/orphanages',OrphanagesController.index)
        routes.get('/orphanages/:id',OrphanagesController.show)
        routes.post('/orphanages',upload.array('images'),OrphanagesController.create)
    //


export default routes;