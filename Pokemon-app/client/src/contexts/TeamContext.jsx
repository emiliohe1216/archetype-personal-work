import { createContext, useReducer, useCallback } from 'react';
import { pokemonReducer, initialState } from '../reducers/pokemonReducer';
import * as pokemonActions from '../actions/pokemonActions';
import api from '../utils/api';

export const TeamContext = createContext(null);

export function PokemonProvider({ children }) {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  const fetchPokemons = useCallback(async (filters = {}) => {
    dispatch(pokemonActions.fetchPokemonsRequest());
    
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/Pokemon${queryParams ? `?${queryParams}` : ''}`);
      dispatch(pokemonActions.fetchPokemonsSuccess(response.data));
    } catch (error) {
      dispatch(pokemonActions.fetchPokemonsFailure(error.message || 'Failed to fetch Pokemon'));
    }
  }, []);

  const setCurrentPokemon = useCallback((pokemon) => {
    dispatch(pokemonActions.setCurrentPokemon(pokemon));
  }, []);

  const clearError = useCallback(() => {
    dispatch(pokemonActions.clearError());
  }, []);

  const value = {
    Pokemon: state.Pokemon,
    currentPokemon: state.currentPokemon,
    loading: state.loading,
    error: state.error,
    fetchPokemons,
    setCurrentPokemon,
    clearError,
  };

  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  );
}