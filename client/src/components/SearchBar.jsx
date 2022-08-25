import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonBySearch, setPage } from '../redux/actions/actions';
import s from '../Styles/SearchBar.module.css';
import { useHistory } from 'react-router-dom';

function SearchBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  function handleClick(e) {
    e.preventDefault();
    if (search) {
      dispatch(getPokemonBySearch(search.toLowerCase())).then((r) => {
        if (r) {
          dispatch(setPage(1));
        }
        history.push('/home');
        setSearch('');
      });
    }
  }

  return (
    <form onSubmit={(e) => handleClick(e)} className={s.search}>
      <div className={s.input}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type='text'
          placeholder='Search pokémon'
        />
      </div>
      <div>
        <input className={s.searchButton} type='submit' value='Search' />
      </div>
    </form>
  );
}

export default SearchBar;
