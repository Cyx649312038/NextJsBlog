import PostsGrid from "@/components/posts/posts-grid"
import classess from "./featured-posts.module.css"
export default function FeaturedPosts(props) {

    return (
        <section className={classess.latest}>
            <h2>Featured Posts</h2>
            <PostsGrid posts={props.posts}/>
        </section>
    )
}