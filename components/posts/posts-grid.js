import PostItem from "@/components/posts/post-item"
import classess from "./posts-grid.module.css"
export default function PostsGrid(props) {

    return (
        <ul className={classess.grid}>
            {
                props.posts.map(post => <PostItem key={post.slug} post={post}/>)
            }
        </ul>
        
    )
}