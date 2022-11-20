import PropTypes from 'prop-types';

const ChooseLocation = (props) => {

  return (
      <div 
        id='choose-location-container' 
        className={ props.componentClass }
        // Keep component 'hidden' when slow connection
        style={{ height: props.geoLoading ? 0 : '' }}
        onAnimationEnd={ () => props.handleOnAnimationEnd() }
      >
        <div id='choose-location-bg'>
          <button 
            style={{ padding: '0 4px 8px 4px' }}
            id='close-button' 
            onClick={ () => props.handleClickButton() }
          >
            <span>close</span>
            <span style={{ transform: 'rotate(90deg)' }}>&#10095;</span>
          </button>
          <hr style={{ margin: '0 0 20px 0' }}></hr>
          <form 
            id='choose-location-form'
            onSubmit={ (e) => props.handleOnSubmit(e) }
          >
            <div className='input-container'>
              <label htmlFor='latitude'>latitude</label>
              <input 
                onClick={ (e) => props.handleOnClickInput(e) }
                onChange={ (e) => props.handleOnChnageInputLatitude(e) }
                value={ props.inputLatitude ? props.inputLatitude : '' }
                name='latitude'
                step='0.00000001'
                min='-90'
                max='90'
                placeholder=' from -90 to 90'
                type='number'
              ></input>
            </div>
            <div className='input-container'>
              <label htmlFor='longitude'>longitude</label>
              <input 
                onClick={ (e) => props.handleOnClickInput(e) }
                onChange={ (e) => props.handleOnChnageInputLongitude(e) }
                value={ props.inputLongitude ? props.inputLongitude : '' }
                name='longitude'
                step='0.00000001'
                min='-180'
                max='180'
                placeholder='from -180 to 180'
                type='number'
              ></input>
            </div>
            <div className='input-container'>
              <label htmlFor='cities'>choose by city</label>
              <select 
                onChange={ (e) => props.updateSelectedOption(e.target.value)}
                name='cities' 
                size={ window.innerHeight >= 800 ? '10' : '5' }>
                {
                  props.geoDataCollection.map((item) => {
                    return (
                      <option
                      key={item.capitol}
                      value={item.capitol}
                      >
                        {item.capitol} ({item.country})
                      </option>
                    );
                  })
                }
                <option disabled>Custom location</option>
              </select>
            </div>
            <p id='chosen-option'>{ props.selectedOption }</p>
            <p id='alert' style={{ display: props.alert ? 'block' : 'none' }}>{ props.alert }</p>
            <input id='submit-button' type='submit' value='submit'></input>
          </form>
        </div>
      </div>
  );
}

export default ChooseLocation;

ChooseLocation.propTypes = {
  alert: PropTypes.string,
  chooseLocationOpen: PropTypes.bool,
  componentClass: PropTypes.string,
  geoData: PropTypes.object,
  geoDataCollection: PropTypes.array,
  geoLoading: PropTypes.bool,
  handleAlert: PropTypes.func,
  handleClickButton: PropTypes.func,
  handleOnAnimationEnd: PropTypes.func,
  handleOnChnageInputLatitude: PropTypes.func,
  handleOnChnageInputLongitude: PropTypes.func,
  handleOnClickInput: PropTypes.func,
  handleOnSubmit: PropTypes.func,
  inputLatitude: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  inputLongitude: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selectedOption: PropTypes.string,
  updateSelectedOption: PropTypes.func,
};
