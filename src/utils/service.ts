import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { notification } from "antd";
/** file nay dung de setup service */

const runService = () => {
  const token = localStorage.getItem("token");
  console.log("token", token);

  axios.defaults.headers.common["Authorization"] = token;
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (e) {
      // nghien cuu sau
      // console.log("e", e.data);
      // if (e?.error)
      // notification.error({
      //   // message: e.message || "Something wrong. Please try again!",
      //   message: "Something wrong. Please try again!",
      // });
      return Promise.reject(e);
    }
  );
};

const service = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  try {
    return await axios({
      ...config,
      // baseURL: "http://localhost:5000/",
      baseURL: "https://bvvdaklak.herokuapp.com/",
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
export { runService };
export default restful;
