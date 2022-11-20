import TopSection from '../components/TopSection';
import PropTypes from 'prop-types';

const TopSectionContainer = (props) => {
  const handleClickButton = () => {
    if (!props.chooseLocationOpen) {
      props.toggleChooseLocation(true);
    }
  }

  return (
    <TopSection 
      geoData={ props.geoData }
      geoLoading={ props.geoLoading }
      degreesMinutesSecondsLatitude={ props.degreesMinutesSecondsLatitude }
      degreesMinutesSecondsLongitude={ props.degreesMinutesSecondsLongitude }
      handleClickButton={ handleClickButton }
    />
  );
}

export default TopSectionContainer;

TopSectionContainer.propTypes = {
  degreesMinutesSecondsLatitude:  PropTypes.string,
  degreesMinutesSecondsLongitude: PropTypes.string,
  geoData:    PropTypes.object,
  geoLoading: PropTypes.bool,
  chooseLocationOpen:   PropTypes.bool,
  toggleChooseLocation: PropTypes.func
};
