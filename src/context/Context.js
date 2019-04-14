import React from 'react';
import axios from 'axios';
import {headers, getIndexDocsUrl} from '../lib/api';
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
    searchOptionsDisplay: 'none',
    exactPhraseChecked: false,
    featureClasses: [],
    checkedFacets: [],
  };

  onFacetCheck = async facetValue => {
    if (!this.state.checkedFacets.includes (facetValue)) {
      const updatedCheckedFacets = [...this.state.checkedFacets, facetValue];
      await this.setState ({checkedFacets: updatedCheckedFacets});
    }
    await this.getResults (this.state.searchValue, this.state.searchMode);
  };

  getResults = (val, searchMode) => {
    let filterString = '';
    // If there currently are any checked facets, then build a filter string
    if (this.state.checkedFacets.length > 0) {
      this.state.checkedFacets.forEach ((facet, i) => {
        if (this.state.checkedFacets.length === 1) {
          filterString += `FEATURE_CLASS eq '${facet}'`;
        } else if (this.state.checkedFacets.length > 1 && i === 0) {
          filterString += `FEATURE_CLASS eq '${facet}'`;
        } else {
          filterString += `and FEATURE_CLASS eq '${facet}'`;
        }
      });
    }

    const options = {
      search: val,
      highlight: 'FEATURE_NAME,DESCRIPTION',
      searchMode,
      $count: true,
      $filter: filterString,
      facet: 'FEATURE_CLASS,count:20',
    };
    return new Promise (async (resolve, reject) => {
      try {
        NProgress.start ();
        this.setState ({loading: true});
        const res = await axios ({
          method: 'get',
          url: getIndexDocsUrl (options),
          headers,
          withCredentials: false,
        });
        this.setState ({
          featureClasses: res.data['@search.facets'].FEATURE_CLASS,
          results: res.data.value,
          count: res.data['@odata.count'],
          loading: false,
        });
        resolve (res.data);
        NProgress.done ();
      } catch (err) {
        console.log (err);
        reject (err);
      }
    });
  };

  clearAllCheckedFacets = async () => {
    await this.setState ({
      checkedFacets: [],
    });
    await this.getResults (this.state.searchValue, this.state.searchMode);
  };

  clearCheckedFacet = async checkedFacet => {
    const updatedCheckedFacets = this.state.checkedFacets.filter (
      cf => cf !== checkedFacet
    );
    await this.setState ({checkedFacets: updatedCheckedFacets});
    await this.getResults (this.state.searchValue, this.state.searchMode);
  };

  render () {
    return (
      <Context.Provider
        value={{
          ...this.state,
          getResults: this.getResults,
          handleExactPhraseCheck: () =>
            this.setState (state => ({
              exactPhraseChecked: !state.exactPhraseChecked,
            })),
          showHideOptions: () =>
            this.setState (state => ({
              searchOptionsDisplay: state.searchOptionsDisplay === 'none'
                ? 'block'
                : 'none',
            })),
          onFacetCheck: this.onFacetCheck,
          clearAllCheckedFacets: this.clearAllCheckedFacets,
          clearCheckedFacet: this.clearCheckedFacet,
          setSearchValueAndMode: (searchValue, searchMode) => {
            this.setState ({searchValue, searchMode});
          },
          //   getFilterClasses: () =>
          //     this.setState ({
          //       filterClasses: this.state.featureClasses.map (fc => ({
          //         id: uniqid (),
          //         name: fc.value,
          //         count: fc.count,
          //         checked: false,
          //       })),
          //     }),
          setFiltersNeedsUpdate: () =>
            this.setState ({filtersNeedsUpdate: false}),
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
export {Store};

//onFacetCheck =  (facetValue, checked) => {

//   if (checked === 'checked') {
//     let updatedCheckedFacets =  [...this.state.checkedFacets];
//     if (!updatedCheckedFacets.includes(facetValue)) {
//         updatedCheckedFacets = [...updatedCheckedFacets, facetValue]
//     }
//      this.setState({
//         checkedFacets: updatedCheckedFacets,
//         filtersNeedsUpdate: {
//             yes: true,
//             facetValue,
//             value: facetValue === 'checked' ? true : false
//         }
//     })
//   } else {
//       const updatedCheckedFacets =  this.state.checkedFacets.filter(checkedFacet => checkedFacet !== facetValue);
//       console.log('updatedCheckedFacets ==>', updatedCheckedFacets);
//        this.setState({
//         checkedFacets: updatedCheckedFacets,
//         filtersNeedsUpdate: {
//             yes: true,
//             facetValue,
//             value: facetValue === 'checked' ? true : false
//         }
//       });
//   }

//this.getResults (this.state.searchValue, this.state.searchMode);

/////////////=====//////
// await this.setState ({
//     filterClasses: this.state.featureClasses.map (fc => ({
//       id: uniqid (),
//       name: fc.value,
//       count: fc.count,
//       checked: false,
//     }))
// });

/*
    const updatedFilters = await this.state.filterClasses.filter (el => {
      const featureValues = this.state.featureClasses.map (mfc => {
        return mfc.value;
      });
      const condition = featureValues.includes (el.name);
      return condition;
    });
    const updatedClasses = await updatedFilters.map (filterClass => {
      if (filterClass.id === id) {
        filterClass.checked = !filterClass.checked;
      }
      return filterClass;
    });
    */

// const updatedClasses = this.state.filterClasses.map (filterClass => {
//   if (filterClass.id === id) {
//     filterClass.checked = !filterClass.checked;
//   }
//   return filterClass;
// });

/*
    const updatedCheckedFacets = await updatedClasses
      .filter (uc => uc.checked)
      .map (el => el.name);
    await this.setState ({
      filterClasses: updatedClasses,
      facets: updatedCheckedFacets,
    });
    */
//};
