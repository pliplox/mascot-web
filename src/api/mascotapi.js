import axios from 'axios';

let API_HOST;
const baseHost = apiHost => `https://mascot${apiHost}.herokuapp.com`;
if (process.env.REACT_APP_ENV === 'production') {
  API_HOST = baseHost('api');
} else if (process.env.REACT_APP_ENV === 'staging') {
  API_HOST = baseHost('-api-dev');
} else {
  API_HOST = `http://localhost:3000`;
}

const mascotapi = axios.create({
  baseURL: `${API_HOST}/api/`
});

mascotapi.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('tokenId');
    if (token) {
      const { headers } = config.headers;
      headers.Authorization = token;
    }
    return config;
  },
  error => Promise.reject(error)
);

mascotapi.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    try {
      return error.response;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

export default mascotapi;
