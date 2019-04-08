import React from 'react';
import Context from '../context/Context';
import SearchOptions from './SearchOptions';

const Search = ({searchInput, handleChange, handleKeyPress, search, clear }) => (
        <Context.Consumer>
            {context => (
                <>
                    <input
                        className="searchInput"
                        type="text"
                        value={searchInput}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        name="searchInput"
                        placeholder="Search..."
                    />
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
