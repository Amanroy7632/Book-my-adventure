import { useState, useEffect } from 'react';

function  useFetch(url, requestOptions) {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        // if (error.message.includes("fetch")) {
        //   setErrorMessage("Internet Connection Error", error.message)
        // }
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { loading, errorMessage, data };
}

export default useFetch;
