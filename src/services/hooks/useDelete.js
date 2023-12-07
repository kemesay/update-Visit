import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from "../api";

export function useDelete(endpoint) {
  const queryClient = useQueryClient();

  const configHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")} `,
    },
  };
  
  return useMutation({
    mutationFn: async (userId) => {
      try {
        const res = api.delete(`${endpoint}`,'',configHeader)
        console.log(res)
        return res
      } catch (error) {
        
      }
      
    },
    //client side optimistic update
    onMutate: (userId) => {
      queryClient.setQueryData(['users'], (prevUsers) =>
        prevUsers?.filter((user) => user.id !== userId),
      );
    },
   
  });
}