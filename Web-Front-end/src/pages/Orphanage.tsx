import React,{useEffect,useState} from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo} from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import Sidebar from "../components/Sidebar"
import api from "../services/api";
import '../styles/pages/orphanage.css';
import MapIcon from "../utils/mapIcon"
import {useParams} from 'react-router-dom'


interface OrphanageParams {
  id: string
}

interface Orphanage {
  name:string
  latitude:number
  longitude:number
  instrution:string
  about:string
  opening_hours:string
  open_on_weekends:string
  images:Array<{
    id:number
    url: string
  }>
}


export default function Orphanage() {
  
const params = useParams<OrphanageParams>()
const [orphanage,setOrphanage] = useState<Orphanage>()
const [ imageAtive, setImageAtive ] = useState(0)

  useEffect(()=>{
    api.get(`orphanages/${params.id}`).then(Response =>{
      setOrphanage(Response.data)
    })
  },[])  

  
  if (!orphanage) {
    return <p>Carregando..........</p>
  }

  return (
    <div id="page-orphanage">
      
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[imageAtive].url} alt={orphanage.name} />

          <div className="images">
            
            {
            
            orphanage.images.map((image, index) => {
              return(
                
                <button

                  key={image.id}
                  className={imageAtive === index ? "active": ""}
                  type="button"
                  onClick={ ()=>{  setImageAtive(index)  }}>
                    
                  <img src={image.url} alt={orphanage.name} />

                </button>
              )
            })
            
            
            }            
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude,orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWF0aWFzczIiLCJhIjoiY2tnYjBic3BvMGNkNTJ5dGo4d2Uxc3NmeiJ9.zdfKb7zqSlOAUizJYt7_-Q`}
                />
                <Marker interactive={false} icon={MapIcon} position={[orphanage.latitude,orphanage.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instrution}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends ? 
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
               : 
                <div className="dont-open">
                  <FiInfo size={32} color="#FF6690" />
                  Não atendemos <br />
                  fim de semana
                </div>
              }
            </div>

            
          </div>
        </div>
      </main>
    </div>
  );
}