import { useEffect, useState } from "react";
import { usePokemons } from "../hooks/usePokemons";
import { useAuth } from "../hooks/useAuth";
import PokemonList from "../components/PokemonList";
import PokemonForm from "../components/PokemonForm";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useLocation } from 'react-router-dom';

function Dashboard() {
  const { fetchPokemons, pokemons, loading, error, setCurrentPokemon } =
    usePokemons();
  const { logout } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [allPokemonData, setAllPokemonData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchPokemons();

    // Get the Pokemon data passed from the login page
    if (location.state?.pokemonData) {
      const formattedData = location.state.pokemonData.map(
        (pokemon, index) => ({
          id: index,
          name: pokemon.name,
          url: pokemon.url,
        })
      );
      setAllPokemonData(formattedData);
      console.log("Pokemon data loaded from login:", formattedData.length);
    }
  }, [fetchPokemons, location.state?.pokemonData]);

  // const handleCreatePokemon = () => {
  //   setCurrentPokemon(null);
  //   setShowForm(true);
  // };

  // Function to handle when a Pokemon is selected from the search
  const handleOnSelect = (item) => {
    console.log("Selected Pokemon:", item);

    setCurrentPokemon({
      name: item.name,
    });

    setShowForm(true);
    setShowSearch(false);
  };

  // Function to toggle search visibility
  const handleShowSearch = () => {
    setShowSearch(!showSearch);
    if (showForm) setShowForm(false);
  };

  const handleEditPokemon = (pokemon) => {
    setCurrentPokemon(pokemon);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setCurrentPokemon(null);
  };
  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: "block", textAlign: "left" }}>
          id: {item.id}
        </span> */}
        <span style={{ display: "block", textAlign: "left" }}>
          {item.name}
        </span>
      </>
    );
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
                onClick={handleShowSearch}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                {showSearch ? "Close Search" : "Search Pokémon"}
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

        {showSearch && (
          <div className="mb-6">
            <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
              <h2 className="text-lg font-medium mb-2">Search for a Pokémon</h2>
              {allPokemonData.length > 0 ? (
                <ReactSearchAutocomplete
                  items={allPokemonData}
                  onSelect={handleOnSelect}
                  autoFocus
                  formatResult={formatResult}
                  fuseOptions={{ keys: ["name"], threshold: 0.3 }}
                  resultStringKeyName="name"
                  showIcon={true}
                  styling={{
                    zIndex: 3,
                    borderRadius: "8px",
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                    height: "44px",
                  }}
                  placeholder="Type to search for a Pokémon..."
                />
              ) : (
                <div className="p-4 bg-yellow-50 border border-yellow-100 text-yellow-800 rounded">
                  No Pokémon data available. Please log out and log back in to
                  fetch the data.
                </div>
              )}
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <PokemonList pokemons={pokemons} onEdit={handleEditPokemon} />
        )}

        {showForm && <PokemonForm onClose={handleCloseForm} />}
      </main>
    </div>
  );
}

export default Dashboard;
