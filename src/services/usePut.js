// usePutData.js
import { useEffect } from "react";

function usePutData(endpoint, data) {
  useEffect(() => {
   
    fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("PUT request success:", result);
      })
      .catch((error) => {
        console.error("PUT request error:", error);
      });
  }, [endpoint, data]);
}

export default usePutData;
