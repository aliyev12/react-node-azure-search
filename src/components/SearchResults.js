import React from 'react';
import SearchResult from './SearchResult';
import Context from '../context/Context';
import Filter from './Filter';
import '../styles/SearchResults.css';

const SearchResults = props => {
  return (
    <Context.Consumer>
      {context => (
        <div className="searchResultsContainer" >
            <div className="filter-container">
            <Filter />
            </div>
          
          <div className="search-results">
            <h1>{context.count} Results</h1>
            <div className="gridLook">
              {context.results.map ((result, i) => (
                <SearchResult
                  key={result.FEATURE_ID}
                  result={result}
                  index={i + 1}
                />
              ))}
            </div>
          </div>

        </div>
      )}
    </Context.Consumer>
  );
};

// class SearchResults extends Component {
//   static contextType = Context;
//   render () {
//     return (
//       <div className="searchResultsContainer">

//         <div className="gridLook">
//           {this.context.results.map ((result, i) => (
//             <SearchResult
//               key={result.FEATURE_ID}
//               result={result}
//               index={i + 1}
//             />
//           ))}
//         </div>

//         {/* <table className="resultsTable">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Class</th>
//               <th>State</th>
//               <th>Location</th>
//               <th>Elevation</th>
//               <th>Map Name</th>
//               <th>Description</th>
//               <th>History</th>
//             </tr>
//           </thead>
//           <tbody>
//               {this.props.results.map((result, i) => (
//                   <SearchResult key={result.FEATURE_ID} result={result} index={i + 1}></SearchResult>
//               ))}
//           </tbody>
//         </table> */}
//       </div>
//     );
//   }
// }

export default SearchResults;
