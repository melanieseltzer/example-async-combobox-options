export interface Product {
  id: number;
  title: string;
}

export interface SearchResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
