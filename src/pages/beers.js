import React from 'react';
import { graphql } from 'gatsby';

// where do the PROPS come from (not passed directly) - Gatsby magic!!!
export default function BeersPage({ data, pageContext }) {
  const allBeers = data.beers.nodes;

  return (
    <div>
      {allBeers.map(
        ({ beer }, idx) => (
          <div key={idx}>
            <img src={beer.image} alt="beer" />
            <h2>
              <span className="mark">{beer.name}</span>
              <span>{beer.price}</span>
            </h2>
          </div>
        )
        // console.log('processing beer: ', beer.name);
      )}
    </div>
  );
}

export const query = graphql`
  query BeersQuery {
    beers: allBeer {
      nodes {
        beer {
          name
          price
          image
          rating {
            average
            reviews
          }
        }
      }
    }
  }
`;
// 2. Loop over beers and turn into pages
// data.beers.nodes.forEach((beer) => {
//   console.log(beer.name);
//   // console.log(`Creating page for beer: ${beer.name}`);
// });
