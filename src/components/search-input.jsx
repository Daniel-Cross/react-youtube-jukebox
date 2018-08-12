import React from 'react';
import '../styles/search-input.css';

const SearchInput = () => {
  return (
    <div className="SearchInput">
      <i className="fa fa-search" aria-hidden="true"></i>
      <input type="text" placeholder="Search" />
    </div>
  );
};

export default SearchInput;
