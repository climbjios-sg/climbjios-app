import axios from 'axios';

const http = axios.create({
  baseURL: `https://api.climbjios.com`,
  headers: {
    "Content-type": "application/json",
  },
});

// ----------------------------------------------------------------------

export const authenticate = async () => {
  try {
    const res = await http.get("v1/auth/google");
  } catch (err) {
    console.error(err);
  }
};