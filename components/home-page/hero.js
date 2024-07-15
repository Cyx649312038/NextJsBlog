import Image from "next/image"
import classes from "./hero.module.css"
export default function HeroPage() {

    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src="/images/site/max.png" alt="image" width={300} height={300}/>
            </div>
            <h1>Hi,Im Cyxx</h1>
            <p>
                This is my blog, thanks for visit
            </p>
        </section>
    )
}