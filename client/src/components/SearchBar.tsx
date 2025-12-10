import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

type Post = {
  message: string;
  data: Post[];
};

function SearchBar({ query, setQuery }) {
  return (
    <div className='searchbarContainer'>
      <input
        className='searchbar'
        type='text'
        name='query'
        placeholder='Search title...'
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </div>
  );
}

export default SearchBar;
