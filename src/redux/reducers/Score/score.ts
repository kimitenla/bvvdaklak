import { createSlice } from "@reduxjs/toolkit";

interface IDataScore {
  Name: String;
  readonly _id: string;
  room: String;
  marker: Object;
  candidates: Object;
  allscore: Number;
  UserLeadScore: Number;
  PointAverage: Number;
  PointAverage_Room: Number;
  dayscore: Date;
}

// Define a type for the slice state
interface ScoreState {
  loadingGet: boolean;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  dataScore: IDataScore[];
}

// Define the initial state using that type
const initialState: ScoreState = {
  loadingGet: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  dataScore: [],
};

/**
 * viet action theo cau truc : REQUEST -> SUCCESS | FAILED
 */

export const ScoreSlice = createSlice({
  name: "score",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    REQUREST_SCORETODAYLIST: (state, action) => {
      state.loadingGet = true;
    },
    REQUREST_SCORETODAYLIST_SUCCESS: (state, action) => {
      const { data } = action.payload;
      console.log(data);
      state.dataScore = data;
      state.loadingGet = false;
    },
    REQUREST_SCORETODAYLIST_FAILED: (state) => {
      state.loadingGet = false;
    },
    CREATE_SCORE_REQUREST: (state, action) => {
      state.loadingCreate = true;
    },
    CREATE_SCORE_SUCCESS: (state, action) => {
      state.loadingCreate = false;
    },
    CREATE_SCORE_FAILED: (state) => {
      state.loadingCreate = false;
    },
    GET_LIST_VIEWSCORE_REQUREST: (state) => {
      state.loadingGet = true;
    },
    GET_LIST_VIEWSCORE_SUCCESS: (state, action) => {
      const { data } = action.payload;
      state.loadingGet = false;
      state.dataScore = data;
    },
    GET_LIST_VIEWSCORE_FAILED: (state) => {
      state.loadingGet = false;
    },
  },
});

export const ScoreActions = ScoreSlice.actions;

export default ScoreSlice.reducer;
