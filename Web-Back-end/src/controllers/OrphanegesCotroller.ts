import {Request,Response} from 'express'
import {getRepository} from 'typeorm';
import Orphanege from '../models/orphanages';
import orphanagesViews from '../views/Orphanages-Views';
import * as Yup from 'yup'

export default {

    async show(Request: Request, Response: Response){
        
        const {id} = Request.params


        const orphanagesRepository = getRepository(Orphanege)
        
        const orphanage = await orphanagesRepository.findOneOrFail(id,{
            relations:['images']
        });
        
        return Response.status(200).json(orphanagesViews.Render(orphanage))
    },


    async index(Request: Request, Response: Response){

        const orphanagesRepository = getRepository(Orphanege)
        const orphanages = await orphanagesRepository.find({
            relations:['images']
        });
        
        return Response.status(200).json(orphanagesViews.RenderAll(orphanages))
    },

    
    async create(Request: Request,Response: Response){

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,    
            
        } = Request.body

        const RequestImages = Request.files as Express.Multer.File[]

        const images = RequestImages.map(image =>{
            return {path: image.filename}
        })
        
        const orphanagesRepository = getRepository(Orphanege)
    
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            open_on_weekends
            ,
            opening_hours,
            images
        }

        console.log(data);
        
        
        const Schema = Yup.object().shape({

            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            opening_hours: Yup.string().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        })

        await Schema.validate(data,{
            abortEarly: false,
        })

        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage);
    
        return Response.status(201).json(orphanage)
    }
}