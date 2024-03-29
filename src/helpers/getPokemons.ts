import type { SmallPokemon, PokemonListResponse } from "~/interfaces";

export const getPokemons = async ({
  offset = 0,
  limit = 10,
}: {
  offset: number;
  limit?: number;
}): Promise<SmallPokemon[]> => {
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  );
  const data = (await resp.json()) as PokemonListResponse;

  return data.results.map(({url, name}) => {

    
    
    
    return {
      id,
      name
    }
  });
};
