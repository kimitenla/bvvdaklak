import restful from "../utils/service";

const GetRoom: any = async () => {
  try {
    return await restful.GET("room");
  } catch (e) {
    return e;
  }
};

const CreateRoom: any = async (data: any) => {
  try {
    return await restful.POST("room", data);
  } catch (e: any) {
    // console.log(e.response, "đã xảy ra lỗi ở CreateRoom");
    if (e?.response) return e.response;
    throw e;
  }
};
const UpdateRoom: any = async (id: any, data: any) => {
  try {
    return await restful.PUT(`room/${id}`, data);
  } catch (e) {
    return e;
  }
};

const DeleteRoom: any = async (id: any) => {
  console.log(id, "id");
  try {
    return await restful.DELETE(`room/${id}`);
  } catch (e) {
    return e;
  }
};

export { GetRoom, CreateRoom, UpdateRoom, DeleteRoom };
