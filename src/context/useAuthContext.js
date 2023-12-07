import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const postData = async (endpoint, data) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(endpoint, data, config);
    
    return response?.data;
    
  } catch (response) {
    throw new Error(response?.response?.data);
  }
};

const useSign = (endpoint) => {
  const queryClient = useQueryClient();
  const makeRequest = async (data) => {
    return await postData(endpoint,data);
  };
  return useMutation(makeRequest,
    {
      onSuccess: (data) => {
      queryClient.invalidateQueries([endpoint]);
      localStorage.setItem('token',JSON.stringify(data?.access_token))
      }
    });
};
export default useSign;
