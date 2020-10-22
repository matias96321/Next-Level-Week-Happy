import Orphanege from "../models/orphanages";
import imagesViews from './Images-Views'

export default {
    Render(orphanages: Orphanege){
        return({
            id: orphanages.id,
            name: orphanages.name,
            latitude: orphanages.latitude,
            longitude: orphanages.longitude,
            about: orphanages.about,
            instructions: orphanages.instructions,
            opening_hours: orphanages.opening_hours,
            open_on_weekends: orphanages.open_on_weekends,
            images: imagesViews.RenderAll(orphanages.images)
        })
    },
    RenderAll(orphanages: Orphanege[]){
        return(orphanages.map(orphanage => this.Render(orphanage))
        )
    }
}