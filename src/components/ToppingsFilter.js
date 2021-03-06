import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0 1rem;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
    /* &.active {
      background: var(--yellow);
    } */
  }
`;

function countPizzasInTopping(pizzas) {
  // return pizzas with counts
  const counts = pizzas
    .map((p) => p.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if it is existing topping, otherwise create new entry and include count
      acc[`${topping.id}`] = acc[`${topping.id}`] || {
        id: topping.id,
        name: topping.name,
        count: 0,
      };
      // increment
      acc[`${topping.id}`].count += 1;
      return acc;
    }, {});

  return Object.values(counts).sort((a, b) => b.count - a.count);
}

export default function ToppingsFilter({ activeTopping }) {
  // Get a list of all the toppings
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  // Get a list of all the Pizzas with their toppings
  // log vars showing names of variables with accompaning output
  // console.log({ toppings, pizzas });

  // Count how many pizzas have each topping
  const toppingsWithCount = countPizzasInTopping(pizzas.nodes);

  // Loop over the list of toppings and display the topping and the count of pizzas in that topping
  // Link it up...
  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length} </span>
      </Link>
      {toppingsWithCount.map((topping) => (
        <Link
          key={topping.id}
          to={`/topping/${topping.name}`}
          className={topping.name === activeTopping ? 'active' : ''}
        >
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count} </span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
