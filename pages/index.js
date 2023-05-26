import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ pokemon }) {
  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Layout title={"Pokedex"}>
          <div className="container pokemon text-center">
            <div className="list">
              {pokemon.map((post, index) => (
                <Link
                  href={`pokemon/${post.name}`}
                  className="link"
                  key={index}
                >
                  <div className="poke-list text-center">
                    <img
                      className="poke-image"
                      src={post.image}
                      alt="pokemon"
                    />
                    <div className="poke-name">
                      {post.name[0].toUpperCase() + post.name.slice(1)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
  const { results } = await res.json();
  const pokemon = results.map((results, index) => {
    const paddedIndex = ("000" + (index + 1)).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    return {
      ...results,
      image,
    };
  });

  return {
    props: {
      pokemon,
    },
  };
}