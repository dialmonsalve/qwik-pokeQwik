import { component$, useComputed$ } from "@builder.io/qwik";
import {
  Link,
  type DocumentHead,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { getPokemons } from "~/helpers/getPokemons";
import type { SmallPokemon } from "~/interfaces";

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get("offset") || "0");

    if (isNaN(offset)) throw redirect(301, pathname);
    if (offset < 0) throw redirect(301, pathname);

    return await getPokemons({ offset });
  },
);

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();

  const currentOffset = useComputed$<number>(() => {
    // const offsetString = location.url.searchParams.get('offset')
    const offsetString = new URLSearchParams(location.url.search);

    return Number(offsetString.get("offset")) || 0;
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class="my-5 text-5xl">Current Offset: {currentOffset}</span>
        <span class="my-5 text-5xl">
          {location.isNavigating && "cargando"}
        </span>
      </div>

      <div class="mt-10">
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class="btn btn-primary mr-2"
        >
          Anteriores
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class="btn btn-primary mr-2"
        >
          Siguientes
        </Link>
      </div>

      <div class="mt-5 grid grid-cols-5">
        {pokemons.value.map((pokemon) => (
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
  title: "List SSR",
  meta: [
    {
      name: "description",
      content: "Lista de pokemons SSR",
    },
  ],
};
