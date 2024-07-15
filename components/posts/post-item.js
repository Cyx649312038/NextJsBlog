import classess from "./post-item.module.css";
import Link from "next/link";
import Image from "next/image";
export default function PostItem(props) {

  const {image, title, time, slug, excerpt} = props.post
  const src = "/images/posts/" +  image

  return (
    <li className={classess.post}>
      <Link href={"/posts/" + slug}>
        <div className={classess.image}>
            <Image src ={src} alt={title} width={300} height={200} layout="responsive"/>
        </div>
        <div className={classess.content}>
            <h3>{title}</h3>
            <time>{time}</time>
            <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
}
