 export default async function makeApiRequest  (url, method, body) {
    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log("API request success:", result);
      return result; 
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  };