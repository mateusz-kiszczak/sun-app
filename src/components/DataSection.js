import AstroData from './AstroData';
import PropTypes from 'prop-types';

const dataOrder = [
  'day_length',
  'sunrise',
  'sunset',
  'solar_noon',
  'astronomical_twilight_begin',
  'astronomical_twilight_end',
  'civil_twilight_begin',
  'civil_twilight_end',
  'nautical_twilight_begin',
  'nautical_twilight_end',
];

const DataSection = (props) => {
  return (
    <section id='data-section'>
      <h2 style={{ display: 'none' }} >Astronomical Data</h2>
      {
        dataOrder.map((item) => {
          let header = '';
          let result = '';

          if (!props.astroLoading) {
            header = item.replaceAll('_', ' ');
            result = props.astroData[item];
          }

          return (
            <AstroData 
              key={item}
              astroDataHeader={ header }
              astroLoading={ props.astroLoading }
              astroDataResult={ result }
            />
          );
        })
      }
    </section>
  );
}

export default DataSection;

DataSection.propTypes = {
  astroData: PropTypes.object,
  astroLoading: PropTypes.bool
};
