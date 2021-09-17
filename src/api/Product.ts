import restful from "../utils/service";

const GetAllProduct: any = async () => {
  try {
    return await restful.GET("meetups/getallMeetups");
  } catch (e) {
    return e;
  }
};
const GetProduct: any = async () => {
  try {
    return await restful.GET(`meetups/fromtoday`);
  } catch (e) {
    return e;
  }
};
const GetMyMeetups: any = async () => {
  const token = localStorage.getItem("token");
  try {
    return await restful.GET(`meetups/${token}`);
  } catch (e) {
    return e;
  }
};
const CreateProduct: any = async (data: any) => {
  try {
    return await restful.POST("meetups", data);
  } catch (e: any) {
    throw e.response;
  }
};

const UpdateProduct: any = async (id: any, data: any) => {
  try {
    return await restful.PUT(`meetups/${id}`, data);
  } catch (e: any) {
    console.log("e.response", e);
    throw e.response;
  }
};

const DeleteProduct: any = async (id: any) => {
  try {
    return await restful.DELETE(`meetups/${id}`);
  } catch (e) {
    return e;
  }
};
const getListToday: any = async (data: any) => {
  try {
    return await restful.GET(`meetups/${data}`);
  } catch (e) {
    return e;
  }
};

export {
  GetProduct,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  GetAllProduct,
  getListToday,
};
