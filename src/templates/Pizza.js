import React from 'react';
import { graphql } from 'gatsby';

export default function SinglePizzaPage() {
  return <p>Single Pizza!!!</p>;
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
