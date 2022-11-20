import PropTypes from 'prop-types';

const Dot = (props) => {
  return (
    <div className="dot-container" style={{transform: `rotate(${props.rotateValue}deg)`}}>
      <div className="dot" style={{animationDelay: `${props.delayValue}ms`}}></div>
    </div>
  );
}

export default Dot;

Dot.propTypes = {
  rotateValue:  PropTypes.number,
  delayValue: PropTypes.number
};
