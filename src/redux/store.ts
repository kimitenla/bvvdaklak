import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import logger from "redux-logger";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["your/action/type"],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          "meta.arg",
          "payload.cb",
          "payload.data.Date",
          "payload.data.Time",
          "payload.Date",
          "payload.Time",
          "payload.data",
        ],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }).concat(logger, sagaMiddleware),
});

rootSaga.forEach((sg) => sagaMiddleware.run(sg));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
