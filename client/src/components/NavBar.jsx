import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import s from '../Styles/Navbar.module.css';
import SearchBar from './SearchBar';
import capitalizeFirstLetter from '../utils/Capitalize';
import {
  filterPokemons,
  orderPokemons,
  setPage,
} from '../redux/actions/actions';

function NavBar() {
  const location = useLocation();
  const allTypes = useSelector((state) => state.allTypes);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  function handleFilter(e) {
    e.preventDefault();
    const filter = e.target.value;
    dispatch(filterPokemons(filter));
    dispatch(setPage(1));
  }
  function handleOrder(e) {
    e.preventDefault();
    const order = e.target.value;
    dispatch(orderPokemons(order));
    dispatch(setPage(1));
  }
  return (
    <header>
      {location.pathname === '/create' ? (
        <nav className={s.nav}>
          <div className={s.linksCreate}>
            <ul>
              <li>
                <NavLink activeClassName={s.links_active} to='/home'>
                  Home{' '}
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <nav className={s.nav}>
          <div className={s.filters}>
            Filter by:
            <select defaultValue={'default'} onChange={(e) => handleFilter(e)}>
              <option value={'default'} disabled>
                {filter || 'Created, All'}
              </option>
              <option value='Api'> Cloud Pokemons</option>
              <option value='All'> All</option>
              <option value='Created'> Created</option>

              <option value={'default'} disabled>
                ---------------Type------------------
              </option>

              {allTypes.map((type) => (
                <option key={type.id} value={type.name}>
                  {capitalizeFirstLetter(type.name)}
                </option>
              ))}
            </select>
            Order by:
            <select defaultValue={'default'} onChange={(e) => handleOrder(e)}>
              <option value={'default'} disabled>
                Name
              </option>
              <option value='asc'> A-Z</option>
              <option value='des'> Z-A</option>
              <option value={'default'} disabled>
                ---------------Attack------------------
              </option>
              <option value='max'> Max-Attack</option>
              <option value='min'> Min-Attack</option>
            </select>
          </div>
          <div className={s.searchBar}>
            <SearchBar />
          </div>

          <div className={s.links}>
            <ul>
              <li>
                <NavLink activeClassName={s.links_active} to='/create'>
                  Create Pokemon!
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}

export default NavBar;
