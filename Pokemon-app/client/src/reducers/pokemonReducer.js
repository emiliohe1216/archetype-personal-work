import { TASK_ACTIONS } from '../actions/pokemonActions';

export const initialState = {
  pokemons: [],
  currentPokemon: null,
  loading: false,
  error: null,
};

export const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_ACTIONS.FETCH_TASKS_REQUEST:
    case TASK_ACTIONS.CREATE_TASK_REQUEST:
    case TASK_ACTIONS.UPDATE_TASK_REQUEST:
    case TASK_ACTIONS.DELETE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case TASK_ACTIONS.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        pokemons: action.payload,
        loading: false,
        error: null,
      };
    case TASK_ACTIONS.CREATE_TASK_SUCCESS:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
        loading: false,
        error: null,
      };
    case TASK_ACTIONS.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        pokemons: state.pokemons.map(pokemon => 
          pokemon.id === action.payload.id ? action.payload : pokemon
        ),
        currentPokemon: state.currentPokemon?.id === action.payload.id ? action.payload : state.currentPokemon,
        loading: false,
        error: null,
      };
    case TASK_ACTIONS.DELETE_TASK_SUCCESS:
      return {
        ...state,
        pokemons: state.pokemons.filter(pokemon => pokemon.id !== action.payload),
        currentPokemon: state.currentPokemon?.id === action.payload ? null : state.currentPokemon,
        loading: false,
        error: null,
      };
    case TASK_ACTIONS.FETCH_TASKS_FAILURE:
    case TASK_ACTIONS.CREATE_TASK_FAILURE:
    case TASK_ACTIONS.UPDATE_TASK_FAILURE:
    case TASK_ACTIONS.DELETE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TASK_ACTIONS.SET_CURRENT_TASK:
      return {
        ...state,
        currentPokemon: action.payload,
      };
    case TASK_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};