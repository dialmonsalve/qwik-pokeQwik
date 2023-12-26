import { $, component$ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export default component$(() => {
  const navigate = useNavigate();
  const {
    isPokemonVisible,
    pokemonId,
    showBackImage,
    toggleFromBack,
    toggleVisible,
    nextPokemon,
    prevPokemon,
  } = usePokemonGame();

  const goToPokemon = $(() => {
    navigate(`/pokemon/${pokemonId.value}/`, { type: "link" });
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-6xl">{pokemonId.value}</span>
      <div onClick$={goToPokemon}>
        <PokemonImage
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={isPokemonVisible.value}
        />
      </div>
      <div>
        <button
          disabled={pokemonId.value === 1}
          onClick$={prevPokemon}
          class={`btn ${pokemonId.value > 1 && "btn-primary"} mr-2`}
        >
          Anterior
        </button>
        <button onClick$={nextPokemon} class="btn btn-primary mr-2">
          Siguiente
        </button>

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

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Primera aplicación de qwik",
    },
  ],
};
