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
      
      return result; 
    } catch (error) {
      
      throw error;
    }
  };