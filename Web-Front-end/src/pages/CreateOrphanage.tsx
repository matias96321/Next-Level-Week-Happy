import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import Sidebar from '../components/Sidebar'
import {FiPlus } from "react-icons/fi";
import {LeafletMouseEvent} from 'leaflet'

import '../styles/pages/create-orphanage.css';
import MapIcon from "../utils/mapIcon";
import api from "../services/api";
import { useHistory } from "react-router-dom";



 export default function CreateOrphanage() {
  const history = useHistory()

  const [name,setName] = useState('')
  const [about,setAbout] = useState('')
  const [instructions,setInstructions] = useState('')
  const [opening_hours,setOpeningHours] = useState('')
  const [position,setPosition] = useState({latitude: 0, longitude: 0})
  const [open_on_weekends,setOpenOnWeekends] = useState(true)
  const [images,setImages] = useState<File[]>([])
  const [SelectImagesPreviews,setSelectImagesPreviews] = useState<string[]>([])


  function handleMapClick(event: LeafletMouseEvent) {
    
    const  {lat,lng} = event.latlng
      setPosition({
      latitude: lat,
      longitude: lng
      
    })
         
  }

  function HandlerImagesSelect(event: ChangeEvent<HTMLInputElement>){
    if (!event.target.files) {return}

    const SelectedImages =  Array.from(event.target.files)

    setImages(SelectedImages) 

    const ImagesPreview = SelectedImages.map(image => {
      return URL.createObjectURL(image)
    })

    setSelectImagesPreviews(ImagesPreview)
  }
  
  

  async function HandlerSubmitForm(event: FormEvent){

    event.preventDefault();
        
    const data = new FormData()
    
    data.append('name', name)
    data.append('latitude', String(position.latitude))
    data.append('longitude', String(position.longitude))
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))
    images.forEach(image => {
      data.append('images', image)
    })

    await api.post('/orphanages', data)

    alert('Orfanato cadastrado com sucesso')

    history.push('/app')
  }

  return (
    <div id="page-create-orphanage">
      
      <Sidebar />

      <main>
        <form onSubmit={HandlerSubmitForm} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-12.9673948,-38.4445921]} 
              style={{ width: '100%', height: 280 }}
              zoom={13}
              onclick={handleMapClick}
            >
              
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWF0aWFzczIiLCJhIjoiY2tnYjBic3BvMGNkNTJ5dGo4d2Uxc3NmeiJ9.zdfKb7zqSlOAUizJYt7_-Q`}
              />

              {position.latitude !== 0 &&
                (<Marker 
                  interactive={false} 
                  icon={MapIcon} 
                  position={[
                    position.latitude,
                    position.longitude
                  ]} 
                />)      
              }
  
                
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
   
              <input
                id="name"
                value={name}
                onChange={ event => setName(event.target.value) }
              />
   
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              
              <textarea 
                id="name"
                maxLength={300}
                value={about}
                onChange={ event => setAbout(event.target.value) }
              />
            
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>
              <div className="images-container">
                {SelectImagesPreviews.map(image =>{
                  return (
                    <img key={image} src={image} alt=""/>
                  )})}

                 <label htmlFor="images[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input multiple onChange={HandlerImagesSelect} type="file" name="images[]" id="images[]"/>
            </div>
            
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
            
              <label htmlFor="instructions">Instruções</label>
              <textarea 

                id="instructions"
                value={instructions}
                onChange={ event => setInstructions(event.target.value) }

              />
            
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
              
                id="opening_hours" 
                value={opening_hours}
                onChange={ event => setOpeningHours(event.target.value) }

              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                
                <button type="button" className={open_on_weekends ? 'active' : '' } onClick={() => setOpenOnWeekends(true)} >Sim</button>

                <button type="button" className={!open_on_weekends ? 'active' : ''} onClick={() => setOpenOnWeekends(false)} >Não</button>
              
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
