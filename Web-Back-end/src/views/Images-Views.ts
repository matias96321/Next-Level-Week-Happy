import Images from "../models/images";

export default {
    Render(images: Images){
        return ({
            id: images.id,
            url: `http://localhost:3333/uploads/${images.path}` 
        })
    },
    RenderAll(images: Images[]){
        return(images.map(image => this.Render(image)))
    }
}