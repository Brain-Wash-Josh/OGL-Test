import {useState, useEffect} from "react";
import Page from '../../components/page';
import Map from './Map.jsx';
import css from './index.module.css';

const MapPage = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pos, setPos] = useState([]);


    const createPositions = async (data) => {
      
      const positions = [];
      console.log('Map Data:', data);

      for(const item of data) {
        const position = {
          lat: item.latitude,
          lng: item.longitude,
          name: item.name,
          details: `${item.house} ${item.street}, ${item.city}, ${item.postcode}`
        };
        positions.push(position);
      }
      console.log('Positions:', positions);
      setPos(positions);
    }
       
    useEffect(() => {
          let mounted = true;
          setLoading(true);
          fetch('http://localhost:8080/customer')
              .then((res) => {
                  if (!res.ok) throw new Error(`HTTP ${res.status}`);
                  return res.json();
              })
              .then((json) => {
                  if (!mounted) return;
                  const arr = Array.isArray(json) ? json : [];
                  createPositions(arr);
                  setLoading(false);
              })
              .catch((err) => {
                  if (!mounted) return;
                  setError(err.message || 'Fetch error');
                  setLoading(false);
              });
                      
          return () => {
              mounted = false;
          };

          
      }, []);


  return (
  <Page title="Map Page">
    {loading && <p>Loading map data...</p>}
    {error && <p style={{ color: 'red' }}>Error: {error}</p>}

    {!loading && !error && (
      <div id="map" className={css.mapContainer}>
        <Map positions={pos}/>
      </div>)}
    
  </Page>
  );
};

export default MapPage;