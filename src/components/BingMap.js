import React from 'react';
import {ReactBingmaps} from 'react-bingmaps';

const BingMap = ({ center, pushPins, zoom }) => (
  <ReactBingmaps
    id="bingMap"
    bingmapKey={process.env.REACT_APP_BING_KEY}
    center={center}
    zoom={zoom}
    className="bingMap"
    pushPins={pushPins ? pushPins : ''}
  />
);

export default BingMap;
