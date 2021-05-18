import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function attachNamesAndPrices(order, pizzas) {
  return order.map((o) => {
    const pizza = pizzas.find((p) => p.id === o.id);
    console.log(pizza);
    return {
      ...o,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(pizza.price, o.size)),
    };
  });
}
