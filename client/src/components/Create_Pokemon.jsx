import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon, getPokemons, getTypes } from '../redux/actions/actions';
import { validateText, validateImage } from '../utils/Validations';
import s from '../Styles/Create_Pokemon.module.css';
import img from '../utils/img/types';
import capitalizeFirstLetter from '../utils/Capitalize';

function Create_Pokemon() {
  const history = useHistory();
  const allTypes = useSelector((state) => state.allTypes);
  const allPokemons = useSelector((state) => state.allPokemons);
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: '',
    image: '',
    hp: 1,
    attack: 1,
    defense: 1,
    speed: 1,
    height: 1,
    weight: 1,
    type: [],
  });
  const [validation, setValidation] = useState({
    name: '',
    exists: '',
    type: '',
    image: '',
    sliders: '',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !validation.exists &&
      !validation.name &&
      !validation.type &&
      !validation.image &&
      !validation.sliders
    ) {
      dispatch(createPokemon(input))
        .then((r) => history.push(`/pokemon/${r}`))
        .then(() => dispatch(getPokemons()));
      setInput({
        name: '',
        image: '',
        hp: 1,
        attack: 1,
        defense: 1,
        speed: 1,
        height: 1,
        weight: 1,
        type: [],
      });
      for (let i = 8; i < 28; i++) {
        e.target[i].checked = false;
      }
      setChange(false);
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setChange(true);
  }

  function handleChkBox(e) {
    if (input.type.length === 2) {
      if (e.target.checked) {
        e.target.checked = false;
        return;
      }
    }
    var typeInp = [...input.type];
    const value = e.target.value;
    const index = typeInp.findIndex((i) => i === parseInt(value));
    if (index > -1) {
      typeInp = [...typeInp.slice(0, index), ...typeInp.slice(index + 1)];
    } else {
      typeInp.push(parseInt(value));
    }
    setInput({ ...input, type: typeInp });
  }

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
    setChange(false);
  }, [dispatch]);

  useEffect(() => {
    change && validate();
  }, [input]);

  const validate = () => {
    if (
      input.hp > 100 ||
      input.hp < 1 ||
      input.attack > 100 ||
      input.attack < 1 ||
      input.defense > 100 ||
      input.defense < 1 ||
      input.speed > 100 ||
      input.speed < 1 ||
      input.height > 100 ||
      input.height < 1 ||
      input.weight > 100 ||
      input.weight < 1
    ) {
      return setValidation({
        sliders: 'Please select a number between 0 and 100',
      });
    }
    if (input.name.length === 0) {
      return setValidation({ name: 'Name is required!' });
    }
    if (input.name.length < 5) {
      return setValidation({ name: 'Name is too short!' });
    }
    if (validateText.test(input.name) === false) {
      return setValidation({
        name: `Pokemon name can't contain symbols, spaces and numbers`,
      });
    }

    if (input.image.length > 0) {
      if (!validateImage.test(input.image)) {
        return setValidation({ image: 'Image must be valid url!' });
      }
    }

    if (allPokemons.find((p) => p.name === input.name)) {
      return setValidation({ exists: 'Pokemon already exists!' });
    }
    if (input.type.length === 0) {
      return setValidation({ type: 'At least one type is required' });
    }
    setValidation({ name: '', exists: '', type: '', image: '' });
  };

  return (
    <div className={s.create_pokemon}>
      <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={s.container}>
          <div className={s.left}>
            <label>Name:</label>
            <input
              onChange={(e) => handleChange(e)}
              name='name'
              value={input.name}
              type='text'
            />
            <label>Paste image (url):</label>
            <input
              onChange={(e) => handleChange(e)}
              value={input.image}
              type='url'
              name='image'
              min='1'
              max='100'
            />

            <label>HP: {input.hp}</label>
            <input
              onChange={(e) => handleChange(e)}
              value={input.hp}
              type='range'
              name='hp'
              min='1'
              max='100'
            />

            <label>Attack: {input.attack}</label>
            <input
              onChange={(e) => handleChange(e)}
              value={input.attack}
              type='range'
              name='attack'
              min='1'
              max='100'
            />

            <label>Defense: {input.defense}</label>
            <input
              onChange={(e) => handleChange(e)}
              value={input.defense}
              type='range'
              name='defense'
              min='1'
              max='100'
            />
            <label>Speed: {input.speed}</label>
            <input
              onChange={(e) => handleChange(e)}
              value={input.speed}
              type='range'
              name='speed'
              min='1'
              max='100'
            />

            <label>Height: {input.height}</label>
            <input
              onChange={(e) => handleChange(e)}
              value={input.height}
              type='range'
              name='height'
              min='1'
              max='100'
            />

            <label>Weight: {input.weight}</label>
            <input
              onChange={(e) => handleChange(e)}
              value={input.weight}
              type='range'
              name='weight'
              min='1'
              max='100'
            />
          </div>

          <div className={s.right}>
            <h3> SELECT TYPE (max 2 ): </h3>
            <div className={s.types}>
              {allTypes.length > 0 ? (
                allTypes.map((item) => (
                  <div className={s.input} key={item.id}>
                    <img
                      className={s.image}
                      src={img[item.name]}
                      alt={item.name}
                    />
                    <input
                      required={input.type.length > 0 ? false : true}
                      onChange={(e) => handleChkBox(e)}
                      name='type'
                      value={item.id}
                      type='checkbox'
                    />
                    <div className={s.typeName}>
                      {capitalizeFirstLetter(item.name)}
                    </div>
                  </div>
                ))
              ) : (
                <h4>Loading types...</h4>
              )}
            </div>
          </div>
          <div className={s.validations}>
            <button
              className={s.btn}
              disabled={
                validation.name
                  ? true
                  : false || validation.type
                  ? true
                  : false || validation.exists
                  ? true
                  : false || validation.image
                  ? true
                  : false || validation.sliders
                  ? true
                  : false || change === false
                  ? true
                  : false
              }
            >
              Submit
            </button>
            <button onClick={() => history.push('/home')} className={s.btn}>
              Back
            </button>
            {validation.name && <h3 className={s.error}>{validation.name}</h3>}
            {validation.sliders && (
              <h3 className={s.error}>{validation.sliders}</h3>
            )}
            {validation.type && <h3 className={s.error}>{validation.type}</h3>}
            {validation.image && (
              <h3 className={s.error}>{validation.image}</h3>
            )}
            {validation.exists && (
              <h3 className={s.error}>{validation.exists}</h3>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create_Pokemon;
