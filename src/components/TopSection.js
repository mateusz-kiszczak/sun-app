import Throbber from './Throbber/Throbber';
import PropTypes from 'prop-types';

const TopSection = (props) => {
  return (
    <section id='top-section' className='section-styles'>
      {
        props.geoLoading 
        ?
        <Throbber />
        :
        <div id='top-section-content'>
          <h1>{ props.geoData.city }</h1>
          <div id='coordinates-container'>
            <div>
              <p className='coor-label'>latitude</p>
              <p className='coor-value'>{ props.degreesMinutesSecondsLatitude }</p>
            </div>
            <div>
              <p className='coor-label'>longitude</p>
              <p className='coor-value'>{ props.degreesMinutesSecondsLongitude }</p>
            </div>
          </div>
          <hr></hr>
          <button 
            id='change-button'
            onClick={ () => props.handleClickButton() }
          >
            <span>change</span>
            <span>&#10095;</span>
          </button>
        </div>
      }
    </section>
  );
}

export default TopSection;

TopSection.propTypes = {
  degreesMinutesSecondsLatitude:  PropTypes.string,
  degreesMinutesSecondsLongitude: PropTypes.string,
  geoData:    PropTypes.object,
  geoLoading: PropTypes.bool,
  handleClickButton: PropTypes.func
};
