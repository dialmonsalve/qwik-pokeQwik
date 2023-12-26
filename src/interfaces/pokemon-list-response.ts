export interface PokemonListResponse {
  count: number;
  next: string;
  previos: string;
  results: BasicPokemonInfo[];
}

export interface BasicPokemonInfo {
  name: string;
  url: string;
}
