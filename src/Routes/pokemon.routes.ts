import express from "express";
import{ getPokemons, deletePokemon, getPokemon, postPokemon, putPokemon } from "../Controllers/pokemon.controller";
const pokemon_router = express.Router();
const NAMESPACE = "PokemonRoutes";

pokemon_router.get("/pokemons", getPokemons);

pokemon_router.get("/pokemons/:id", getPokemon);

pokemon_router.post("/pokemons/:id", postPokemon);

pokemon_router.put("/pokemons", putPokemon);

pokemon_router.delete("/pokemons/:id", deletePokemon);

export = pokemon_router
