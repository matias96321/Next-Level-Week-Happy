import React from 'react'
import mapMarker from "../images/map-marker.svg";
import {Link} from 'react-router-dom';
import {FiPlus} from 'react-icons/fi'
import '../styles/pages/OrphanagesMap.css'
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

function OrphanagesMap() {
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

            <Map 
            
            center={[-12.994057,-38.515312,13]}
            zoom={75}
            style={{height: '100%', width:'100%'}}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />    
                
            </Map>
            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphanagesMap
