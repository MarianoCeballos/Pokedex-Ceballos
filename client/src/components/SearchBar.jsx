import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonBySearch } from '../redux/actions/actions';
import s from '../Styles/SearchBar.module.css';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        dispatch(getPokemonBySearch(e.target.value));
    };

    return (
        <form className={s.search}>
            <div className={s.input}>
                <input
                    value={search}
                    onChange={(e) => handleChange(e)}
                    type='text'
                    placeholder='Search pokémon'
                />
            </div>
            <div>
                <input
                    className={s.searchButton}
                    type='submit'
                    value='Search'
                />
            </div>
        </form>
    );
};

export default SearchBar;
