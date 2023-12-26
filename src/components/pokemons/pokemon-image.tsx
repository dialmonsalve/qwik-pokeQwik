import {
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from "@builder.io/qwik";

interface Props {
  id: string | number;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(
  ({ id, size = 200, backImage = false, isVisible = true }: Props) => {
    const imageLoaded = useSignal(false);

    useTask$(({ track }) => {
      track(() => id);
      imageLoaded.value = false;
    });

    const pokeImageUrl = useComputed$(() => {
      return backImage
        ? `https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/back/${id}.png`
        : `https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/${id}.png`;
    });

    return (
      <div
        class="flex items-center justify-center"
        style={{
          width: "200px",
          height: "200px",
        }}
      >
        {!imageLoaded.value && <span>Loading...</span>}
        <img
          src={pokeImageUrl.value}
          alt="Imagen del pokemon"
          class={[
            {
              hidden: !imageLoaded.value,
              "brightness-0": !isVisible,
            },
            "transition-all",
          ]}
          width={size}
          height={200}
          onLoad$={() => (imageLoaded.value = true)}
        />
      </div>
    );
  },
);
