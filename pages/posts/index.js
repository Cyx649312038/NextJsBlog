import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/posts-util";
import Head from "next/head";
import { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
export default function Posts(props) {
  // useEffect(() => {
  //   getSession().then((session) => {
  //     if(!session) {
  //       window.location.href= "/auth"
  //     }
  //   });
  // });
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) {
      window.location.href = "/auth";
    }
  });
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts!"
        />
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
}
