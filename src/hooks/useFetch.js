import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';

export default (url) => {
  const baseUrl = 'https://api.realworld.io/api';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage('token');

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    let skipGetResponseAfterDestroy = false;

    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : '',
        },
      },
    };
    if (!isLoading) {
      return;
    }
    axios(baseUrl + url, requestOptions)
      .then((res) => {
        if (!skipGetResponseAfterDestroy) {
          setResponse(res.data);
          setResponseStatus(res.status);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (!skipGetResponseAfterDestroy) {
          setError(error.response.data);
          setIsLoading(false);
        }
      });

    return () => {
      skipGetResponseAfterDestroy = true;
    };
  }, [isLoading, options, url]);

  return [{ isLoading, response, error, responseStatus }, doFetch];
};
