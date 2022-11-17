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
        <div>
            <input
                className={s.input}
                value={search}
                onChange={(e) => handleChange(e)}
                type='text'
                placeholder='Search pokémon'
            />
        </div>
    );
};

export default SearchBar;
