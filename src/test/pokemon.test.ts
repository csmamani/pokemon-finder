import { PokemonsHandler } from '../controllers/pokemon.controller';

describe('PokemonsHandler Class', () => {
  it('Check if the list of pokemons is empty when the class has been just instanced', () => {
    const pokemons = new PokemonsHandler();

    expect(pokemons.pokemons).toStrictEqual([]);
  });

  it('Check if the list of pokemons returns the correct quantity of pokemons that are required [input: caterpie]', async () => {
    const pokemons = new PokemonsHandler();

    await pokemons.getPokemonData('caterpie');

    expect(pokemons.pokemons.length).toStrictEqual(1);
  });

  it('Check if the list of pokemons returns the correct quantity of pokemons that are required even if its name is partial [input:cater]', async () => {
    const pokemons = new PokemonsHandler();

    await pokemons.getPokemonData('cater');

    expect(pokemons.pokemons.length).toStrictEqual(1);
  });

  it('Check if the list of pokemons returns the correct quantity of pokemons that are required [input: togepi]', async () => {
    const pokemons = new PokemonsHandler();

    await pokemons.getPokemonData('togepi');

    expect(pokemons.pokemons.length).toStrictEqual(1);
  });

  it('Check if the list of pokemons returns the correct quantity of pokemons that are required [input: snorlax]', async () => {
    const pokemons = new PokemonsHandler();

    await pokemons.getPokemonData('snorlax');

    expect(pokemons.pokemons.length).toStrictEqual(2);
  });

  it('Check if the list of pokemons returns 0 when the input is empty', async () => {
    const pokemons = new PokemonsHandler();

    await pokemons.getPokemonData('');

    expect(pokemons.pokemons.length).toStrictEqual(0);
  });
});
