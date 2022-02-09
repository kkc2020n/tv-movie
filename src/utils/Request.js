import axios from "axios";
const get = async (url, requestType, reqHeaders = {}) => {
  return await axios.get(url);
};

export { get };
