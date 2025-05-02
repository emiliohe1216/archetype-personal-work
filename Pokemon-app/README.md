# Pokemon Management UI

In this activity, you will debug a React application with state management issues. The application is mostly complete but contains several bugs preventing proper functionality.

## Instructions

* The application has 6 critical bugs that need to be fixed, each marked with a TODO comment in the code:

  1. **Context Provider Bug** (in `contexts/AuthContext.jsx`): The useEffect hook has a dependency issue causing infinite re-renders.

  2. **Reducer Pattern Bug** (in `reducers/pokemonReducer.js`): The reducer doesn't properly handle updating pokemons, causing UI inconsistencies.

  3. **Custom Hook Bug** (in `hooks/usePokemons.js`): The hook doesn't properly throw errors, leading to silent failures.

  4. **Protected Route Bug** (in `components/ProtectedRoute.jsx`): The component doesn't handle the loading state correctly, causing flicker.

  5. **Form Handling Bug** (in `components/PokemonForm.jsx`): The form doesn't properly clear errors when switching between create/edit modes.

  6. **API Integration Bug** (in `utils/api.js`): The interceptor doesn't properly handle network errors.

* Complete the TODOs in each file to fix these bugs.

* The completed application should:
  * Properly manage authentication state
  * Handle CRUD operations correctly
  * Show appropriate loading states
  * Display errors to users
  * Clear form state appropriately

## Testing Your Solution

After fixing all bugs, test the following:

1. Register a new user and verify auto-redirect
2. Login and check session persistence
3. Create, edit, and delete pokemons
4. Verify error handling for failed requests
5. Test protected route behavior

## Bonus

* Add optimistic updates for better UX
* Implement proper error boundaries
* Add form validation with custom hooks

## Hints

* Check useEffect dependencies carefully
* Ensure reducer returns proper state structure
* Consider all error scenarios
* Think about component lifecycle
