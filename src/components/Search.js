import React from 'react';
import Context from '../context/Context';
import SearchOptions from './SearchOptions';
import '../styles/Search.css';

const Search = ({
    searchInput, 
    distanceOption, 
    changeDistanceOption, 
    handleChange, 
    handleKeyPress, 
    search, 
    clear,
    handleKeyUp,
    suggestionIndex
 }) => (
        <Context.Consumer>
            {context => (
                <>
                    <input
                        className="searchInput"
                        type="text"
                        value={searchInput}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp.bind(this, suggestionIndex)}
                        onKeyPress={handleKeyPress}
                        name="searchInput"
                        placeholder="Search..."
                    />
                    <select value={distanceOption} onChange={changeDistanceOption} name="distanceOption" id="distanceOption">
                        <option value="relevance">by relevance</option>
                        <option value="distance">by distance</option>
                    </select>
                    <div className="searchButton-container">
                        <button
                            className="searchButton"
                            type="button"
                            onClick={search}
                        >
                            Search{context.loading && 'ing'}
                        </button>
                        <button
                            className="searchButton"
                            type="button"
                            onClick={clear.bind(this, context.onSearch)}
                        >
                            Clear
                        </button>
                        <button
                            className="searchButton"
                            type="button"
                            onClick={context.showHideOptions}
                        >
                            Options
                        </button>
                    </div>

                    <SearchOptions
                        display={context.searchOptionsDisplay}
                        onExactPhraseCheck={context.handleExactPhraseCheck}
                        exactPhraseChecked={context.exactPhraseChecked}
                    />
                </>
            )}
        </Context.Consumer>
    );


export default Search;
