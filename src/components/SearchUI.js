import React, {Component} from 'react';
import SearchResults from './SearchResults';
import Context from '../context/Context';
import '../styles/NProgress.css';
import '../styles/SearchUI.css';
import Search from './Search';
import {ReactBingmaps} from 'react-bingmaps';

class SearchUI extends Component {
  static contextType = Context;
  state = {
    searchInput: '',
    searchOptionsDisplay: 'block',
    exactPhraseChecked: false,
    renderFilter: false,
    pushPins: [],
    center: [40.291206,-99.930606],
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
    this.context.setSearchValueAndMode (searchValue, searchMode);
    this.context
      .getResults (searchValue, searchMode)
      .then (async res => {
          console.log(res);
          const coordinates = res.value.map(r => r.LOCATION.coordinates);
          const center = [coordinates[0][1], coordinates[0][0]];
          const pushPins = coordinates.map(coordinate => {
            return {
                location: [coordinate[1], coordinate[0]],
                option: {color: 'red'},
                addHandler: {type: 'click', callback: this.callBackMethod.bind(this, coordinate)},
            }
          });
          await this.setState({ pushPins, center });
          console.log('this.state.pushPins = ', this.state.pushPins);

      })
      .catch (err => console.log (err));
  };

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
    console.log('hey...');
  }

  render () {
    return (
      <Context.Consumer>
        {context => (
          <div className="searchui-grid-container">
            <div className="search-container" style={{marginBottom: '20px'}}>
              <Search
                searchInput={this.state.searchInput}
                handleChange={this.handleChange}
                handleKeyPress={this.handleKeyPress}
                search={this.search}
                clear={this.clear}
              />
            </div>
            <div className="results-container">
              {context.loading && <div>Loading...</div>}
              {context && context.results.length > 0 && <SearchResults />}
            </div>
            <div className="map-container">
              <ReactBingmaps
                id="bingMap"
                bingmapKey={process.env.REACT_APP_BING_KEY}
                center={this.state.center}
                zoom={7}
                className="bingMap"
                pushPins={this.state.pushPins ? this.state.pushPins : ''}
              />
            </div>
          </div>
        )}
      </Context.Consumer>
    );
  }
}

export default SearchUI;

{
  /* <div>
                <iframe
                  title="bingMap"
                  width="500"
                  height="400"
                  frameBorder="0"
                  src="https://www.bing.com/maps/embed?h=400&w=500&cp=38.835858436121015~-77.26374101562499&lvl=11&typ=d&sty=h&src=SHELL&FORM=MBEDV8"
                  scrolling="no"
                />
                <div
                  style={{
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    width: '500px',
                    padding: '6px 0',
                  }}
                >
                  <a
                    id="largeMapLink"
                    target="_blank"
                    href="https://www.bing.com/maps?cp=38.835858436121015~-77.26374101562499&amp;sty=h&amp;lvl=11&amp;FORM=MBEDLD"
                  >
                    View Larger Map
                  </a>
                  {' '}
                  &nbsp; | &nbsp;
                  <a
                    id="dirMapLink"
                    target="_blank"
                    href="https://www.bing.com/maps/directions?cp=38.835858436121015~-77.26374101562499&amp;sty=h&amp;lvl=11&amp;rtp=~pos.38.835858436121015_-77.26374101562499____&amp;FORM=MBEDLD"
                  >
                    Get Directions
                  </a>
                </div>
              </div> */
}
