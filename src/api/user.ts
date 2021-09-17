import restful from "../utils/service";

const GetUser: any = async () => {
  try {
    return await restful.GET("user");
  } catch (e) {
    return e;
  }
};

const CreateUser: any = async (data: any) => {
  try {
    console.log(data, "data");
    return await restful.POST("user", data);
  } catch (e: any) {
    throw e.response;
  }
};

const UpdateUser: any = async (id: any, data: any) => {
  try {
    return await restful.PUT(`user/${id}`, data);
  } catch (e) {
    return e;
  }
};

const DeleteUser: any = async (id: any) => {
  console.log(id, "id");
  try {
    return await restful.DELETE(`user/${id}`);
  } catch (e) {
    return e;
  }
};

const Login: any = async (data: any) => {
  try {
    return await restful.POST("user/login", data);
  } catch (e) {
    console.log("đây là cacth e của API ", e);
    throw e;
  }
};

export { GetUser, CreateUser, UpdateUser, DeleteUser, Login };
