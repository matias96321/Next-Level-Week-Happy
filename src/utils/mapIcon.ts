import mapMarkerImg from '../images/map-marker.svg'
import Leaflet from 'leaflet'


const MapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
  
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 5]
})

export default MapIcon;