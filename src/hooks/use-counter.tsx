import { $, useComputed$, useSignal } from "@builder.io/qwik";

export const useCounter = () => {
  const counter = useSignal(10);

  const increaseCounter = $((value: number) => {
    counter.value += value;
  });

  return {
    counter: useComputed$(() => counter.value),
    increaseCounter,
  };
};
