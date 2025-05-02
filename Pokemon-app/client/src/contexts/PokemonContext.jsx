import { createContext, useReducer, useCallback } from 'react';
import { pokemonReducer, initialState } from '../reducers/pokemonReducer';
import * as pokemonActions from '../actions/pokemonActions';
import api from '../utils/api';

export const PokemonContext = createContext(null);

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

  // const createPokemon = useCallback(async (pokemonData) => {
  //   dispatch(pokemonActions.createPokemonRequest());
    
  //   try {
  //     const response = await api.post('/Pokemon', pokemonData);
  //     dispatch(pokemonActions.createPokemonuccess(response.data));
  //     return true;
  //   } catch (error) {
  //     dispatch(pokemonActions.createPokemonFailure(error.message || 'Failed to create pokemon'));
  //     return false;
  //   }
  // }, []);

  // const updatePokemon = useCallback(async (pokemonId, updateData) => {
  //   dispatch(pokemonActions.updatePokemonRequest());
    
  //   try {
  //     const response = await api.put(`/Pokemon/${pokemonId}`, updateData);
  //     dispatch(pokemonActions.updatePokemonuccess(response.data));
  //     return true;
  //   } catch (error) {
  //     dispatch(pokemonActions.updatePokemonFailure(error.message || 'Failed to update pokemon'));
  //     return false;
  //   }
  // }, []);

  // const deletePokemon = useCallback(async (pokemonId) => {
  //   dispatch(pokemonActions.deletePokemonRequest());
    
  //   try {
  //     await api.delete(`/Pokemon/${pokemonId}`);
  //     dispatch(pokemonActions.deletePokemonuccess(pokemonId));
  //     return true;
  //   } catch (error) {
  //     dispatch(pokemonActions.deletePokemonFailure(error.message || 'Failed to delete pokemon'));
  //     return false;
  //   }
  // }, []);

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
    // createPokemon,
    // updatePokemon,
    // deletePokemon,
    setCurrentPokemon,
    clearError,
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
}