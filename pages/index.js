import Hero from "@/components/home-page/hero";
import FeaturedPosts from "@/components/home-page/featured-posts";
import { getFeaturedPosts } from "@/lib/posts-util";
import Head from "next/head";
import { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
export default function HomePage(props) {
  // 也可以放到getserverside里面避免闪烁跳转
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) {
      window.location.href = "/auth";
    }
  });
  return (
    <>
      <Head>
        <title>Max Blog</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  const posts = getFeaturedPosts();
  console.log("posts", posts);
  return {
    props: {
      posts,
    },
  };
}
