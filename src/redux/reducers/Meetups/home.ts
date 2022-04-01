import { createSlice } from "@reduxjs/toolkit";

interface IDataTemp {
  Address: string;
  MonitoringRoom: string;
  UserInvitation: string;
  Userlead: [];
  User: [];
  Date: Date;
  description: string;
  id: string;
  _id: string;
  Time: Date;
  title: string;
}

// Define a type for the slice state
interface CounterState {
  loadingGet: boolean;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  data: IDataTemp[];
  data_all: IDataTemp[];
  data2: IDataTemp[];
}

// Define the initial state using that type
const initialState: CounterState = {
  loadingGet: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  data: [],
  data_all: [],
  data2: [],
};

/**
 * viet action theo cau truc : REQUEST -> SUCCESS | FAILED
 */

export const counterSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    GET_ALL_LIST_REQUREST: (state) => {
      state.loadingGet = true;
    },
    GET_ALL_LIST_SUCCESS: (state, action) => {
      const { data } = action.payload;

      state.loadingGet = false;
      state.data_all = data;
    },
    GET_ALL_LIST_FAILED: (state) => {
      state.loadingGet = false;
    },
    GET_LIST_REQUREST: (state) => {
      state.loadingGet = true;
    },
    GET_LIST_SUCCESS: (state, action) => {
      const { data } = action.payload;

      state.loadingGet = false;
      state.data = data;
    },
    GET_LIST_FAILED: (state) => {
      state.loadingGet = false;
    },
    CREATE_TODO_REQUREST: (state, action) => {
      state.loadingCreate = true;
    },
    CREATE_TODO_SUCCESS: (state, action) => {
      state.loadingCreate = false;
    },
    CREATE_TODO_FAILED: (state) => {
      state.loadingCreate = false;
    },
    UPDATE_TODO_REQUREST: (state, action) => {
      state.loadingUpdate = true;
    },
    UPDATE_TODO_SUCCESS: (state, action) => {
      state.loadingUpdate = false;
    },
    UPDATE_TODO_FAILED: (state) => {
      state.loadingUpdate = false;
    },
    DELETE_TODO_REQUREST: (state, action) => {
      state.loadingDelete = true;
    },
    DELETE_TODO_SUCCESS: (state, action) => {
      state.loadingDelete = false;
    },
    DELETE_TODO_FAILED: (state) => {
      state.loadingDelete = false;
    },
    REQUREST_TODAYLIST: (state, action) => {
      state.loadingGet = true;
    },
    REQUREST_TODAYLIST_SUCCESS: (state, action) => {
      const { data } = action.payload;

      state.loadingGet = false;
      state.data2 = data;
    },
    REQUREST_TODAYLIST_FAILED: (state) => {
      state.loadingGet = false;
    },
  },
});

export const HomeActions = counterSlice.actions;

export default counterSlice.reducer;
