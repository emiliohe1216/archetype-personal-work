import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { initialState } from "../reducers/authReducer";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, error, loading, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Display registration success message if redirected from registration
  const successMessage = location.state?.message;

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchAllPokemonData = async () => {
    try {
      const initialResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1");
      const initialData = await initialResponse.json();
      const totalCount = 1302;
      const limit = 100;
      const totalRequests = Math.ceil(totalCount / limit);
      let allPokemon = [];

      console.log(
        `Fetching all ${totalCount} Pokemon in ${totalRequests} requests...`
      );

      const requests = [];
      for (let i = 0; i < totalRequests; i++) {
        const offset = i * limit;
        requests.push(
          fetch(
            `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(
                `Batch ${i + 1}/${totalRequests} received with ${
                  data.results.length
                } Pokemon`
              );
              return data.results;
            })
        );
      }

      const results = await Promise.all(requests);

      allPokemon = results.flat();

      console.log(`Successfully fetched all ${allPokemon.length} Pokemon.`);
      return allPokemon;
    } catch (error) {
      console.error("Error fetching all Pokemon data:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(formData.email, formData.password);

    if (success) {
      // setLoginError("Fetching all Pokémon data... This may take a moment.");
      const allPokemonData = await fetchAllPokemonData();
      console.log("Pokémon data fetched:", allPokemonData);

      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true, state: { pokemonData: allPokemonData } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {successMessage}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
