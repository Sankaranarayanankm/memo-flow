import { useEffect, useState } from "react";

export default function useFetch(url, options = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getData() {
    try {
      setLoading(true);
      const response = await fetch(url, { ...options });
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error("Failed request");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, [url]);
  return { data, loading, error };
}
