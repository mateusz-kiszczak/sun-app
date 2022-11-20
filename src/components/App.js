import TopSectionContainer from '../containers/TopSectionContainer';
import ChooseLocationContainer from '../containers/ChooseLocationContainer';
import DataSection from './DataSection';
import PropTypes from 'prop-types';

const App = (props) => {

  return (
    <div id='app-container' className={props.astroLoading ? '' : 'fog-bg'}>
      <TopSectionContainer 
        chooseLocationOpen={ props.chooseLocationOpen }
        degreesMinutesSecondsLatitude={ props.degreesMinutesSecondsLatitude }
        degreesMinutesSecondsLongitude={ props.degreesMinutesSecondsLongitude }
        geoData={ props.geoData }
        geoLoading={ props.geoLoading }
        toggleChooseLocation={ props.toggleChooseLocation }
      />
      <ChooseLocationContainer 
        chooseLocationOpen={ props.chooseLocationOpen }
        geoData={ props.geoData }
        geoLoading={ props.geoLoading }
        setCustomGeoData={ props.setCustomGeoData }
        toggleChooseLocation={ props.toggleChooseLocation }
      />
      <DataSection 
        astroData={ props.astroData }
        astroLoading={ props.astroLoading }
      />
    </div>
  );
}

export default App;

App.propTypes = {
  astroData: PropTypes.object,
  astroLoading: PropTypes.bool,
  chooseLocationOpen: PropTypes.bool,
  degreesMinutesSecondsLatitude: PropTypes.string,
  degreesMinutesSecondsLongitude: PropTypes.string,
  geoData: PropTypes.object,
  geoLoading: PropTypes.bool,
  setCustomGeoData: PropTypes.func,
  toggleChooseLocation: PropTypes.func
};    
