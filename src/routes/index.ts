import { Router } from 'express';
import { PokemonsHandler } from '../controllers/pokemon.controller';

const router = Router();

const pokemons = new PokemonsHandler();

router.get('/', async (req, res) => {
  let init = {};
  return res.render('main', { init });
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  pokemons.reset();

  await pokemons.getPokemonData(name.toLowerCase()).then((data) => {
    const result = pokemons.pokemons;
    return res.render('main', { result });
  });
});

module.exports = router;
