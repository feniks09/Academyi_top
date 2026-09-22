// ProductCard.tsx
import React from 'react';
import type { ProductCardProps } from '../../types';


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div style={{border : '1px solid black'}}>
      <h3>{product.name}</h3>
      <p>Цена: {product.price} ₽</p>
      <p>{product.inStock ? 'В наличии' : 'Нет в наличии'}</p>
    </div>
  );
};

export default ProductCard;