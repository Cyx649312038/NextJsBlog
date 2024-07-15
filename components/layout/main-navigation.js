import Link from "next/link";
import Logo from "./logo";
import classess from "./main-navigation.module.css";

export default function MainNavigation() {
  return (
    <header className={classess.header}>
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
