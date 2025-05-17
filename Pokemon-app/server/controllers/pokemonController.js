const pokemonService = require("../services/pokemonService");
const { Pokemon, Team } = require("../models");

class PokemonController {
  // Create a new pokemon
  async createPokemon(req, res) {
    try {
      const { title, description, status, priority, due_date, category_id } =
        req.body;

      if (!title) {
        return res.status(400).json({
          error: "Validation Error",
          message: "Title is required",
        });
      }

      const pokemon = await pokemonService.createPokemon(req.session.user_id, {
        title,
        description,
        status,
        priority,
        due_date,
        category_id,
      });

      res.status(201).json({
        success: true,
        data: pokemon,
        message: "Pokemon created successfully",
      });
    } catch (error) {
      console.error("Create pokemon error:", error);
      res.status(500).json({
        error: "Server Error",
        message: error.message,
      });
    }
  }

  // Get all pokemons for the authenticated user
  async getUserPokemons(req, res) {
    try {
      const { status, priority, category_id, due_before } = req.query;

      const filters = {
        status,
        priority,
        categoryId: category_id,
        dueDate: due_before ? new Date(due_before) : undefined,
      };

      const pokemons = await pokemonService.getUserPokemons(
        req.session.user_id,
        filters
      );

      res.json({
        success: true,
        data: pokemons,
        count: pokemons.length,
      });
    } catch (error) {
      console.error("Get pokemons error:", error);
      res.status(500).json({
        error: "Server Error",
        message: error.message,
      });
    }
  }

  // Get a single pokemon by ID
  async getPokemonById(req, res) {
    try {
      const { id } = req.params;

      const pokemon = await Pokemon.findOne({
        where: {
          id,
          user_id: req.session.user_id,
        },
        include: [
          {
            model: Category,
            attributes: ["id", "name", "color"],
          },
        ],
      });

      if (!pokemon) {
        return res.status(404).json({
          error: "Not Found",
          message: "Pokemon not found or unauthorized",
        });
      }

      res.json({
        success: true,
        data: pokemon,
      });
    } catch (error) {
      console.error("Get pokemon by ID error:", error);
      res.status(500).json({
        error: "Server Error",
        message: error.message,
      });
    }
  }

  // Update a pokemon
  async updatePokemon(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const pokemon = await pokemonService.updatePokemon(
        id,
        req.session.user_id,
        updateData
      );

      res.json({
        success: true,
        data: pokemon,
        message: "Pokemon updated successfully",
      });
    } catch (error) {
      console.error("Update pokemon error:", error);

      if (error.message === "Pokemon not found or unauthorized") {
        return res.status(404).json({
          error: "Not Found",
          message: error.message,
        });
      }

      res.status(500).json({
        error: "Server Error",
        message: error.message,
      });
    }
  }

  // Delete a pokemon
  async deletePokemon(req, res) {
    try {
      const { id } = req.params;

      await pokemonService.deletePokemon(id, req.session.user_id);

      res.status(204).send();
    } catch (error) {
      console.error("Delete pokemon error:", error);

      if (error.message === "Pokemon not found or unauthorized") {
        return res.status(404).json({
          error: "Not Found",
          message: error.message,
        });
      }

      res.status(500).json({
        error: "Server Error",
        message: error.message,
      });
    }
  }

  // Get pokemon statistics
  async getPokemonStats(req, res) {
    try {
      const stats = await pokemonService.getPokemonStats(req.session.user_id);

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      console.error("Get pokemon stats error:", error);
      res.status(500).json({
        error: "Server Error",
        message: error.message,
      });
    }
  }
}

module.exports = new PokemonController();
