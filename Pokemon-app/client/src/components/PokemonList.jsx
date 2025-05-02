import { usePokemons } from '../hooks/usePokemons';

function PokemonList({ pokemons = [], onEdit }) {
  const { deletePokemon } = usePokemons();

  const handleDelete = async (pokemonId) => {
    if (window.confirm('Are you sure you want to delete this pokemon?')) {
      await deletePokemon(pokemonId);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString();
  };

  if (pokemons.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-sm font-medium text-gray-900">No pokemons</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new pokemon.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pokemons.map(pokemon => (
        <div key={pokemon.id} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{pokemon.title}</h3>
              <div className="ml-2 flex-shrink-0 flex">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(pokemon.priority)}`}>
                  {pokemon.priority}
                </span>
              </div>
            </div>
            
            {pokemon.description && (
              <p className="mt-2 text-sm text-gray-500">{pokemon.description}</p>
            )}
            
            <div className="mt-4 flex items-center justify-between">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pokemon.status)}`}>
                {pokemon.status.replace('_', ' ')}
              </span>
              <span className="text-sm text-gray-500">
                Due: {formatDate(pokemon.due_date)}
              </span>
            </div>
            
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => onEdit(pokemon)}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(pokemon.id)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;