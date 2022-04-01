import restful from "../utils/service";

const CreateScore: any = async (data: any) => {
  console.log("gửi api", data);
  try {
    return await restful.POST("score", data);
  } catch (e: any) {
    console.log(e.response, "e.response");

    throw e.response;
  }
};
const Get_Score_List_API: any = async () => {
  try {
    return await restful.GET("score");
  } catch (e: any) {
    if (e?.response) return e.response;
    throw e.response;
  }
};
const Get_List_Score_Today: any = async (data: any) => {
  try {
    console.log(data, "data gửi đi từ client");
    return await restful.GET(`score/find${data}`);
  } catch (e: any) {
    if (e?.response) return e.response;
    throw e.response;
  }
};

export { CreateScore, Get_Score_List_API, Get_List_Score_Today };
