import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPokemons, getTypes } from '../redux/actions/actions';
import s from '../Styles/Welcome.module.css';
const Welcome = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className={s.background}>
      <Link to='/home'>
        <button className={s.pokeball__button}>ENTER</button>
      </Link>
    </div>
  );
};

export default Welcome;
