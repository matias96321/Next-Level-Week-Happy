import React,{useEffect, useState} from 'react'
import mapMarker from "../images/map-marker.svg";
import {Link} from 'react-router-dom';
import {FiPlus,FiArrowRight} from 'react-icons/fi'
import '../styles/pages/OrphanagesMap.css'
import { Map, TileLayer, Marker,Popup } from 'react-leaflet'
import MapIcon from '../utils/mapIcon';
import 'leaflet/dist/leaflet.css';
import api from '../services/api';

interface Orphanages {
    id: number
    longitude: number
    latitude: number
    name: string
}


function OrphanagesMap() {

    const [orphanages, setOrphanages] = useState<Orphanages[]>([])

    useEffect(()=>{
        // Requisição
         api.get('orphanages').then(Response => {
            setOrphanages(Response.data)
        })
      }, [])

      
      

    return (
        <div id='page-map'>
            <aside>
                <header>

                    <img src={mapMarker} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>

                </header>

                <footer>
                    <strong>Bahia</strong>
                    <span>Salvador</span>

                </footer>
            </aside>

            <Map center={[-12.9673948,-38.4445921]} zoom={13} style={{height: '100%', width:'100%'}}>
                
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWF0aWFzczIiLCJhIjoiY2tnYjBic3BvMGNkNTJ5dGo4d2Uxc3NmeiJ9.zdfKb7zqSlOAUizJYt7_-Q`}/>   
                
                {/* Marcação no Mapa */}
               
                {  orphanages.map(orphanages =>{
                    
                    return (
                        
                        <Marker icon={MapIcon} position={[orphanages.latitude, orphanages.longitude]} key={orphanages.id}>
                            <Popup closeButton={false} minWidth={244} maxWidth={244} className="map-popup">
                                {orphanages.name}
                                <Link to={`orphanages/${orphanages.id}`}>
                                    <FiArrowRight size={20} color="#fff"/>
                                </Link>
                            </Popup>
                        </Marker>
                    )
                
                })
                }

            </Map>

            <Link to="orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphanagesMap
