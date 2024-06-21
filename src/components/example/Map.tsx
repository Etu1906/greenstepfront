import { useIonViewDidEnter } from "@ionic/react";
import axios from "axios";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import "./Map.css";

const Map: React.FC = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [from, setFrom] = useState<[number, number] | null>(null);
  const [to, setTo] = useState<[number, number] | null>(null);
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");

  useIonViewDidEnter(() => {
    const mapInstance = L.map("map", {
      center: [49.8419, 24.0315],
      zoom: 16,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });
    setMap(mapInstance);
  });

  useEffect(() => {
    if (map && from && to) {
      const routingControl = L.Routing.control({
        waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
        routeWhileDragging: true,
      }).addTo(map);

      return () => {
        map.removeControl(routingControl);
      };
    }
  }, [map, from, to]);

  const geocode = async (place: string) => {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: place,
          format: "json",
          addressdetails: 1,
        },
      }
    );
    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return [parseFloat(lat), parseFloat(lon)] as [number, number];
    }
    return null;
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromInput(e.target.value);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToInput(e.target.value);
  };

  const handleValidate = async () => {
    const fromCoords = await geocode(fromInput);
    const toCoords = await geocode(toInput);
    console.log(fromCoords);
    console.log(toCoords);
    setFrom(fromCoords);
    setTo(toCoords);
  };

  return (
    <div>
      <div>
        <label>Point de départ : </label>
        <input type="text" value={fromInput} onChange={handleFromChange} />
      </div>
      <div>
        <label>Point d'arrivée : </label>
        <input type="text" value={toInput} onChange={handleToChange} />
      </div>
      <button onClick={handleValidate}>Valider</button>
      <div id="map" style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
};

export default Map;
