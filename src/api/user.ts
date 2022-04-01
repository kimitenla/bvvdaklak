import restful from "../utils/service";

const GetUser: any = async () => {
  try {
    return await restful.GET("user");
  } catch (e) {
    return e;
  }
};
const GetOnRoom: any = async (room: any) => {
  console.log(room, "data đƯợc gửi đi");
  try {
    return await restful.GET(`user/get${room}`);
  } catch (e) {
    return e;
  }
};

const CreateUser: any = async (data: any) => {
  try {
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
    throw e;
  }
};

export { GetUser, CreateUser, UpdateUser, DeleteUser, Login, GetOnRoom };
