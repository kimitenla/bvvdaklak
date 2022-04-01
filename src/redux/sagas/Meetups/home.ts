import { put, call } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { handleCreateSaga } from "../../../utils/helper";
import { ISaga, IAction } from "../../../interfaces";
import { HomeActions } from "../../reducers/Meetups/home";

import {
  GetProduct,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  GetAllProduct,
  getListToday,
} from "../../../api/Product";

function* handleGetist(action: IAction) {
  try {
    const res: AxiosResponse = yield call(GetProduct);
    if (res.data)
      // co data tu api roi thi ta save vao store
      yield put(HomeActions.GET_LIST_SUCCESS(res.data));
  } catch (e) {
    yield put(HomeActions.GET_LIST_FAILED());
  }
}
function* handleGetallList(action: IAction) {
  try {
    const res: AxiosResponse = yield call(GetAllProduct);

    if (res.data)
      // co data tu api roi thi ta save vao store
      yield put(HomeActions.GET_ALL_LIST_SUCCESS(res.data));
  } catch (e) {
    yield put(HomeActions.GET_ALL_LIST_FAILED());
  }
}

function* handleCreate(action: IAction) {
  const { data, cb } = action.payload;
  // trong handle nay tham so nhan vao la 1 action (type & payload), cai payload nay la cai dc truyen vao luc díspatch âấ
  try {
    // api thi goi ở đây
    // vi du co func call api
    // const res = yield call(funcAPI,tham số);
    // day la truong hop call api trong saga, con neu call o component thi truyen vao luc dispatch thoy, roi trong saga no nhâậ o phan action

    const res: AxiosResponse = yield call(CreateProduct, data);
    if (res) {
      yield put(HomeActions.CREATE_TODO_SUCCESS(action.payload.data));
      yield put(HomeActions.GET_LIST_REQUREST());
      yield put(HomeActions.GET_ALL_LIST_REQUREST());

      // o ben kia chung ta truyen them 1 func callback de tra data tu saga ve component
      // check if cb exist & type is func
      if (cb && typeof cb === "function") yield cb({ isSuccess: true });
    }
  } catch (e: any) {
    yield put(HomeActions.CREATE_TODO_FAILED());
    yield cb({ isFailed: true, error: e.data });
  }
}

function* handleUpdate(action: IAction) {
  // trong handle nay tham so nhan vao la 1 action (type & payload), cai payload nay la cai dc truyen vao luc díspatch âấ
  const { data, id, cb } = action.payload;
  try {
    const res: AxiosResponse = yield call(UpdateProduct, id, data);

    if (res) {
      yield put(HomeActions.UPDATE_TODO_SUCCESS({ data, id }));
      yield put(HomeActions.GET_LIST_REQUREST());
      yield put(HomeActions.GET_ALL_LIST_REQUREST());
      // o ben kia chung ta truyen them 1 func callback de tra data tu saga ve component
      // check if cb exist & type is func
      if (cb && typeof cb === "function") yield cb({ isSuccess: true });
    }
  } catch (e: any) {
    yield put(HomeActions.UPDATE_TODO_FAILED());
    yield cb({ isFailed: true, error: e.data });
  }
}
function* handleGettoday(action: IAction) {
  // trong handle nay tham so nhan vao la 1 action (type & payload), cai payload nay la cai dc truyen vao luc díspatch âấ
  try {
    const { data, cb } = action.payload;

    const res: AxiosResponse = yield call(getListToday, data);

    if (res) {
      yield put(HomeActions.REQUREST_TODAYLIST_SUCCESS(res.data));

      // o ben kia chung ta truyen them 1 func callback de tra data tu saga ve component
      // check if cb exist & type is func
      if (cb && typeof cb === "function") yield cb({ isSuccess: true });
    }
  } catch (e) {
    yield put(HomeActions.REQUREST_TODAYLIST_FAILED());
  }
}

//
function* handleDelete(action: IAction) {
  try {
    const { id, cb } = action.payload;

    const res: AxiosResponse = yield call(DeleteProduct, id);
    if (res) {
      yield put(HomeActions.DELETE_TODO_SUCCESS({ id }));
      yield put(HomeActions.GET_LIST_REQUREST());
      yield put(HomeActions.GET_ALL_LIST_REQUREST());

      if (cb && typeof cb === "function") yield cb({ isSuccess: true });
    }
  } catch (e) {
    yield put(HomeActions.DELETE_TODO_FAILED());
  }
}

/**
 * khuc nay la tao ra 1 saga de lang nghe action get list request, khi action get_list_request -cai nay biet r | oke
 */
const getListSaga: ISaga = {
  on: HomeActions.GET_LIST_REQUREST,
  handle: handleGetist,
};
const getallproduct: ISaga = {
  on: HomeActions.GET_ALL_LIST_REQUREST,
  handle: handleGetallList,
};
// khuc nay dc goi roi thi se chay handle create
const createSaga: ISaga = {
  on: HomeActions.CREATE_TODO_REQUREST,
  handle: handleCreate,
};
// khuc nay dc goi roi thi se chay handle create
const updateSaga: ISaga = {
  on: HomeActions.UPDATE_TODO_REQUREST,
  handle: handleUpdate,
};
const deleteSaga: ISaga = {
  on: HomeActions.DELETE_TODO_REQUREST,
  handle: handleDelete,
};
const gettodaySaga: ISaga = {
  on: HomeActions.REQUREST_TODAYLIST,
  handle: handleGettoday,
};

export default handleCreateSaga([
  getListSaga,
  createSaga,
  updateSaga,
  deleteSaga,
  getallproduct,
  gettodaySaga,
]);
