import Image from "next/image";
import classess from "./post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);
import  atomDark  from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";

export default function PostContent(props) {
  const { detail } = props;
  const customerRender = {
    img(image) {
      // console.log("image",image);
      return (
        <Image
          src={`/images/posts/${image.src}`}
          alt={image.alt}
          height={300}
          width={600}
        />
      );
    },
    // img: "Image"
    code(code) {
      const { language, children  } = code;
      console.log("code", language,code);
      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          // children={children}
        >
          {children}
        </SyntaxHighlighter>
      );
    },
  };
  return (
    <article className={classess.content}>
      <PostHeader
        title={detail.title}
        image={"/images/posts/" + detail.image}
      />
      <ReactMarkdown components={customerRender}>
        {detail.content}
      </ReactMarkdown>
    </article>
  );
}
