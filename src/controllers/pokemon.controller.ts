import { Pokemon } from '../models/pokemon.model';
import fetch from 'node-fetch';

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=1118';

export class PokemonsHandler {
  pokemons: Pokemon[];

  constructor() {
    this.pokemons = [];
  }

  getPokemons = async (url: string) => {
    return await fetch(url)
      .then((res) => res.json())
      .catch((err) => console.error(err));
  };

  getPokemonUrl = async (name: string) => {
    return await this.getPokemons(POKEAPI_URL)
      .then(async (pokes) => {
        const data = await pokes.results.filter((poke: any) =>
          poke.name.includes(name)
        );
        const result = await data.map((poke: any) => poke.url);
        return result;
      })
      .catch((err) => {
        return err;
      });
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
    await this.getPokemonUrl(name).then(async (pokes: any) => {
      for (let poke of pokes) {
        const pokeData = await this.getPokemons(poke);
        const { forms, sprites } = pokeData;
        const { name } = forms[0];
        const { front_default } = sprites;

        const pokemon = {
          name,
          front_default,
        };

        this.savePokemon(pokemon);
      }
    });
  };
}
