import { MapContainer, TileLayer } from 'react-leaflet';

function Map() {
  return (
    <MapContainer center={[36.7378, -119.7871]} zoom={10} className='flexible-map h-90 w-90 my-10'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default Map;