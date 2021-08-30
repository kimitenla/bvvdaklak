import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
/** file nay dung de setup service */

const service = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  try {
    return await axios({
      ...config,
      baseURL: "http://localhost:5000/",
      //  baseURL: "https://5fb4e4cde473ab0016a171b8.mockapi.io",
    });
  } catch (e) {
    console.log("đây là file catch bên service");
    throw e;
  }
};

const restful = {
  GET: (path: string) => service({ method: "GET", url: path }),

  POST: (path: string, data: any) =>
    service({ method: "POST", url: path, data }),

  PUT: (path: string, data: any) => service({ method: "PUT", url: path, data }),

  DELETE: (path: string) => service({ method: "DELETE", url: path }),
};

export default restful;
