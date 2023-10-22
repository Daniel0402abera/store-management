import api from './api';

export const loginUser = async (credentials) => {
   try {
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  const response = await api.post('login', credentials,config);
    return response.data;
   } catch (error) {
    throw new Error(error);
   }
    
};

export const refreshToken = async (refreshToken) => {
  const response = await api.post('login', { refreshToken });
    return response.data;
};
