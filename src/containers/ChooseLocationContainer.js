import { useState, useEffect } from 'react';
import ChooseLocation from '../components/ChooseLocation';
import { capitols } from '../data/capitols'
import PropTypes from 'prop-types';

// Sort items (objects) in array by capitol name (form a to z). 
const geoDataCollection = capitols.sort((a, b) => a.capitol < b.capitol ? -1 : 1);

const ChooseLocationContainer = (props) => {
  // Handle open/close and animations of component.
  const [componentClass, setComponentClass] = useState('');

  useEffect(() => {
    if (props.chooseLocationOpen) setComponentClass('choose-location-open-anim');
    if (!props.chooseLocationOpen) setComponentClass('choose-location-closed');
  }, [props, props.chooseLocationOpen])

  const handleClickButton = () => {
    setComponentClass('choose-location-closed-anim');
  };
  
  const handleOnAnimationEnd = () => {
    if (componentClass === 'choose-location-open-anim') {
      setComponentClass('choose-location-open');
    }
    if (componentClass === 'choose-location-closed-anim') {
      props.toggleChooseLocation(false);
    }
  };

  // Handle chosen data.
  const [selectedOption, setSelectedOption] = useState('');

  const updateSelectedOption = (str) => {
    setSelectedOption(str);
  };

  const [inputLatitude, setInputLatitude] = useState(null);
  const [inputLongitude, setInputLongitude] = useState(null); 

  useEffect(() => {
    if (selectedOption && selectedOption !== 'Custom Location') {
      const expectedObj = geoDataCollection.find(obj => obj.capitol === selectedOption);
      // Round coordinations to 4 decimals
        setInputLatitude(+(Math.round(expectedObj.latitude + 'e+4') + 'e-4'));
        setInputLongitude(+(Math.round(expectedObj.longitude + 'e+4') + 'e-4'));
    }
  }, [selectedOption]);

  // Handle cunstom input value onChange.
  const handleOnChnageInputLatitude = (e) => {
    setInputLatitude(e.target.value);

    if (selectedOption !== 'Custom Location') {
      setSelectedOption('Custom Location');
    }
  }

  const handleOnChnageInputLongitude = (e) => {
    setInputLongitude(e.target.value);

    if (selectedOption !== 'Custom Location') {
      setSelectedOption('Custom Location');
    }
  }

  // Handle input value onClick.
  const handleOnClickInput = (e) => {
    e.target.select()
  }

  // Handle input value onSubmit.
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (inputLatitude && inputLongitude) {
      const latitudeValue = +(Math.round(inputLatitude + 'e+4') + 'e-4'); 
      const longitudeValue = +(Math.round(inputLongitude + 'e+4') + 'e-4'); 
      props.setCustomGeoData(latitudeValue, longitudeValue, selectedOption);
      // Close the choose location card.
      props.toggleChooseLocation();
    }

    if (!inputLatitude || !inputLongitude) {
      handleAlert('Place BOTH latitude and longitude values OR select a city from the list.')
    }
  }

  // Submit is mixing between custon coordination and the selection of cities.
  // Make sure that only one works (is submited at the yime) or completly overwrite previous one.

  //Submit alerts.
  const [alert, setAlert] = useState('');

  const handleAlert = (str) => {
    setAlert(str);
  };

  useEffect(() => {
    if (inputLatitude && inputLongitude) {
      setAlert('');
    }
  }, [inputLatitude, inputLongitude])

  return (
    <ChooseLocation 
      alert={ alert }
      chooseLocationOpen={ props.chooseLocationOpen }
      componentClass={ componentClass }
      geoData={ props.geoData }
      geoDataCollection={ geoDataCollection }
      geoLoading={ props.geoLoading }
      handleAlert={ handleAlert }
      handleClickButton={ handleClickButton }
      handleOnAnimationEnd={ handleOnAnimationEnd }
      handleOnChnageInputLatitude={ handleOnChnageInputLatitude }
      handleOnChnageInputLongitude={ handleOnChnageInputLongitude }
      handleOnClickInput={ handleOnClickInput }
      handleOnSubmit={ handleOnSubmit }
      inputLatitude={ inputLatitude }
      inputLongitude={ inputLongitude }
      selectedOption={ selectedOption }
      updateSelectedOption={ updateSelectedOption }
    />
  );
}

export default ChooseLocationContainer;

ChooseLocationContainer.propTypes = {
  geoData: PropTypes.object,
  geoLoading: PropTypes.bool,
  chooseLocationOpen: PropTypes.bool,
  toggleChooseLocation: PropTypes.func,
  setCustomGeoData: PropTypes.func
};
