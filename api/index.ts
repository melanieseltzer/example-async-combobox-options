import { SearchResponse } from '@/types';
import ky from 'ky';

const mockDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const searchProductsByName = async (query: string) => {
  await mockDelay(1500);

  return ky
    .get(`https://dummyjson.com/products/search?q=${query}`)
    .json<SearchResponse>();
};
