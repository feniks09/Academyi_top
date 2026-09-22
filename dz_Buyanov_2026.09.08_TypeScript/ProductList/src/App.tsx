// App.tsx
import React from 'react';
import type { Product } from './components/ProductList/types';
import ProductList from './components/ProductList/ProductList';


const App: React.FC = () => {
  const products: Product[] = [
    { id: 1, name: 'Ноутбук', price: 75000, inStock: true },
    { id: 2, name: 'Мышь', price: 1500, inStock: false },
    { id: 3, name: 'Монитор', price: 12000, inStock: true },
  ];

  return <ProductList products={products} />;
};

export default App;