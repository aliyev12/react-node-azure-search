import React, {Component} from 'react';
import SearchResults from './SearchResults';
import Context from '../context/Context';
import '../styles/NProgress.css';
import '../styles/SearchUI.css';
import Filter from './Filter';
import Search from './Search';

class SearchUI extends Component {
  static contextType = Context;
  state = {
    searchInput: '',
    searchOptionsDisplay: 'block',
    exactPhraseChecked: false,
    renderFilter: false,
  };

  handleExactPhraseCheck = e => {
    this.setState (state => {
      return {
        exactPhraseChecked: !state.exactPhraseChecked,
      };
    });
  };

  handleChange = e => {
    this.setState ({
      [e.target.name]: e.target.value,
    });
  };

  search = () => {
    const searchValue = encodeURIComponent (this.state.searchInput);
    const searchMode = this.state.exactPhraseChecked ? 'all' : 'any';
    this.context.setSearchValueAndMode(searchValue, searchMode);
    this.context
      .getResults (searchValue, searchMode)
      .then (res => {
          // this.context.getFilterClasses();
      })
      .catch (err => console.log (err));
  };

  clear = onSearch => {
    onSearch ([]);
    this.context.setSearchValueAndMode('', '');
    this.setState ({
      searchInput: '',
    });
  };

  handleKeyPress = target => {
    if (target.charCode == 13) this.search ();
  };

  showHideOptions = () => {
    this.setState (state => {
      return {
        searchOptionsDisplay: state.searchOptionsDisplay === 'none'
          ? 'block'
          : 'none',
      };
    });
  };

  render () {
    return (
      <Context.Consumer>
        {context => (
          <div className="searchui-grid-container">
            <div className="search-container" style={{ marginBottom: '20px' }}>
              <Search
                searchInput={this.state.searchInput}
                handleChange={this.handleChange}
                handleKeyPress={this.handleKeyPress}
                search={this.search}
                clear={this.clear}
              />
            </div>
            {/* <div className="filter-container">
              <Filter />
            </div> */}
            <div className="results-container">
              {context.loading && <div>Loading...</div>}
              {context && context.results.length > 0 && <SearchResults />}
            </div>
          </div>
        )}
      </Context.Consumer>
    );
  }
}

export default SearchUI;



//   executeSearch = () => {
//     let totalHits;
//     let results;
//     const options = {
//       'api-version': url.apiVersion,
//       'api-key': url.apiKey,
//       search: this.state.searchInput,
//       $count: true,
//       $top: 10,
//       $filter: `FEATURE_CLASS eq 'Building' or FEATURE_CLASS eq 'Locale'`,
//       facet: ['rating,sort:value', 'county'],
//     };
//     axios
//       .get (`${url.main}/docs${options}`)
//       .then (res => {
//         totalHits = res.data['@odata.count'];
//         results = res.data.value;
//       })
//       .catch ();
//   };