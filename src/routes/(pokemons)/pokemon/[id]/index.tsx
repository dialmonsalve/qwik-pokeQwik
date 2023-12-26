import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);

  if (isNaN(id) || id <= 0 || id > 1017) throw redirect(301, "/");
  return id;
});
export default component$(() => {
  const pokemonId = usePokemonId();
  const { toggleFromBack, toggleVisible, isPokemonVisible,  showBackImage } =
    usePokemonGame();

  return (
    <>
      <h1>Pokemon id: {pokemonId} </h1>
      <PokemonImage
        id={pokemonId.value}
        isVisible={isPokemonVisible.value}
        backImage={showBackImage.value}
      />
      <div class="mt-2">
        <button onClick$={toggleFromBack} class="btn btn-primary mr-2">
          Voltear
        </button>
        <button onClick$={() => toggleVisible} class="btn btn-primary mr-2">
          {!isPokemonVisible.value ? "Revelar" : "Esconder"}
        </button>
      </div>
    </>
  );
});
