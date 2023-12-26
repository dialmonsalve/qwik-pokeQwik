import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import { QwikLogo } from "../../icons/qwik";

import styles from "./navbar.module.css";

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <Link href="/" title="qwik">
            <QwikLogo height={50} />
          </Link>
        </div>
        <ul>
          <li>                        
            <Link href="/pokemons/list-ssr/">SSR-LIST</Link>
          </li>
          <li>
            <Link href="/pokemons/list-client/">CLIENT-LIST</Link>
          </li>
          <li>
            <Link href="/counter/">COUNTER</Link>
          </li>
          <li>
            <Link href="/login/">LOGIN</Link>
          </li>
          <li>
            <Link href="/dashboard/">DASHBOARD</Link>
          </li>
        </ul>
      </div>
    </header>
  );
});
