import { $, component$, useSignal } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  const pokemonId = useSignal(1);
  const showBackImage = useSignal(false);
  const isPokemonVisible = useSignal(false);

  const navigate = useNavigate();

  const goToPokemon = $(() => {
    navigate(`/pokemon/${pokemonId.value}/`, { type: "link" });
  });

  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value <= 0) return;

    pokemonId.value += value;
  });
  const setShowBackImage = $(
    () => (showBackImage.value = !showBackImage.value),
  );

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-6xl">{pokemonId}</span>
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
          onClick$={() => changePokemonId(-1)}
          class={`btn ${pokemonId.value > 1 && "btn-primary"} mr-2`}
        >
          Anterior
        </button>
        <button
          onClick$={() => changePokemonId(+1)}
          class="btn btn-primary mr-2"
        >
          Siguiente
        </button>

        <button onClick$={setShowBackImage} class="btn btn-primary mr-2">
          Voltear
        </button>
        <button
          onClick$={() => (isPokemonVisible.value = !isPokemonVisible.value)}
          class="btn btn-primary mr-2"
        >
          {isPokemonVisible.value ? "Revelar" : "Esconder"}
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
