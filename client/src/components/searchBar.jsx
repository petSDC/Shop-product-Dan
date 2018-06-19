import React from 'react';

const SearchBar = (props) => {
  return (
      <form className="searchBarWrapper">
          <button className="searchButton btn-outline-secondary" type="submit" onClick={props.handleSearch}>
          </button>
         <input className="SearchInput" type="text" className="form-control searchInput" id="inlineFormInputName2" placeholder="Search items" 
          onChange={props.updateSearchState} />
      </form>
  );
};

export default SearchBar;

