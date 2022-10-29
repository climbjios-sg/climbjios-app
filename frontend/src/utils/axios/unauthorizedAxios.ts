import axios from 'axios';
// config
import { HOST_API } from '../../config';

// Unauthorized axios queries backend APIs that doesn't need authentication

const unauthorizedAxios = axios.create({
  baseURL: HOST_API,
});

export default unauthorizedAxios;
