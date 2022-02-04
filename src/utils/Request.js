import axios from "axios";
const get = (url, requestType, reqHeaders = {}) => {
  return axios.get(url);
};

export { get };
