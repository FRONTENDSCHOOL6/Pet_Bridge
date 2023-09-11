import useFetchData from './useFetchData';

const getEndpoint = (productId) =>
  `VITE_PB_API/collections/product/records/${productId}`;


function useProductItem(productId) {
  const responseData = useFetchData(getEndpoint(productId));
  return responseData;
}

export default useProductItem; 