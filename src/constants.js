export const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYW5pIiwicm9sZSI6WyJTVE9SRV9NQU5BR0VSIl0sImV4cCI6MTY5ODY5NjI0NiwiaWF0IjoxNjk4MDkxNDQ2fQ.ijq-Ybe455TMNEAUBwJJlK0qpDK1BNGifgDFsFrZzhI";


export const host = "http://localhost:9191";
export const baseURL = 'https://storemanagementapi.onrender.com/'

export const configHeader = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};
