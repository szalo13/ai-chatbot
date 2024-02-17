import { useState } from "react";

const useRequest = () => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (req: Promise<any>) => {
    setLoading(true);
    try {
      const res = await req;
      return res;
    } catch (error: any) {
      setError(error);
      return null;
    } finally {
      setLoaded(true);
      setLoading(false);
    }
  };

  return { loading, loaded, error, sendRequest };
};

export default useRequest;
