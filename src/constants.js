export const token = "";

export const host = "http://localhost:9191";

export const configHeader = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};
