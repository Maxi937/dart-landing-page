// This function just ensures that when axios raises an error - the error.response object is returned directly
export function registerAxiosResponseHandler(axios) {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        return error.response;
      }
      console.log(error);
      return Promise.reject(error);
    }
  );
}
