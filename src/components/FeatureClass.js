import React from 'react';
import '../styles/FeatureClass.css';
import Context from '../context/Context';

const FeatureClass = ({id, name, count, checked, onFacetCheck}) => (
  <Context.Consumer>
    {context => (
      <li className="feature-class">
        <label>
          <input
            type="checkbox"
            onChange={() => context.onFacetCheck (id)}
            checked={checked}
            name="facet"
          />
          {' '}
          &nbsp;
          {name}(<strong>{count}</strong>)
        </label>
      </li>
    )}
  </Context.Consumer>
);

export default FeatureClass;
