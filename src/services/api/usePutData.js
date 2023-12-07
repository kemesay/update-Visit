import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const putData = async (endpoint, token, data) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
    };
    const response = await axios.put(endpoint, data, config);
    console.log('rrrrrr', response);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw new Error(error);
  }
};

const usePutData = (endpoint, token) => {

  const queryClient = useQueryClient();
  const makeRequest = async (data) => {
    return await putData(endpoint, token, data);
  };

  return useMutation(makeRequest, {
    onSuccess: (data) => {
      
      queryClient.invalidateQueries([endpoint, token]);
    },
  });
};

export default usePutData;
