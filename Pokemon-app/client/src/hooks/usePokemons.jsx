import { useContext } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';

export function usePokemons() {
  const context = useContext(PokemonContext);
  
  if (!context) {
    throw new Error('usePokemons must be used within a PokemonProvider');
  }
  
  return context;
}