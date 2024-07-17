import Link from "next/link";
import Logo from "./logo";
import classess from "./main-navigation.module.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';

export default function MainNavigation() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log("useSession", session, status);
  return (
    <header className={classess.header}>
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul>
          {!session && status !== "loading" && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && status !== "loading" && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && status !== "loading" && (
            <li>
              <Link href="/posts">Posts</Link>
            </li>
          )}
          {session && status !== "loading" && (
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          )}
          {session && status !== "loading" && (
            <li>
              {/* 调用signOut next-auth会自动清除cookie里的token 并更新useSession的状态 */}
              <button
                onClick={async() => {
                  await signOut();
                  // router.replace('/auth');
                  window.location.href = "/auth"
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
