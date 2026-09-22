import React from 'react';
import type { ProductListProps } from '../../types';
import ProductCard from '../ProductCard/ProductCard';


const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div>
      <h3>Список товаров</h3>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;