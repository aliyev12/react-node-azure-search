import React from 'react';
import {Link} from 'react-router-dom';

const SearchResult = ({result, index}) => (
  <div className="box">
    <div className="mainContent">
      <div className="body">
        <h1>{result.FEATURE_NAME}</h1>
        <p>{result.DESCRIPTION}</p>
        <span className="featureClass">{result.FEATURE_CLASS}</span>
      </div>
      <div className="learnButtonContainer">
        <Link to={`/items/${result.FEATURE_ID}`}>
          <span className="learnButton">Learn more</span>
        </Link>
      </div>
    </div>
    <div className="resultIndex">
      <div className="number">{index}</div>
    </div>
  </div>
);

export default SearchResult;
