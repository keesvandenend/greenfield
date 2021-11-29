import React, { ReactElement, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }: any) => <div style={{ height: '100vh', width: '100%' }}>{text}</div>;

const defaultProps = {
  center: {
    lat: 41.7040242,
    lng: -87.6391438
  },
  zoom: 14
};

const MapWrapper = (props: any) => {
  const mergedProps = {...defaultProps, ...props};
  const { center, zoom } = mergedProps;
  console.log('center, zoom', center, zoom);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyA9391Y42owd9G11vyuo99LeZEW_90yOf4' }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

export default MapWrapper;
