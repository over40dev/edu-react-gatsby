import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve(`./src/templates/Pizza.js`);
  //  2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // console.log(data);
  //  3. Loop over each pizza and create a page for that pizza
  // use forEach() because we are just looping... not returning anything
  data.pizzas.nodes.forEach((pizza) => {
    // console.log(`Creating page for ${p.name}`);
    // .createPage() is the actual method while createPages is the Hook into it
    actions.createPage({
      // What is the URL for this new page??
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get the template
  const toppingsTemplate = path.resolve(`./src/pages/pizzas.js`);
  // 2. Query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);

  // 3. createPage for that topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingsTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // 4. Pass topping data to Pizza.js
}

export async function createPages(params) {
  // create pages dynamically
  // Pizzas and Toppings
  // Since both can be run **concurrently** and both are **JavaScript Promise-based** we can `await Promise.all([...])` and pass an array of **Promises**.
  // Wait for all promises to be resolved before finishing this function (i.e. go web page)
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);

  //  3. Slicemasters
}
