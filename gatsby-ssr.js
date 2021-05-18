import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export function wrapPageElement({ element }) {
  return <Layout>{element}</Layout>;
}

export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
