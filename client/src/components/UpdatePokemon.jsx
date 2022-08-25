import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemons, updatePokemon } from '../redux/actions/actions';
import { validateText, validateImage } from '../utils/Validations';
import s from '../Styles/Update_Pokemon.module.css';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

function UpdatePokemon({
  id,
  name,
  image,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
}) {
  const [change, setChange] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
  });
  const [validation, setValidation] = useState({
    name: '',
    exists: '',
    image: '',
    sliders: '',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !validation.exists &&
      !validation.name &&
      !validation.image &&
      !validation.sliders
    ) {
      Swal.fire({
        title: 'Are you sure you want to update values?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update!',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(updatePokemon(input, id))
            .then((r) => history.push(`/home`))
            .then(() => {
              Swal.fire({
                title: 'Updated',
                text: `Pokemon updated!`,
                icon: 'success',
                button: 'OK',
              });
              return dispatch(getPokemons());
            });
          setChange(false);
        }
      });
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setChange(true);
  }

  useEffect(() => {
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
        name: `Pokemon name can't contain symbols, spaces nor numbers`,
      });
    }

    if (input.image.length > 0) {
      if (!validateImage.test(input.image)) {
        return setValidation({ image: 'Image must be valid url!' });
      }
    }

    setValidation({ name: '', exists: '', image: '' });
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

          <div className={s.validations}>
            <button
              className={s.btn}
              disabled={
                validation.name
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

            {validation.name && <h3 className={s.error}>{validation.name}</h3>}
            {validation.sliders && (
              <h3 className={s.error}>{validation.sliders}</h3>
            )}

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

export default UpdatePokemon;
