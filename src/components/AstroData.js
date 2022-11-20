import Throbber from './Throbber/Throbber';
import PropTypes from 'prop-types';

const AstroData = (props) => {
  return (
    <section className='astro-data-section section-styles'>
      {
        props.astroLoading ?
        <Throbber /> :
        <div className='astro-data-container'>
          <h3 className='astro-data-header'>{ props.astroDataHeader }</h3>
          <p className='astro-data-result'>{ props.astroLoading ? 'Loading' : props.astroDataResult }</p>
        </div>
      }
    </section>
  );
}

export default AstroData;

AstroData.propTypes = {
  astroDataHeader: PropTypes.string,
  astroDataResult: PropTypes.string,
  astroLoading: PropTypes.bool,
};
