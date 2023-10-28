// usePutData.js
import { useEffect } from "react";

// function usePutData(endpoint, token, data) {
//   useEffect(() => {
   
//     fetch(endpoint, {
//       method: "PUT",
//       body: JSON.stringify(data),
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//     })
//       .then((response) => response.json())
//       .then((result) => {
      
//       })
//       .catch((error) => {
//         console.error("PUT request error:", error);
//       });
//   }, [endpoint, data]);
// }

// export default usePutData;




import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const putData = async (endpoint, token, data) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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

const usePutData = (endpoint) => {

  const jsonUser = JSON.parse(localStorage.getItem('user'));
  const token = jsonUser?.access_token
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
