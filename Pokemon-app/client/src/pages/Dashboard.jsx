import { useEffect, useState } from 'react';
import { usePokemons } from '../hooks/usePokemons';
import { useAuth } from '../hooks/useAuth';
import PokemonList from '../components/PokemonList';
import PokemonForm from '../components/PokemonForm';



function Dashboard() {
  const { fetchPokemons, pokemons, loading, error, setCurrentPokemon } = usePokemons();
  const { logout } = useAuth();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  const handleCreatePokemon = () => {
    setCurrentPokemon(null);
    setShowForm(true);
  };

  const handleEditPokemon = (pokemon) => {
    setCurrentPokemon(pokemon);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setCurrentPokemon(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Trainer's Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCreatePokemon}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Create Pokemon Team
              </button>
              <button
                onClick={logout}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <PokemonList pokemons={pokemons} onEdit={handleEditPokemon} />
        )}

        {showForm && (
          <PokemonForm onClose={handleCloseForm} />
        )}
      </main>
    </div>
  );
}

export default Dashboard;