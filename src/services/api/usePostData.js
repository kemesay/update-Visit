import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const postData = async (endpoint, token, data) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
    };
    const response = await axios.post(endpoint, data, config);
    console.log('rrrrrr',response)
    return response;
    
  } catch (response) {
    // console.log('eeeee',response.response.data)
    throw new Error(response);
  }
};

const usePostData = (endpoint, token) => {
  const queryClient = useQueryClient();
  const makeRequest = async (data) => {
    return await postData(endpoint, token, data);
  };

  return useMutation(makeRequest,
    {
      onSuccess: (data) => {
      queryClient.invalidateQueries([endpoint,token])
     
    }
    });
};

export default usePostData;
