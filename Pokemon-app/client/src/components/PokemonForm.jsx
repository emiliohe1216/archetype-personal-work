import { useState, useEffect } from "react";
import { usePokemons } from "../hooks/usePokemons";

function PokemonForm({ onClose }) {
  const { currentPokemon, loading, error, clearError } = usePokemons();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonTeam, setPokemonTeam] = useState([]);
  const [isAddingToPokemonTeam, setIsAddingToPokemonTeam] = useState(false);
  const [pokemonTeamData, setPokemonTeamData] = useState({
    name: "",
  });

  useEffect(() => {
    if (currentPokemon) {
      setSelectedPokemon(currentPokemon);
    }
    return () => clearError();
  }, [currentPokemon, clearError]);

  const addToTeam = () => {
    if (
      selectedPokemon &&
      !pokemonTeam.some((p) => p.name === selectedPokemon.name)
    ) {
      setPokemonTeam([...pokemonTeam, selectedPokemon]);
      setIsAddingToPokemonTeam(false);
    }
  };

  const removeFromTeam = (pokemonName) => {
    setPokemonTeam(pokemonTeam.filter((p) => p.name !== pokemonName));
  };

  const handleSaveTeam = async (e) => {
    e.preventDefault();
    if (currentPokemon) {
      success = await pokemonTeam(currentPokemon.id, pokemonTeamData);
    } else {
      success = await pokemonTeam(pokemonTeamData);
    }
    // Here you would implement saving the team to your backend or local storage
    console.log("Saving Pokemon team:", pokemonTeam);
    // After saving, close the form
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold silkscreen-regular">
            Your Pokemon Team
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {selectedPokemon && !isAddingToPokemonTeam && (
          <div className="bg-blue-50 p-4 rounded-md mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-blue-800 capitalize silkscreen">
                  {selectedPokemon.name}
                </h3>
                <p className="text-sm text-blue-600">Selected from Pokédex</p>
              </div>
              <button
                onClick={() => setIsAddingToPokemonTeam(true)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
              >
                Add to Team
              </button>
            </div>
          </div>
        )}

        {isAddingToPokemonTeam && selectedPokemon && (
          <div className="mb-6 p-4 border border-blue-200 rounded-md">
            <h3 className="font-medium mb-2 capitalize">
              {selectedPokemon.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Add this Pokémon to your team?
            </p>

            <div className="flex space-x-2">
              <button
                onClick={addToTeam}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsAddingToPokemonTeam(false)}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="mb-4">
          <h3 className="font-medium text-gray-700 mb-2">
            Current Team ({pokemonTeam.length})
          </h3>

          {pokemonTeam.length === 0 ? (
            <p className="text-gray-500 text-sm italic">
              No Pokémon in your team yet. Search and add them from the
              dashboard.
            </p>
          ) : (
            <ul className="space-y-2">
              {pokemonTeam.map((pokemon, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                >
                  <span className="capitalize">{pokemon.name}</span>
                  <button
                    onClick={() => removeFromTeam(pokemon.name)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
          <button
            onClick={handleSaveTeam}
            disabled={loading || pokemonTeam.length === 0}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Team"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PokemonForm;
