import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async (endpoint, token) => {
  const config = {
    headers: {
      //   Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(endpoint, config);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch data from the ${endpoint}.`);
  }
};

const useGetData = (endpoint, token) => {
  return useQuery([endpoint, token], () => fetchData(endpoint, token));
};
export { fetchData };
export default useGetData;
