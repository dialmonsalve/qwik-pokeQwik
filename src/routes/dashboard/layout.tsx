import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import Navbar from "~/components/shared/Navbar/navbar";

export const useAuthCheckCookie = routeLoader$(({ cookie, redirect }) => {
  const jwtCookie = cookie.get("jwt");

  if (jwtCookie) {
    console.log({cookie:jwtCookie});
    throw redirect(301, '/')
  }
});

export default component$(() => {
  return (
    <>
      <Navbar>
        <div class="mt-5 flex flex-col items-center justify-center">
          <span class="text-5xl">Dashboard layout</span>
          <Slot />
        </div>
      </Navbar>
    </>
  );
});
