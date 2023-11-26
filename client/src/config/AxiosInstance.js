import axios from "axios";


export const AxiosInstance = axios.create({
    proxy: {
      host: 'http://localhost:8000',
      port: 8000,
    },
  });


  