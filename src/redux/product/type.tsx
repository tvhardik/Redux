export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type ProductState = {
  products: Product[];
  loading: boolean;
};
export type ProductError = {};
