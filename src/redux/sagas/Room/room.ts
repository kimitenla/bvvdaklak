import { put, call } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { handleCreateSaga } from "../../../utils/helper";
import { ISaga, IAction } from "../../../interfaces";
import { RoomActions } from "../../reducers/Room/room";

import { GetRoom, CreateRoom, UpdateRoom, DeleteRoom } from "../../../api/room";

function* handleGetist(action: IAction) {
  try {
    const res: AxiosResponse = yield call(GetRoom);

    if (res.data)
      // co data tu api roi thi ta save vao store
      yield put(RoomActions.GET_LIST_ROOM_SUCCESS(res.data));
  } catch (e) {
    yield put(RoomActions.GET_LIST_ROOM_FAILED());
  }
}

function* handleCreate(action: IAction) {
  const { data, cb } = action.payload;
  try {
    console.log(data, "data saga");
    const res: AxiosResponse = yield call(CreateRoom, data);

    if (res) {
      yield put(RoomActions.CREATE_ROOM_TODO_SUCCESS(action.payload.data));
      yield put(RoomActions.GET_LIST_ROOM_REQUREST());
      if (cb && typeof cb === "function") yield cb({ isSuccess: true });
    }
  } catch (e) {
    yield put(RoomActions.CREATE_ROOM_TODO_FAILED());
    if (cb && typeof cb === "function")
      yield cb({ isFailed: true, error: e.data });
  }
}
function* handleUpdate(action: IAction) {
  // trong handle nay tham so nhan vao la 1 action (type & payload), cai payload nay la cai dc truyen vao luc díspatch âấ
  try {
    // api thi goi ở đây
    // vi du co func call api
    // const res = yield call(funcAPI,tham số);
    // day la truong hop call api trong saga, con neu call o component thi truyen vao luc dispatch thoy, roi trong saga no nhâậ o phan action

    const { data, id, cb } = action.payload;
    const res: AxiosResponse = yield call(UpdateRoom, id, data);

    if (res) {
      yield put(RoomActions.CREATE_ROOM_TODO_SUCCESS({ data, id }));
      yield put(RoomActions.GET_LIST_ROOM_REQUREST());
      // o ben kia chung ta truyen them 1 func callback de tra data tu saga ve component
      // check if cb exist & type is func
      if (cb && typeof cb === "function") yield cb({ isSuccess: true });
    }
  } catch (e) {
    yield put(RoomActions.CREATE_ROOM_TODO_FAILED());
  }
}

//
function* handleDelete(action: IAction) {
  try {
    const { id, cb } = action.payload;

    const res: AxiosResponse = yield call(DeleteRoom, id);
    if (res) {
      yield put(RoomActions.DELETE_ROOM_TODO_SUCCESS({ id }));
      yield put(RoomActions.GET_LIST_ROOM_REQUREST());

      if (cb && typeof cb === "function") yield cb({ isSuccess: true });
    }
  } catch (e) {
    yield put(RoomActions.DELETE_ROOM_TODO_FAILED());
  }
}

/**
 * khuc nay la tao ra 1 saga de lang nghe action get list request, khi action get_list_request -cai nay biet r | oke
 */
const getListSaga: ISaga = {
  on: RoomActions.GET_LIST_ROOM_REQUREST,
  handle: handleGetist,
};

const createSaga: ISaga = {
  on: RoomActions.CREATE_ROOM_TODO_REQUREST,
  handle: handleCreate,
};
const updateSaga: ISaga = {
  on: RoomActions.UPDATE_ROOM_TODO_REQUREST,
  handle: handleUpdate,
};
const deleteSaga: ISaga = {
  on: RoomActions.DELETE_ROOM_TODO_REQUREST,
  handle: handleDelete,
};

export default handleCreateSaga([
  getListSaga,
  createSaga,
  updateSaga,
  deleteSaga,
]);
