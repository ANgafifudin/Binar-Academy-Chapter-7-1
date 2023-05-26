import React from "react";
import Layout from "@/components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row } from "react-bootstrap";

function Pokemon({ pokemon }) {
  const pokeIndex = ("000" + pokemon.id).slice(-3);

  const renderTypes = () => {
    return pokemon.types.map((type) => (
      <span key={type.slot} className="list-group-item type rounded-2">
        {type.type.name}
      </span>
    ));
  };
  const renderAbility = () => {
    return pokemon.abilities.map((abl) => (
      <span key={abl.slot} className="list-group-item type rounded-2">
        {abl.ability.name}
      </span>
    ));
  };

  const renderStats = () => {
    return pokemon.stats.map((stat, index) => (
      <div key={index} className="my-1 rounded p-1 stat">
        <div
          className="stat-bar rounded"
          style={{ width: `${stat.base_stat}ex` }}
        >
          <span className="stat-name">{stat.stat.name}</span>{" "}
          <span className="numb-stat float-end">{stat.base_stat}</span>
        </div>
      </div>
    ));
  };
  return (
    <>
      <Layout title={"Home"}>
        <div className="poke-list-detail text-center">
          <img
            className="poke-image-detail"
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeIndex}.png`}
            alt="pokemon"
          />
          <div className="poke-name-detail">
            {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
          </div>
        </div>

        <div className="details">
          <div className="fw-bold">
            Element : <br />
          </div>
          <ul className="list-group list-group-flush flex-row">
            {renderTypes()}
          </ul>
          <div className="fw-bold">
            Ability : <br />
          </div>
          <ul className="list-group list-group-flush flex-row">
            {renderAbility()}
          </ul>
          <div className="stats fw-bold">Stats :{renderStats()}</div>
        </div>
      </Layout>
    </>
  );
}

export default Pokemon;

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${context.query.name}`
  );
  const pokemon = await res.json();
  return {
    props: {
      pokemon,
    },
  };
}
