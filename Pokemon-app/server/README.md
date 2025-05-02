# RESTful Controllers Demo

This demonstration covers implementing RESTful API architecture with controllers, middleware, and proper error handling.

## Key Concepts Demonstrated

1. **Controller Pattern**
   - Separation of concerns
   - Error handling strategies
   - Response formatting consistency
   - Service layer integration

2. **RESTful Routes**
   - Standard HTTP methods (GET, POST, PUT, DELETE)
   - Resource-based URLs
   - Query parameters for filtering
   - Proper status codes

3. **Middleware Implementation**
   - Authentication middleware
   - Validation middleware
   - Error handling middleware
   - Route organization

4. **Response Patterns**
   - Consistent response format
   - Error response structure
   - Success response structure
   - Appropriate HTTP status codes

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/status` - Check auth status

### Pokemons
- `GET /api/pokemons` - Get all pokemons (with filters)
- `GET /api/pokemons/:id` - Get specific pokemon
- `POST /api/pokemons` - Create new pokemon
- `PUT /api/pokemons/:id` - Update pokemon
- `DELETE /api/pokemons/:id` - Delete pokemon
- `GET /api/pokemons/stats` - Get pokemon statistics

## Testing with Postman

1. Login first:
   ```
   POST http://localhost:3001/api/auth/login
   Body: { "email": "john@example.com", "password": "password123" }
   ```

2. Create a pokemon:
   ```
   POST http://localhost:3001/api/pokemons
   Body: { "title": "New Pokemon", "priority": "high" }
   ```

3. Get pokemons with filters:
   ```
   GET http://localhost:3001/api/pokemons?status=pending&priority=high
   ```

## Key Takeaways

- Controllers handle HTTP requests and responses
- Services handle business logic
- Middleware handles cross-cutting concerns
- Consistent error handling improves debugging
- RESTful conventions make APIs predictable
