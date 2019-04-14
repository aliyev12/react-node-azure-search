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
        <span>
          {featureClass.value}(<strong>{featureClass.count}</strong>)
        </span>
      </li>
    )}
  </Context.Consumer>
);

export default FeatureClass;
