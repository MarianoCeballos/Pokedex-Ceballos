import React from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';
import { getPokemons } from '../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import s from '../Styles/Card.module.css';

function Cards({ pokemons }) {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.filteredPokemons);

  return (
    <>
      {pokemon.length === 1
        ? pokemons &&
          pokemons.map((poke) => {
            return (
              <div className={s.cardContAll} key={poke.id}>
                <Link
                  to={{ pathname: `/pokemon/${poke.name}`, state: { poke } }}
                >
                  <Card props={poke} />
                </Link>
                <button
                  onClick={() => dispatch(getPokemons())}
                  className={s.btn}
                >
                  BACK
                </button>
              </div>
            );
          })
        : pokemons &&
          pokemons.map((poke) => {
            return (
              <div className={s.cardContAll} key={poke.id}>
                <Link
                  className={s.link}
                  to={{ pathname: `/pokemon/${poke.name}`, state: { poke } }}
                >
                  <Card props={poke} />
                </Link>
              </div>
            );
          })}
    </>
  );
}

export default Cards;
