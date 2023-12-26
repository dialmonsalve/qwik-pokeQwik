import {
  $,
  component$,
  useOnDocument,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { getPokemons } from "~/helpers/getPokemons";
import type { SmallPokemon } from "~/interfaces";

interface PokemonState {
  currentPage: number;
  isLoading: boolean;
  pokemons: SmallPokemon[];
}

export default component$(() => {
  const pokemonState = useStore<PokemonState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  });

  // useTask$(async ({ track }) => {
  //   track(() => pokemonState.currentPage);
  //   const pokemons = await getPokemons({
  //     offset: pokemonState.currentPage * 10,
  //   });

  //   pokemonState.pokemons = pokemons;
  // });
  useVisibleTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);

    const pokemons = await getPokemons({
      offset: pokemonState.currentPage * 10,
      limit: 30,
    });

    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.isLoading = false;
  });

  useOnDocument(
    "scroll",
    $(() => {
      const maxScroll = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;
      if (currentScroll + 200 >= maxScroll && !pokemonState.isLoading) {
        pokemonState.isLoading=true
        pokemonState.currentPage++;
      }
    }),
  );

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class="my-5 text-5xl">
          Current Offset: {pokemonState.currentPage}
        </span>
        <span class="my-5 text-5xl">{}</span>
      </div>

      <div class="mt-10">
        <button
          onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary mr-2"
        >
          Siguientes
        </button>
      </div>

      <div class="xs:grid-cols-2 mt-5 grid md:grid-cols-5 xl:grid-cols-7">
        {pokemonState.pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            class="mt-5 flex flex-col items-center justify-center"
          >
            <PokemonImage id={pokemon.id} />
            <span class="capitalize">{pokemon.name}</span>
          </div>
        ))}
      </div>

      <div></div>
    </>
  );
});

export const head: DocumentHead = {
  title: "List client",
  meta: [
    {
      name: "description",
      content: "Lista de pokemons",
    },
  ],
};
