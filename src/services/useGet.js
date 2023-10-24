import { useQuery } from 'react-query';
import axios from 'axios';

const fetchData = async (endpoint, token) => {

  const config = { 
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(endpoint,config);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch data from the ${endpoint}.`);
  }
};

const useGet = (endpoint, token) => {
  return useQuery([endpoint, token], () => fetchData(endpoint, token));
};

export default useGet;
