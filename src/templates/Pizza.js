import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

const PizzaGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

export default function SinglePizzaPage({ data: { pizza } }) {
  console.log(pizza);
  return (
    <PizzaGrid>
      <Img fluid={pizza.image.asset.fluid} />
      <div>
        <h2 className="mark">{pizza.name}</h2>
        <ul>
          {pizza.toppings.map((topping) => (
            <li key={topping.id}>{topping.name}</li>
          ))}
        </ul>
      </div>
    </PizzaGrid>
  );
}

// this needs to be Dynamic  based on the slug passed in via context in gatsby-node.js
// This is a GraphQL Query which has access to all our contexts directly
// use Parens after QUERY to pass in Dynamic variables
// all Dynamic variables being accepted must be TYPED
// the BANG ( ` ! `) on the end means it's absolutely required... meaning you cannot view this page without passing it a slug
// $slug is passed in because we set a CONTEXT variable named SLUG when we call **actions.createPage** from **gatsby-node.js**
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
      }
    }
  }
`;
