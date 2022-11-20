import { useState, useEffect } from 'react';
import App from '../components/App';
import converter from '../utilities/converter';

const AppContainer = () => {
  const [geoData, setGeoData] = useState(null);
  const [degreesMinutesSeconds, setDegreesMinutesSeconds] = useState({latitude: null, longitude: null});
  const [astroData, setAstroData] = useState(null);
  const [loading, setLoading] = useState({ geoLoading: true, astroLoading: true });
  const [error, setError] = useState({ geoError: null, astroError: null });

  // When app first time render, get request for current location 
  // (name of city/town, coordinates).
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`https://ipapi.co/json`);
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        let actualData = await response.json();
        setGeoData({
          // RegEx removes the double quotes from string.
          city: JSON.stringify(actualData.city).replace(/"/g, ''),
          latitude: JSON.stringify(actualData.latitude),
          longitude: JSON.stringify(actualData.longitude)
        });
        if (error) setError(prev => ({ ...prev, geoError: null }));
      } 
      
      catch(err) {
        setError(err.message);
        if (geoData) setGeoData(null);
      } 
      
      finally {
        if (loading) setLoading(prev => ({ ...prev, geoLoading: false }));
      }
    };

    getData();
  // eslint-disable-next-line
  }, []);

  // When got the coordinates, get request for atronomical data.
  useEffect(() => {
    if (geoData) {
      const getData = async () => {
        try {
          const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${geoData.latitude}=lng${geoData.longitude}`);
          if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
          }
          let actualData = await response.json();
          setAstroData(actualData.results);
          if (error) setError(prev => ({ ...prev, astroError: null }));
        }

        catch(err) {
          setError(err.message);
          if (astroData) setAstroData(null);
        } 
        
        finally {
          if (loading) setLoading(prev => ({ ...prev, astroLoading: false }));
        }
      };

      getData();

      //Convert decimal degrees to degrees minutes and seconds.
      const converted = converter(geoData.latitude, geoData.longitude);
      const convertedLatitude = `${converted.latitude.degrees}° ${converted.latitude.minutes}' ${converted.latitude.seconds}" ${converted.latitude.direction}`;
      const convertedLongitude = `${converted.longitude.degrees}° ${converted.longitude.minutes}' ${converted.longitude.seconds}" ${converted.longitude.direction}`;

      setDegreesMinutesSeconds({
        latitude: convertedLatitude,
        longitude: convertedLongitude
      });
    }
  // eslint-disable-next-line
  }, [geoData]);

  // Open and close ChooseLocation container.
  const [chooseLocationOpen, setChooseLocationOpen] = useState(false);

  const toggleChooseLocation = (bool) => {
    setChooseLocationOpen(bool);
  }

  // Set custom geoData.
  const setCustomGeoData = (lat, lng, city) => {
    setGeoData({
      city: city,
      latitude: lat,
      longitude: lng
    });
  }

  return (
    <App 
      astroData={ astroData }
      astroLoading={ loading.astroLoading }
      chooseLocationOpen={ chooseLocationOpen }
      degreesMinutesSecondsLatitude={ degreesMinutesSeconds.latitude }
      degreesMinutesSecondsLongitude={ degreesMinutesSeconds.longitude }
      geoData={ geoData } 
      geoLoading={ loading.geoLoading }
      setCustomGeoData={ setCustomGeoData }
      toggleChooseLocation={ toggleChooseLocation }
    />
  );
}

export default AppContainer;
