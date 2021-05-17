import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  // Loop over each item in the order
  return order.reduce((runningtotal, singleOrder) => {
    const pizza = pizzas.find((p) => p.id === singleOrder.id);
    return runningtotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
}
