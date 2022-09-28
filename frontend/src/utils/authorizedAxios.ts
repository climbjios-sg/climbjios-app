import axios from 'axios';
// config
import { HOST_API,  } from '../config';

// ----------------------------------------------------------------------

const authorizedAxios = axios.create({
  baseURL: HOST_API,
});


// authorizedAxios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 403) {
//       // refreshToken();
//     }
//   }
// );

export default authorizedAxios;
