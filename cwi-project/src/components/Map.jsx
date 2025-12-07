import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, FeatureGroup} from 'react-leaflet';
import { EditControl} from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';

function Map() {
  const mapRef = useRef();
  const [drawnItems, setDrawnItems] = useState([]);

  const onCreate = (e) => {
    console.log("Created:", e.layer.getLatLngs()[0]);
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
      const {_leaflet_id} = layer;

      setDrawnItems((layers) => [ 
        ...layers, 
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
      ]);
    };

    const coords = layer.getLatLngs()[0].map( (latlng) => [latlng.lng, latlng.lat] );
    coords.push(coords[0]); // Close the ring
    console.log("Coordinates:", coords);

    fetch("http://localhost:5000/soil", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ polygon: coords }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Soil data received:", data);
    })
    .catch((err) => {
      console.error("Error fetching soil data:", err);
    });
  };

  const onEdit = (e) => {
    console.log("Edited:", e);
    const {layers: {_layers}} = e;

    Object.values(_layers).map( ({ _leaflet_id, editing }) => {
      setDrawnItems( (layers) => 
        layers.map( (l) => l.id === _leaflet_id) 
      ? {...l, latlngs: { ...editing.latlngs[0] }} 
      : l 
      );
    });
  };

  const onDelete = (e) => {
    console.log("Deleted:", e);
    const {layers : {_layers}} = e;

    Object.values(_layers).map(({_leaflet_id}) => {
      setDrawnItems( (layers) => layers.filter( (l) => l.id !== _leaflet_id ) );
    });
  };

  return (
    <div>
      <MapContainer center={[36.7378, -119.7871]} zoom={12} ref={mapRef} className='h-90 w-90'>
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={onCreate}
            onEdited={onEdit}
            onDeleted={onDelete}
            draw={{
              rectangle: false,
              circle: false,
              marker: false,
              polyline: false,
              circlemarker: false
            }}
          />
        </FeatureGroup>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      
      </MapContainer>
    </div>
  );
}

export default Map;