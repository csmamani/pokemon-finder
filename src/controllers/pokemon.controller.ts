import { Pokemon } from '../models/pokemon.model';
import fetch from 'node-fetch';
import { runInThisContext } from 'node:vm';

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=1118';

export class PokemonsHandler {
  pokemons: Pokemon[];

  constructor() {
    this.pokemons = [];
  }

  getPokemons = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  getPokemonsUrl = async (name: string) => {
    const pokes = await this.getPokemons(POKEAPI_URL);
    const data = await pokes.results.filter((poke: any) =>
      poke.name.includes(name)
    );
    const result = data.map((poke: any) => poke.url);

    return result;
  };

  savePokemon = (pokemon: any) => {
    this.pokemons = [...this.pokemons, pokemon];
  };

  reset = () => {
    this.pokemons = [];
  };

  getPokemonData = async (name: string) => {
    if (!name) {
      return (this.pokemons = []);
    }

    const pokesUrl = await this.getPokemonsUrl(name);

    for (let pokeUrl of pokesUrl) {
      const pokeData = await this.getPokemons(pokeUrl);
      const { forms, sprites } = pokeData;
      const { name } = forms[0];
      const { front_default } = sprites;

      const pokemon = {
        name,
        front_default,
      };

      this.savePokemon(pokemon);
    }
  };
}
