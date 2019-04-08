import React from 'react';
import '../styles/SearchOptions.css';

const SearchOptions = ({display, exactPhraseChecked, onExactPhraseCheck}) => (
  <div style={{display}} className="searchOptions">
    <label htmlFor="exactPhrase">
        <span className="exactPhraseLabel">Exact Phrase</span>
        <input className="exactPhraseCheckbox" type="checkbox" name="exactPhrase" checked={exactPhraseChecked} onChange={onExactPhraseCheck} />
    </label>
  </div>
);

export default SearchOptions;
