import { createSlice } from "@reduxjs/toolkit";

interface IData {
  _id: number;
  id_room: number;
  room_name: string;
  room_size: number;
}

// Define a type for the slice state
interface UserState {
  loadingGet: boolean;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  data: IData[];
}

// Define the initial state using that type
const initialState: UserState = {
  loadingGet: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  data: [],
};

/**
 * viet action theo cau truc : REQUEST -> SUCCESS | FAILED
 */

export const RoomSlice = createSlice({
  name: "room",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    GET_LIST_ROOM_REQUREST: (state) => {
      state.loadingGet = true;
    },
    GET_LIST_ROOM_SUCCESS: (state, action) => {
      const { data } = action.payload;

      // const { dataUser, limit, page } = action.payload;
      state.loadingGet = false;
      state.data = data;
    },
    GET_LIST_ROOM_FAILED: (state) => {
      state.loadingGet = false;
    },

    CREATE_ROOM_TODO_REQUREST: (state, action) => {
      state.loadingCreate = true;
    },
    CREATE_ROOM_TODO_SUCCESS: (state, action) => {
      state.loadingCreate = false;
    },
    CREATE_ROOM_TODO_FAILED: (state) => {
      state.loadingCreate = false;
    },
    UPDATE_ROOM_TODO_REQUREST: (state, action) => {
      state.loadingUpdate = true;
    },
    UPDATE_ROOM_TODO_SUCCESS: (state, action) => {
      state.loadingUpdate = false;
    },
    UPDATE_ROOM_TODO_FAILED: (state) => {
      state.loadingUpdate = false;
    },
    DELETE_ROOM_TODO_REQUREST: (state, action) => {
      state.loadingDelete = true;
    },
    DELETE_ROOM_TODO_SUCCESS: (state, action) => {
      state.loadingDelete = false;
    },
    DELETE_ROOM_TODO_FAILED: (state) => {
      state.loadingDelete = false;
    },
  },
});

export const RoomActions = RoomSlice.actions;

export default RoomSlice.reducer;
