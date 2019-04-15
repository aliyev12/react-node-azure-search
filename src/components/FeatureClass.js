import React from 'react';
import '../styles/FeatureClass.css';
import Context from '../context/Context';

const FeatureClass = ({featureClass}) => (
  <Context.Consumer>
    {context => (
      <li
        className="feature-class"
        onClick={context.onFacetCheck.bind(this, featureClass.value)}
      >
        <span title={featureClass.value}>
          {featureClass.value.length <= 8 ? featureClass.value : featureClass.value.slice(0, 7) + '...'}(<strong>{featureClass.count}</strong>)
        </span>
      </li>
    )}
  </Context.Consumer>
);

export default FeatureClass;
