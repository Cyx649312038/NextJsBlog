import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getAllPostFiles } from "@/lib/posts-util";
import Head from "next/head";
import { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
export default function PostDetail(props) {
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) {
      window.location.href = "/auth";
    }
  });
  // useEffect(() => {
  //   getSession().then((session) => {
  //     if(!session) {
  //       window.location.href= "/auth"
  //     }
  //   });
  // });
  return (
    <>
    <Head>
      <title>{props.posts.title}</title>
      <meta name="description" content={props.posts.excerpt} />
    </Head>
    <PostContent detail={props.posts} />;
  </>
  )
}

export function getStaticProps(content) {
  const { slug } = content.params;
  const posts = getPostData(slug);
  return {
    props: {
      posts,
    },
  };
}

export function getStaticPaths() {
  const posts = getAllPostFiles();
  const paths = posts.map((item) => {
    return { params: { slug: item.replace(/\.md$/, "") } };
  });
  return {
    paths,
    fallback: "blocking",
  };
}
