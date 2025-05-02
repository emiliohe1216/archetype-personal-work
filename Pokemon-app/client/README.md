# React State Architecture Demo

This demonstration covers implementing React state management using Context API, useReducer, custom hooks, and React Router for a full-stack pokemon management application with Vite and Tailwind CSS.

## Key Concepts Demonstrated

1. **Modern React Architecture**
   - Vite as the build tool
   - Tailwind CSS for styling
   - React 18 features
   - ESLint configuration

2. **State Management Patterns**
   - Action creators for type safety
   - Reducer functions for predictable updates
   - Context providers for global state
   - Custom hooks for encapsulation

3. **Authentication Flow**
   - Session-based auth integration
   - Protected route pattern
   - Automatic session checking
   - Redirect after login

4. **CRUD Operations**
   - REST API integration
   - Loading and error states
   - Optimistic updates pattern
   - Form handling best practices

## Project Structure

```
client/
├── src/
│   ├── actions/        # Action creators
│   ├── reducers/       # Reducer functions
│   ├── contexts/       # Context providers
│   ├── hooks/          # Custom hooks
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── index.html
└── package.json
```

## Setup Instructions

1. Start the backend server:
   ```bash
   cd server
   npm install
   npm run dev
   ```

2. Start the Vite dev server:
   ```bash
   cd client
   npm install
   npm run dev
   ```

## Key Architectural Decisions

1. **Action Creators**
   - Provides type safety
   - Centralizes action creation
   - Makes refactoring easier

2. **Custom Hooks**
   - Encapsulates context usage
   - Provides better error messages
   - Simplifies component code

3. **Tailwind CSS**
   - Utility-first approach
   - No CSS-in-JS runtime
   - Consistent styling

4. **Vite Configuration**
   - Fast HMR
   - Proxy setup for API
   - Modern build tooling

## Best Practices Demonstrated

- Separation of concerns
- Immutable state updates
- Error boundary usage
- Performance optimization
- Accessibility considerations
