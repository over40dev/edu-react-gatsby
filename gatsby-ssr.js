import React from 'react';
import Layout from './src/components/Layout';

export function wrapPageElement({ element }) {
  return <Layout>{element}</Layout>;
}
