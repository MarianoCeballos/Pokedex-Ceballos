import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearPokemons,
  deletePokemon,
  getPokemonDetail,
} from '../redux/actions/actions';
import s from '../Styles/CardDetails.module.css';
import typeImg from '../utils/img/types';
import { useState } from 'react';
import UpdatePokemon from './UpdatePokemon';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

function CardDetails() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [modify, setModify] = useState(false);
  const { poke } = useSelector((state) => state);

  function handleDelete(e) {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePokemon(poke.id)).then(() => history.push('/home'));
      }
    });
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPokemonDetail(id)).then((r) => {
      if (!r) {
        history.push('/home');
      }
    });
    return () => {
      dispatch(clearPokemons());
    };
  }, []);
  useEffect(() => {}, [poke]);

  function handleUpdate(e) {
    e.preventDefault();
    setModify(!modify);
  }

  return (
    <div className={s.cont}>
      {poke && poke.name ? (
        <div className={s.container}>
          <div className={s.card}>
            {modify ? (
              <UpdatePokemon
                id={poke.id}
                name={poke.name}
                image={poke.image}
                hp={poke.hp}
                attack={poke.attack}
                defense={poke.defense}
                height={poke.height}
                weight={poke.weight}
                speed={poke.speed}
              />
            ) : poke.name ? (
              <>
                <div className={s.pokeName}>
                  <h2>{poke.name.toUpperCase()}</h2>
                </div>
                <img src={poke.image} alt={poke.name} />
                <div className={s.stats}>
                  <h3>STATS:</h3>
                  <h4>
                    <span role='img' aria-label='emoji'>
                      💖
                    </span>{' '}
                    HP: {poke.hp}
                  </h4>
                  <h4>
                    <span role='img' aria-label='emoji'>
                      🔥
                    </span>{' '}
                    Attack: {poke.attack}
                  </h4>
                  <h4>
                    <span role='img' aria-label='emoji'>
                      🛡️
                    </span>{' '}
                    Defense: {poke.defense}
                  </h4>
                  <h4>
                    <span role='img' aria-label='emoji'>
                      📏
                    </span>{' '}
                    Height: {poke.height}
                  </h4>
                  <h4>
                    <span role='img' aria-label='emoji'>
                      🏋️
                    </span>{' '}
                    Weight: {poke.weight}
                  </h4>
                  <h4>
                    <span role='img' aria-label='emoji'>
                      ⚡
                    </span>{' '}
                    Speed: {poke.speed}
                  </h4>
                </div>
              </>
            ) : null}

            <div className={s.types}>
              <h3>TYPES: </h3>
              {poke.types &&
                poke.types.map((type) => (
                  <h4 className={s.pokeName} key={type.id}>
                    {type.name.toUpperCase()}
                    <img src={typeImg[type.name]} alt={type.name} />
                  </h4>
                ))}
            </div>
            {!poke.api ? (
              <div className={s.buttons}>
                <button onClick={(e) => handleDelete(e)} className={s.delBtn}>
                  Delete Pokemon
                </button>
                <button onClick={(e) => handleUpdate(e)} className={s.delBtn}>
                  {modify ? 'Cancel' : ' Modify Pokemon'}
                </button>
              </div>
            ) : null}
          </div>
          <button className={s.btn} onClick={() => window.history.back()}>
            Back
          </button>
        </div>
      ) : (
        <img
          className={s.img}
          src='https://cdn.dribbble.com/users/946764/screenshots/2844436/media/46fa8f9de66d982fb5da6033c629ebfe.gif'
          alt='Loading...'
        />
      )}
    </div>
  );
}

export default CardDetails;
