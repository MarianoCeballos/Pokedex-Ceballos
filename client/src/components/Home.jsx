import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPokemons,
  getTypes,
  setPage,
  setLoading,
  filterPokemons,
} from '../redux/actions/actions';
import Cards from './Cards';
import Pagination from './Pagination';
import s from '../Styles/Home.module.css';
import p from '../Styles/Pagination.module.css';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.filteredPokemons);
  const allPokemons = useSelector((state) => state.allPokemons);
  const currentPage = useSelector((state) => state.currentPage);
  const filter = useSelector((state) => state.filter);
  const [pokemonPerPage] = useState(36);
  const isLoading = useSelector((state) => state.loading);
  const history = useHistory();
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemons =
    pokemons && pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = (pageNumber) => dispatch(setPage(pageNumber));

  useEffect(() => {
    !allPokemons.length &&
      dispatch(getTypes())
        .then(() => dispatch(getPokemons()))
        .then(() => dispatch(setLoading(false)));
    pokemons.length && dispatch(setLoading(false));

    if (isLoading === false && pokemons.length === 0 && filter === 'Created') {
      Swal.fire({
        title: 'No pokemons created!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#308',
        cancelButtonText: 'Back',
        confirmButtonText: 'Create one!',
      })
        .then((result) => {
          if (result.isConfirmed) {
            history.push('/create');
          }
        })
        .then(dispatch(filterPokemons('All')));
    } else if (isLoading === false && pokemons.length === 0) {
      Swal.fire({
        title: `No "${filter}" pokemons found`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#308',
        cancelButtonText: 'Back',
        confirmButtonText: 'Create one!',
      })
        .then((result) => {
          if (!result.isConfirmed) {
            dispatch(filterPokemons('All'));
          } else {
            history.push('/create');
          }
        })
        .then(() => dispatch(filterPokemons('All')));
      //
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons]);

  return (
    <div className={s.allCont}>
      {isLoading ? (
        <img
          className={s.img}
          src='https://cdn.dribbble.com/users/946764/screenshots/2844436/media/46fa8f9de66d982fb5da6033c629ebfe.gif'
          alt='Loading...'
        />
      ) : (
        <div className={s.home}>
          {pokemons.length && pokemons.length !== 1 ? (
            <div className={s.paginationBar}>
              <button
                className={p.btn}
                disabled={currentPage <= 1 ? true : false}
                onClick={() => paginate(currentPage - 1)}
              >
                🢀
              </button>

              <Pagination
                pokemonPerPage={pokemonPerPage}
                totalPokemons={pokemons.length}
                paginate={paginate}
                currentPage={currentPage}
              />

              <button
                className={p.btn}
                disabled={
                  currentPokemons.length < pokemonPerPage ? true : false
                }
                onClick={() => paginate(currentPage + 1)}
              >
                🢂
              </button>
            </div>
          ) : null}
          <div className={s.cards}>
            <Cards pokemons={currentPokemons} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
