import React, {Component} from 'react';
import SearchResults from './SearchResults';
import Context from '../context/Context';
import '../styles/NProgress.css';
import '../styles/SearchUI.css';
import Search from './Search';
import BingMap from './BingMap';
import {getUserLocation} from '../lib/api';

class SearchUI extends Component {
  static contextType = Context;
  state = {
    searchInput: '',
    distanceOption: 'relevance',
    latitude: 0,
    longitude: 0,
    searchOptionsDisplay: 'block',
    exactPhraseChecked: false,
    renderFilter: false,
    pushPins: [],
    center: [40.291206, -99.930606],
    zoom: 4,
    lastKeyUpAt: new Date().getTime(),
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
      if (this.context.loading) {
          return alert('Please wait until loading is complete');
      }
    const searchValue = encodeURIComponent (this.state.searchInput);
    const searchMode = this.state.exactPhraseChecked ? 'all' : 'any';
    this.context.setSearchValueAndMode (searchValue, searchMode);

        this.context
          .getResults (searchValue, searchMode, this.state.distanceOption, this.state.longitude, this.state.latitude)
          .then (async res => {
            const coordinates = res.value.map (r => r.LOCATION.coordinates);
            const center = [coordinates[0][1], coordinates[0][0]];
            const pushPins = coordinates.map (coordinate => {
              return {
                location: [coordinate[1], coordinate[0]],
                option: {color: 'red'},
                addHandler: {
                  type: 'click',
                  callback: this.callBackMethod.bind (this, coordinate),
                },
              };
            });
            await this.setState ({pushPins, center, zoom: 9});
          })
          .catch (err => console.log (err));
    }

  clear = onSearch => {
    onSearch ([]);
    this.context.setSearchValueAndMode ('', '');
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

  callBackMethod = () => {
    console.log ('hey...');
  };

  changeDistanceOption = e => {
    console.log (e.target.value);
    if (e.target.value === 'distance') {
        this.context.setLoading(true);
        getUserLocation().then(res => {
            this.setState({
                latitude: res.latitude,
                longitude: res.longitude
            });
            this.context.setLoading(false);
        });

    }
    this.setState ({[e.target.name]: e.target.value});
  };

  handleKeyUp = (suggestionIndex, e) => {
    const currentTime = new Date().getTime();
    if (currentTime - this.state.lastKeyUpAt > 2000) {
        // this.context
        //   .getResults (e.target.value, this.state.exactPhraseChecked ? 'all' : 'any', this.state.distanceOption, this.state.longitude, this.state.latitude, true)
        //   .then (res => console.log('ON KEY UP STUFF ===>  ',res))
        //   .catch (err => console.log (err));
        console.log('This is where sugestions are brought in...');


        this.setState({ lastKeyUpAt: new Date().getTime() });
    }
  }

  render () {
      let results;
      let loadingContext;
      if (this.state.distanceOption === 'distance' && this.state.latitude === 0 && this.state.longitude === 0) {
        loadingContext = <div><h1>Loading your location...</h1></div>
      } else {
        loadingContext = <div><h1>Loading...</h1></div>
      }

      if (this.context.loading) {
        results = loadingContext;
      } else if (!this.context.loading && this.context && this.context.results.length > 0) {
        results = <SearchResults />;
      }

    return (
      <Context.Consumer>
        {context => (
          <div className="flex-wrapper">
            <div className="searchui-grid-container">
              <div className="search-container" style={{marginBottom: '20px'}}>
                <Search
                  searchInput={this.state.searchInput}
                  distanceOption={this.state.distanceOption}
                  changeDistanceOption={this.changeDistanceOption}
                  handleChange={this.handleChange}
                  handleKeyPress={this.handleKeyPress}
                  search={this.search}
                  clear={this.clear}
                  handleKeyUp={this.handleKeyUp}
                  suggestionIndex={this.state.suggestionIndex}
                />
              </div>
              <div className="results-container">
                {results}
              </div>
            </div>

            <div className="map-container">
              <BingMap
                zoom={this.state.zoom}
                pushPins={this.state.pushPins}
                center={this.state.center}
              />
            </div>
          </div>
        )}
      </Context.Consumer>
    );
  }

}

export default SearchUI;

