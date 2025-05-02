const { Pokemon, User, Category } = require('../models');
const { Op } = require('sequelize');

class PokemonService {
  // Create a new pokemon for a user
  async createPokemon(userId, pokemonData) {
    try {
      const pokemon = await Pokemon.create({
        ...pokemonData,
        user_id: userId,
      });
      
      return pokemon;
    } catch (error) {
      throw new Error(`Failed to create pokemon: ${error.message}`);
    }
  }
  
  // Get all pokemons for a specific user with filters
  async getUserPokemons(userId, filters = {}) {
    try {
      const where = { user_id: userId };
      
      if (filters.status) {
        where.status = filters.status;
      }
      
      if (filters.priority) {
        where.priority = filters.priority;
      }
      
      if (filters.categoryId) {
        where.category_id = filters.categoryId;
      }
      
      if (filters.dueDate) {
        where.due_date = {
          [Op.lte]: filters.dueDate,
        };
      }
      
      const pokemons = await Pokemon.findAll({
        where,
        include: [
          {
            model: Category,
            attributes: ['id', 'name', 'color'],
          },
        ],
        order: [['due_date', 'ASC'], ['priority', 'DESC']],
      });
      
      return pokemons;
    } catch (error) {
      throw new Error(`Failed to fetch pokemons: ${error.message}`);
    }
  }
  
  // Update a pokemon
  async updatePokemon(pokemonId, userId, updateData) {
    try {
      const pokemon = await Pokemon.findOne({
        where: { id: pokemonId, user_id: userId },
      });
      
      if (!pokemon) {
        throw new Error('Pokemon not found or unauthorized');
      }
      
      await pokemon.update(updateData);
      
      return pokemon;
    } catch (error) {
      throw new Error(`Failed to update pokemon: ${error.message}`);
    }
  }
  
  // Delete a pokemon
  async deletePokemon(pokemonId, userId) {
    try {
      const result = await Pokemon.destroy({
        where: { id: pokemonId, user_id: userId },
      });
      
      if (result === 0) {
        throw new Error('Pokemon not found or unauthorized');
      }
      
      return true;
    } catch (error) {
      throw new Error(`Failed to delete pokemon: ${error.message}`);
    }
  }
  
  // Get pokemon statistics for a user
  async getPokemonStats(userId) {
    try {
      const stats = await Pokemon.findAll({
        where: { user_id: userId },
        attributes: [
          'status',
          [Pokemon.sequelize.fn('COUNT', Pokemon.sequelize.col('id')), 'count'],
        ],
        group: ['status'],
      });
      
      return stats;
    } catch (error) {
      throw new Error(`Failed to get pokemon stats: ${error.message}`);
    }
  }
}

module.exports = new PokemonService();