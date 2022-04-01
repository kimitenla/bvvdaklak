import { createSlice } from "@reduxjs/toolkit";

interface IDataUser {
  readonly _id: number;
  ID_NB: number;
  Name: string;
  Phone_Number: string;
  Role: string;
  Status: string;
  email: string;
  job_type: string;
  user_room: string;
  password: string;
}

// Define a type for the slice state
interface UserState {
  loadingGet: boolean;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  dataUser: IDataUser[];
}

// Define the initial state using that type
const initialState: UserState = {
  loadingGet: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  dataUser: [],
};

/**
 * viet action theo cau truc : REQUEST -> SUCCESS | FAILED
 */

export const UserSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    GET_LIST_REQUREST: (state) => {
      state.loadingGet = true;
    },
    GET_LIST_SUCCESS: (state, action) => {
      const { data } = action.payload;

      // const { dataUser, limit, page } = action.payload;
      state.loadingGet = false;
      state.dataUser = data;
    },
    GET_LIST_FAILED: (state) => {
      state.loadingGet = false;
    },
    GET_LIST_ON_ROOM: (state, action) => {
      state.loadingGet = false;
    },
    GET_LIST_ON_ROOM_SUCCESS: (state, action) => {
      console.log("con gà");
      console.log(action.payload, "action.payload");
      const data = action.payload;
      state.loadingGet = false;
      state.dataUser = data;
    },
    GET_LIST_ON_ROOM_FAILED: (state) => {
      console.log("con gà thất bại");
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
  },
});

export const UserActions = UserSlice.actions;

export default UserSlice.reducer;
