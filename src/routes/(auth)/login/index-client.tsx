import {
  $,
  component$,
  useComputed$,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";

import styles from "./login.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const formState = useStore({
    email: "",
    password: "",
    formPosted: false,
  });

  const emailError = useComputed$(() => {
    if (formState.email.includes("@")) return "";

    return "not-valid";
  });
  const passwordError = useComputed$(() => {
    if (formState.password.length >= 6) return "";

    return "not-valid";
  });

  const isFormValid = useComputed$(() => {
    if (
      emailError.value === "not-valid" ||
      passwordError.value === "not-valid"
    ) {
      return false;
    }
    return true;
  });

  const onSubmit = $(() => {
    formState.formPosted = true;

    console.log({ isFormValid });
  });

  return (
    <form onSubmit$={onSubmit} class="login-form" preventdefault:submit>
      <div class="relative">
        <input
          value={formState.email}
          onInput$={(event) =>
            (formState.email = (event.target as HTMLInputElement).value)
          }
          name="email"
          type="text"
          placeholder="Email address"
          class={formState.formPosted ? emailError.value : ""}
        />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          value={formState.password}
          onInput$={(event) =>
            (formState.password = (event.target as HTMLInputElement).value)
          }
          name="password"
          type="password"
          placeholder="Password"
          class={formState.formPosted ? passwordError.value : ""}
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type="submit">Ingresar</button>
      </div>

      <code>{JSON.stringify(formState, undefined, 2)}</code>
    </form>
  );
});
