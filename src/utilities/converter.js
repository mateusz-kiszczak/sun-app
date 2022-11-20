//Convert decimal degrees to degrees minutes and seconds.
const convertToDegreesMinutesSeconds = (lat, lng) => {
  let latitude = { degrees: null, minutes: null, seconds: null, direction: '' };
  let longitude = { degrees: null, minutes: null, seconds: null, direction: '' };

  let latDegrees;
  let latMinutes;
  let latSeconds;
  let lngDegrees;
  let lngMinutes;
  let lngSeconds;

  if (lat > 0) {
    if (lat < 1) {
      latDegrees = 0;
      latMinutes = Math.floor(lat * 60);
      latSeconds = Math.floor(((lat * 60) % latMinutes) * 60);
    } else {
      latDegrees = Math.floor(lat);
      latMinutes = Math.floor((lat % latDegrees) * 60);
      latSeconds = Math.floor((((lat % latDegrees) * 60) % latMinutes) * 60);
    }
  } else {
    if (lat > -1) {
      latDegrees = 0;
      latMinutes = Math.abs(Math.ceil(lat * 60));
      latSeconds = Math.abs(Math.ceil(((lat * 60) % latMinutes) * 60));
    } else {
      latDegrees = Math.abs(Math.ceil(lat));
      latMinutes = Math.abs(Math.ceil((lat % latDegrees) * 60));
      latSeconds = Math.abs(Math.ceil((((lat % latDegrees) * 60) % latMinutes) * 60));
    }
  }

  latitude.degrees = isNaN(latDegrees) ? 0 : latDegrees;
  latitude.minutes = isNaN(latMinutes) ? 0 : latMinutes;
  latitude.seconds = isNaN(latSeconds) ? 0 : latSeconds;
  latitude.direction = (lat > 0) ? 'N' : 'S';

  if (lng > 0) {
    if (lng > 0 && lng < 1) {
      lngDegrees = 0;
      lngMinutes = Math.floor(lng * 60);
      lngSeconds = Math.floor(((lng * 60) % lngMinutes) * 60);
    } else {
      lngDegrees = Math.floor(lng);
      lngMinutes = Math.floor((lng % lngDegrees) * 60);
      lngSeconds = Math.floor((((lng % lngDegrees) * 60) % lngMinutes) * 60);
    }
  } else {
    if (lng > -1 && lng < 0) {
      lngDegrees = 0;
      lngMinutes = Math.abs(Math.ceil(lng * 60));
      lngSeconds = Math.abs(Math.ceil(((lng * 60) % lngMinutes) * 60));
    } else {
      lngDegrees = Math.abs(Math.ceil(lng));
      lngMinutes = Math.abs(Math.ceil((lng % lngDegrees) * 60));
      lngSeconds = Math.abs(Math.ceil((((lng % lngDegrees) * 60) % lngMinutes) * 60));
    }
  }

  longitude.degrees = isNaN(lngDegrees) ? 0 : lngDegrees;
  longitude.minutes = isNaN(lngMinutes) ? 0 : lngMinutes;
  longitude.seconds = isNaN(lngSeconds) ? 0 : lngSeconds;
  longitude.direction = (lng > 0) ? 'E' : 'W';

  return {latitude, longitude};
}

export default convertToDegreesMinutesSeconds;
