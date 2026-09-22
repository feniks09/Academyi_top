export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

export interface ProductListProps {
  products: Product[];
}

export interface ProductCardProps {
  product: Product;
}