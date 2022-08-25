import axios from 'axios';
import {
  GET_POKEMONS,
  FILTERED_POKEMONS,
  CREATE_POKEMON,
  GET_TYPES,
  GET_POKEMON_BY_PARAM,
  ORDERED_POKEMONS_ATTACK,
  ORDERED_POKEMONS_NAME,
  FILTER_BY_TYPE,
  SET_PAGE,
  LOADING,
  DELETE_POKEMON,
  GET_POKEMON_DETAIL,
} from './actionTypes';
import Swal from 'sweetalert2';
//
const render = 'https://pi-pokemon-main.onrender.com/';

axios.defaults.baseURL = render;

//GETS----------------------------------------------------------

export function getPokemons() {
  return async function(dispatch) {
    try {
      const response = await axios.get(`/pokemons`);
      const pokemons = await response.data;
      dispatch({ type: GET_POKEMONS, payload: pokemons });
    } catch (error) {
      return error;
    }
  };
}
export function clearPokemons() {
  return async function(dispatch) {
    try {
      dispatch({ type: GET_POKEMON_DETAIL, payload: {} });
    } catch (error) {
      return error;
    }
  };
}

export function getPokemonDetail(param) {
  return async function(dispatch) {
    try {
      const pokemon = (await axios.get(`/pokemons/${param}`)).data;

      if (!pokemon || !pokemon.data) {
        return Swal.fire({
          title: `No pokemon found with name ${param}`,
          icon: 'warning',
          dangerMode: true,
        }).then(() => {
          return false;
        });
      } else {
        dispatch({ type: GET_POKEMON_DETAIL, payload: pokemon.data });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPokemonBySearch(param) {
  return async function(dispatch) {
    const pokemon = (await axios.get(`/pokemons/${param}?search=true`)).data;
    try {
      if (!pokemon.data.length) {
        return Swal.fire({
          title: `No pokemon found with name ${param}`,
          icon: 'warning',
          dangerMode: true,
        }).then(() => {
          return false;
        });
      } else {
        dispatch({ type: GET_POKEMON_BY_PARAM, payload: pokemon.data });
      }
      return pokemon;
    } catch (err) {
      console.log(err);
      return;
    }
  };
}

export function getTypes() {
  return async function(dispatch) {
    try {
      const response = await axios.get(`/types`);
      const types = await response.data;
      return dispatch({ type: GET_TYPES, payload: types });
    } catch (error) {
      console.error(error);
    }
  };
}

//FILTERS--------------------------------------------------------

export function filterPokemons(filter) {
  return async function(dispatch) {
    if (filter === 'Created') {
      dispatch({ type: FILTERED_POKEMONS, payload: filter });
    } else if (filter === 'Api') {
      dispatch({ type: FILTERED_POKEMONS, payload: filter });
    } else if (filter === 'All') {
      dispatch({ type: FILTERED_POKEMONS, payload: filter });
    } else {
      dispatch({ type: FILTER_BY_TYPE, payload: filter });
    }
  };
}
//ORDER-------------------------------------------------------------------------

export function orderPokemons(order) {
  return async function(dispatch) {
    if (order === 'max' || order === 'min') {
      dispatch({ type: ORDERED_POKEMONS_ATTACK, payload: order });
    } else {
      dispatch({ type: ORDERED_POKEMONS_NAME, payload: order });
    }
  };
}

//PAGINATION----------------------------------------------------------------------

export function setPage(page) {
  return function(dispatch) {
    dispatch({ type: SET_PAGE, payload: page });
  };
}

//POST----------------------------------------------------------------------------

export function createPokemon(pokemon) {
  return async function(dispatch) {
    try {
      const response = (await axios.post(`/pokemons`, pokemon)).data;
      dispatch({
        type: CREATE_POKEMON,
        payload: pokemon,
      });
      return Swal.fire({
        title: 'Pokemon created!',
        text: response.data.name,
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'OK',
        confirmButtonText: 'Show pokemon',
      }).then((result) => {
        if (result.isConfirmed) {
          return response.data.name;
        }
      });
    } catch (error) {
      alert(error.response.data.message);
      return error;
    }
  };
}

//LOADING -------------------------------------------------------------------------

export function setLoading(value) {
  return function(dispatch) {
    dispatch({ type: LOADING, payload: value });
  };
}
//DELETE -----------------------------------------------------------------------------
export function deletePokemon(id) {
  return async function(dispatch) {
    try {
      const response = (await axios.delete(`/pokemons/${id}`)).data;
      dispatch({ type: DELETE_POKEMON, payload: id });

      Swal.fire({
        title: 'Deleted',
        text: `Pokemon ${response.data.name} deleted!`,
        icon: 'success',
        button: 'OK',
      });

      return response.data.message;
    } catch (error) {
      throw Error(error);
    }
  };
}

export function updatePokemon(pokemon, id) {
  return async function() {
    try {
      await axios.put(`/pokemons/${id}`, pokemon);
    } catch (error) {}
  };
}
