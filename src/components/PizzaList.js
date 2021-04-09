import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image'

function SinglePizza({ pizza }) {
  return (
    <div>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
        <p>{pizza.toppings.map((t) => t.name).join(', ')}</p>
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name}></Img>
        {/* <Img fixed={pizza.image.asset.fixed} alt={pizza.name}></Img> */}
      </Link>
    </div>
  );
}

export default function PizzaList({ pizzas }) {
  return (
    <>
      {pizzas.map((p) => (
        <SinglePizza key={p.id} pizza={p} />
      ))}
    </>
  );
}
