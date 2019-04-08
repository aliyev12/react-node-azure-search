import React from 'react';
import axios from 'axios';
import { headers, getIndexDocsUrl} from '../lib/api';
import NProgress from 'nprogress';
import uniqid from 'uniqid';

const Context = React.createContext ();

class Store extends React.Component {
  state = {
    searchValue: '',
    searchMode: '',
    results: [],
    count: 0,
    loading: false,
    searchOptionsDisplay: 'block',
    exactPhraseChecked: false,
    filterClasses: [],
    facets: [],
    featureClasses: []
  };

  setSearchValueAndMode = (searchValue, searchMode) => {
      this.setState({ searchValue, searchMode });
  }

/*=== ON FACET CHECK ===*/
  onFacetCheck = async id => {
    const updatedClasses = this.state.filterClasses.map (facetClass => {
      if (facetClass.id === id) {
        facetClass.checked = !facetClass.checked;
      }
      return facetClass;
    });
    const updatedCheckedFacets = updatedClasses
      .filter (uc => uc.checked)
      .map (el => el.name);
    await this.setState ({
      filterClasses: updatedClasses,
      facets: updatedCheckedFacets,
    });
    this.getResults (this.state.searchValue, this.state.searchMode);
  };

  clearAllCheckedFacets = async () => {
    const updatedClasses = this.state.filterClasses.map (cl => {
      cl.checked = false;
      return cl;
    });
    const updatedCheckedFacets = updatedClasses
      .filter (uc => uc.checked)
      .map (el => el.name);
    await this.setState ({
      filterClasses: updatedClasses,
      facets: updatedCheckedFacets,
    });
    this.getResults (this.state.searchValue, this.state.searchMode);
  };

  handleExactPhraseCheck = () => {
    this.setState (state => {
      return {
        exactPhraseChecked: !state.exactPhraseChecked,
      };
    });
  };

  onSearch = (results, count) => {
    this.setState ({
      results,
      count,
    });
  };

  onLoadingStateChange = loadingState => {
    this.setState ({loading: loadingState});
  };

  getFilterClasses = async () => {
    const classes = [];
    await this.state.featureClasses.forEach(fc => {
        classes.push ({
            id: uniqid (),
            name: fc.value,
            count: fc.count,
            checked: false,
          });
    });
    // const featureClasses = this.state.results.map (
    //   result => result.FEATURE_CLASS
    // );
    // const uniqueFeatureClasses = [...new Set (featureClasses)];

    // uniqueFeatureClasses.forEach (uc => {
    //   let occurences = 0;
    //   featureClasses.forEach (fc => {
    //     if (fc === uc) {
    //       occurences = occurences + 1;
    //     }
    //   });
    //   classes.push ({
    //     id: uniqid (),
    //     name: uc,
    //     count: occurences,
    //     checked: false,
    //   });
    // });
    
    this.setState ({filterClasses: classes});
  }

  getResults = (val, searchMode) => {
    let filterString = '';
    // this.state.filterClasses.forEach ((facet, i) => {
    //   if (this.state.filterClasses.length === 1) {
    //     filterString += `FEATURE_CLASS eq '${facet.value}'`;
    //   } else if (this.state.filterClasses.length > 1 && i === 0) {
    //     filterString += `FEATURE_CLASS eq '${facet.value}'`;
    //   } else {
    //     filterString += `or FEATURE_CLASS eq '${facet.value}'`;
    //   }
    // });
    this.state.facets.forEach ((facet, i) => {
      if (this.state.facets.length === 1) {
        filterString += `FEATURE_CLASS eq '${facet}'`;
      } else if (this.state.facets.length > 1 && i === 0) {
        filterString += `FEATURE_CLASS eq '${facet}'`;
      } else {
        filterString += `or FEATURE_CLASS eq '${facet}'`;
      }
    });
    const options = {
      search: val,
      searchMode,
      $count: true,
      $filter: filterString,
      facet: 'FEATURE_CLASS',
    };
    return new Promise (async (resolve, reject) => {
      try {
        NProgress.start ();
        this.onLoadingStateChange (true);
        const res = await axios ({
          method: 'get',
          url: getIndexDocsUrl (options),
          headers,
          withCredentials: false,
        });
        this.onSearch (res.data.value, res.data['@odata.count']);
        this.setState({ featureClasses: res.data['@search.facets'].FEATURE_CLASS });
        this.onLoadingStateChange (false);
        resolve(res.data);
        NProgress.done ();
      } catch (err) {
        console.log (err);
        reject (err);
      }
    });
  };

  // I stopped at trying to figure out why I'm not seeing the @search.facerts in axios response...

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
      <Context.Provider
        value={{
          ...this.state,
          onSearch: this.onSearch,
          onLoadingStateChange: this.onLoadingStateChange,
          getResults: this.getResults,
          setFacets: this.setFacets,
          handleExactPhraseCheck: this.handleExactPhraseCheck,
          showHideOptions: this.showHideOptions,
          onFacetCheck: this.onFacetCheck,
          clearAllCheckedFacets: this.clearAllCheckedFacets,
          setSearchValueAndMode: this.setSearchValueAndMode,
          getFilterClasses: this.getFilterClasses,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
export {Store};
