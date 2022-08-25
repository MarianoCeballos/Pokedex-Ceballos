import React from 'react';
import typeImg from '../utils/img/types';
import capitalizeFirstLetter from '../utils/Capitalize';
import s from '../Styles/Card.module.css';

function Card({ props }) {
  let customStyle =
    props && !props.api ? { backgroundColor: '#e74c3c', color: '#ffff' } : {};

  return (
    <div className={s.container}>
      {props && !props.api ? (
        <div style={customStyle} className={s.card}>
          <div className={s.pokeName}>
            <span>Created by user</span>
            <h1>{props.name.toUpperCase()}</h1>
          </div>
          <div className={s.imgContainer}>
            <img className={s.pokeImg} src={props.image} alt={props.name} />
          </div>
          <h3 className={s.types}>
            {props.types &&
              props.types.map((type) => (
                <div className={s.typeDetails} key={type.id}>
                  {capitalizeFirstLetter(type.name)}
                  <img
                    className={s.typeImage}
                    src={typeImg[type.name]}
                    alt={type.name}
                  />
                </div>
              ))}
          </h3>
        </div>
      ) : (
        <div style={customStyle} className={s.card}>
          <div className={s.pokeName}>
            <span className={s.number}>{props.id}</span>
            <h1>{props.name.toUpperCase()}</h1>
          </div>
          <div className={s.imgContainer}>
            <img className={s.pokeImg} src={props.image} alt={props.name} />
          </div>
          <h3 className={s.types}>
            {props.types &&
              props.types.map((type) => (
                <div className={s.typeDetails} key={type.id}>
                  {capitalizeFirstLetter(type.name)}
                  <img
                    className={s.typeImage}
                    src={typeImg[type.name]}
                    alt={type.name}
                  />
                </div>
              ))}
          </h3>
        </div>
      )}
    </div>
  );
}

export default Card;
