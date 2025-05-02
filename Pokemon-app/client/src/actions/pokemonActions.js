export const TASK_ACTIONS = {
  FETCH_TASKS_REQUEST: 'FETCH_TASKS_REQUEST',
  FETCH_TASKS_SUCCESS: 'FETCH_TASKS_SUCCESS',
  FETCH_TASKS_FAILURE: 'FETCH_TASKS_FAILURE',
  CREATE_TASK_REQUEST: 'CREATE_TASK_REQUEST',
  CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',
  CREATE_TASK_FAILURE: 'CREATE_TASK_FAILURE',
  UPDATE_TASK_REQUEST: 'UPDATE_TASK_REQUEST',
  UPDATE_TASK_SUCCESS: 'UPDATE_TASK_SUCCESS',
  UPDATE_TASK_FAILURE: 'UPDATE_TASK_FAILURE',
  DELETE_TASK_REQUEST: 'DELETE_TASK_REQUEST',
  DELETE_TASK_SUCCESS: 'DELETE_TASK_SUCCESS',
  DELETE_TASK_FAILURE: 'DELETE_TASK_FAILURE',
  SET_CURRENT_TASK: 'SET_CURRENT_TASK',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

export const fetchPokemonsRequest = () => ({
  type: TASK_ACTIONS.FETCH_TASKS_REQUEST,
});

export const fetchPokemonsSuccess = (pokemons) => ({
  type: TASK_ACTIONS.FETCH_TASKS_SUCCESS,
  payload: pokemons,
});

export const fetchPokemonsFailure = (error) => ({
  type: TASK_ACTIONS.FETCH_TASKS_FAILURE,
  payload: error,
});

export const createPokemonRequest = () => ({
  type: TASK_ACTIONS.CREATE_TASK_REQUEST,
});

export const createPokemonSuccess = (pokemon) => ({
  type: TASK_ACTIONS.CREATE_TASK_SUCCESS,
  payload: pokemon,
});

export const createPokemonFailure = (error) => ({
  type: TASK_ACTIONS.CREATE_TASK_FAILURE,
  payload: error,
});

export const updatePokemonRequest = () => ({
  type: TASK_ACTIONS.UPDATE_TASK_REQUEST,
});

export const updatePokemonSuccess = (pokemon) => ({
  type: TASK_ACTIONS.UPDATE_TASK_SUCCESS,
  payload: pokemon,
});

export const updatePokemonFailure = (error) => ({
  type: TASK_ACTIONS.UPDATE_TASK_FAILURE,
  payload: error,
});

export const deletePokemonRequest = () => ({
  type: TASK_ACTIONS.DELETE_TASK_REQUEST,
});

export const deletePokemonSuccess = (pokemonId) => ({
  type: TASK_ACTIONS.DELETE_TASK_SUCCESS,
  payload: pokemonId,
});

export const deletePokemonFailure = (error) => ({
  type: TASK_ACTIONS.DELETE_TASK_FAILURE,
  payload: error,
});

export const setCurrentPokemon = (pokemon) => ({
  type: TASK_ACTIONS.SET_CURRENT_TASK,
  payload: pokemon,
});

export const clearError = () => ({
  type: TASK_ACTIONS.CLEAR_ERROR,
});