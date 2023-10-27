// usePutData.js
import { useEffect } from "react";

function usePutData(endpoint, token, data) {
  useEffect(() => {
   
    fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((result) => {
      
      })
      .catch((error) => {
        console.error("PUT request error:", error);
      });
  }, [endpoint, data]);
}

export default usePutData;
