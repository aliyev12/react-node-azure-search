import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/SearchResult.css';

const SearchResult = ({result, index}) => {
  const featureName = result['@search.highlights'] &&
    result['@search.highlights'].FEATURE_NAME &&
    result['@search.highlights'].FEATURE_NAME.length > 0
    ? result['@search.highlights'].FEATURE_NAME[0]
    : result.FEATURE_NAME;
  const description = result['@search.highlights'] &&
    result['@search.highlights'].DESCRIPTION &&
    result['@search.highlights'].DESCRIPTION.length > 0
    ? result['@search.highlights'].DESCRIPTION[0]
    : result.DESCRIPTION;
  return (
    <div className="box">
      <div className="mainContent">
        <div className="body">
          <h1 dangerouslySetInnerHTML={{__html: featureName}} />
          <p dangerouslySetInnerHTML={{ __html: description }} />
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
};

export default SearchResult;
