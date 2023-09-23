import useFetchData from './useFetchData';

const endpoint = `${import.meta.env.VITE_PB_API}/collections/product/records`;

function useProductList() {
  const responseData = useFetchData(endpoint);
  return responseData;
}

export default useProductList;