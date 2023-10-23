export const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huIiwicm9sZSI6WyJTVE9SRV9NQU5BR0VSIl0sImV4cCI6MTY5ODY0NjA3MiwiaWF0IjoxNjk4MDQxMjcyfQ.RCAftMgvESkb8YJTj6EkF3EaoXvruQE6RFjLUfYdjtI";

export const host = "http://localhost:9191";
export const baseURL = 'https://storemanagementapi.onrender.com/'

export const configHeader = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};
