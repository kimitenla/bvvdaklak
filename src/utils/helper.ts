import flatten from "lodash.flatten";
import { takeLatest } from "redux-saga/effects";

import { ISaga } from "../interfaces";

/**
 * handle create saga
 * @param sagas
 * @returns
 */
export const handleCreateSaga = (sagas: ISaga[]) => {
  return flatten(sagas).map(
    (saga) =>
      function* take() {
        yield takeLatest(saga.on, saga.handle);
      }
  );
};
