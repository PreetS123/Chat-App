import axios from "axios";


export const AxiosInstance = axios.create({
    proxy: {
      host: 'http://localhost:5000',
      port: 5000,
    },
  });


  