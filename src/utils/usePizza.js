import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // 1. create state to hold order
  // we get rid of this next line because we moved useState up to the provider
  // const [order, setOrder] = useState([]);
  // Now we access both our state and our updater function (setOrder) via context
  const [order, setOrder] = useContext(OrderContext);

  // 2. Make a function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Make a function to remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before index
      ...order.slice(0, index),
      // everything after index
      ...order.slice(index + 1),
    ]);
  }
  // 4. TODO: send this data to serverless function when user checks out

  // return from Custom Hook all the things that are needed to use the Hook
  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
