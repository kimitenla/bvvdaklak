import { put, call } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { handleCreateSaga } from "../../../utils/helper";
import { ISaga, IAction } from "../../../interfaces";
import { ScoreActions } from "../../reducers/Score/score";

import {
  CreateScore,
  Get_Score_List_API,
  Get_List_Score_Today,
} from "../../../api/score";

function* handleCreate(action: IAction) {
  const { data, cb } = action.payload;
  try {
    const res: AxiosResponse = yield call(CreateScore, data);
    if (res) {
      console.log(res, "res");
      yield put(ScoreActions.CREATE_SCORE_SUCCESS(action.payload.data));
      if (cb && typeof cb === "function") yield cb({ isSuccess: true });
    }
  } catch (e: any) {
    console.log(e.data, " e.data");
    yield put(ScoreActions.CREATE_SCORE_FAILED());
    if (cb && typeof cb === "function")
      yield cb({ isFailed: true, error: e.data });
  }
}
function* handleGet(action: IAction) {
  try {
    const res: AxiosResponse = yield call(Get_Score_List_API);

    if (res.data) yield put(ScoreActions.GET_LIST_VIEWSCORE_SUCCESS(res.data));
  } catch (e) {
    yield put(ScoreActions.GET_LIST_VIEWSCORE_FAILED());
  }
}
function* handleScoreSaga(action: IAction) {
  try {
    const { data, cb } = action.payload;
    const res: AxiosResponse = yield call(Get_List_Score_Today, data);

    if (res.data)
      yield put(ScoreActions.REQUREST_SCORETODAYLIST_SUCCESS(res.data));

    if (cb && typeof cb === "function") yield cb({ isSuccess: true });
  } catch (e) {
    yield put(ScoreActions.REQUREST_SCORETODAYLIST_FAILED);
  }
}

//

/**
 * khuc nay la tao ra 1 saga de lang nghe action get list request, khi action get_list_request -cai nay biet r | oke
 */

const createSaga: ISaga = {
  on: ScoreActions.CREATE_SCORE_REQUREST,
  handle: handleCreate,
};
const getListSaga: ISaga = {
  on: ScoreActions.GET_LIST_VIEWSCORE_REQUREST,
  handle: handleGet,
};
const getListScoreSaga: ISaga = {
  on: ScoreActions.REQUREST_SCORETODAYLIST,
  handle: handleScoreSaga,
};

export default handleCreateSaga([getListSaga, createSaga, getListScoreSaga]);
