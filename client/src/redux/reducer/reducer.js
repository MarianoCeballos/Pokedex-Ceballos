import {
    GET_POKEMONS,
    GET_TYPES,
    GET_POKEMON_BY_PARAM,
    FILTERED_POKEMONS,
    FILTER_BY_TYPE,
    ORDERED_POKEMONS_ATTACK,
    ORDERED_POKEMONS_NAME,
    SET_PAGE,
    LOADING,
    DELETE_POKEMON,
    GET_POKEMON_DETAIL,
} from '../actions/actionTypes';

const initialState = {
    allPokemons: [],
    poke: {},
    filteredPokemons: [],
    allTypes: [],
    currentPage: 1,
    loading: true,
    filter: '',
    order: '',
};

export default function rootReducer(state = initialState, action) {
    const allFiltered = state.allPokemons;

    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload,
                filteredPokemons: action.payload.sort((a, b) => {
                    if (a.api) return 1;
                    if (b.api) return -1;
                    return 0;
                }),
            };
        case GET_TYPES:
            return {
                ...state,
                allTypes: action.payload,
            };
        case GET_POKEMON_BY_PARAM:
            return {
                ...state,
                filteredPokemons: allFiltered.filter((p) =>
                    p.name.includes(action.payload)
                ),
            };
        case GET_POKEMON_DETAIL:
            return {
                ...state,
                poke: action.payload,
            };

        case ORDERED_POKEMONS_NAME:
            const ordered =
                action.payload === 'asc'
                    ? [...state.filteredPokemons].sort((a, b) =>
                          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
                      )
                    : [...state.filteredPokemons].sort((a, b) =>
                          a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
                      );

            return {
                ...state,
                filteredPokemons: ordered,
                order: action.payload,
            };

        case ORDERED_POKEMONS_ATTACK:
            const orderedAttack =
                action.payload === 'max'
                    ? [...state.filteredPokemons].sort((a, b) =>
                          a.attack < b.attack ? 1 : -1
                      )
                    : [...state.filteredPokemons].sort((a, b) =>
                          a.attack > b.attack ? 1 : -1
                      );

            return {
                ...state,
                filteredPokemons: orderedAttack,
                order: action.payload,
            };

        case FILTERED_POKEMONS:
            const pokemonFilter =
                action.payload === 'Created' && allFiltered.length > 0
                    ? allFiltered.filter((poke) => !poke.api)
                    : action.payload === 'Api'
                    ? allFiltered.filter((poke) => poke.api)
                    : action.payload === ''
                    ? ''
                    : allFiltered;

            return {
                ...state,
                filteredPokemons: pokemonFilter,
                filter: action.payload,
            };

        case FILTER_BY_TYPE:
            return {
                ...state,
                filteredPokemons: state.allPokemons.filter((poke) =>
                    poke.types.map((type) => type.name).includes(action.payload)
                ),
                filter: action.payload,
            };

        case SET_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };

        case LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case DELETE_POKEMON:
            return {
                ...state,
                allPokemons: state.allPokemons.filter(
                    (poke) => poke.id !== action.payload
                ),
                filteredPokemons: state.filteredPokemons.filter(
                    (poke) => poke.id !== action.payload
                ),
            };

        default:
            return state;
    }
}
