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
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    GET_ALL_LIST_REQUREST: (state) => {
      state.loadingGet = true;
    },
    GET_ALL_LIST_SUCCESS: (state, action) => {
      const { data } = action.payload;

      // const { data, limit, page } = action.payload;
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

      // const { data, limit, page } = action.payload;
      state.loadingGet = false;
      state.data = data;
    },
    GET_LIST_FAILED: (state) => {
      state.loadingGet = false;
    },
    CREATE_TODO_REQUREST: (state, action) => {
      // trong thang aciton nay co payload tu ben kia truyen vo, nhưng mà action nay chung ta chỉ dung dể goi event saga thoi nen ko can xu ly gi o day
      state.loadingCreate = true;
    },
    CREATE_TODO_SUCCESS: (state, action) => {
      state.loadingCreate = false;
      // let temp = [...state.data];
      // temp.push({ id: temp.length, ...action.payload });
      // state.data = temp;
    },
    CREATE_TODO_FAILED: (state) => {
      state.loadingCreate = false;
    },
    UPDATE_TODO_REQUREST: (state, action) => {
      // trong thang aciton nay co payload tu ben kia truyen vo, nhưng mà action nay chung ta chỉ dung dể goi event saga thoi nen ko can xu ly gi o day
      state.loadingUpdate = true;
    },
    UPDATE_TODO_SUCCESS: (state, action) => {
      // h phan update, ta se truyen len id & dataUpdate, tu id ta se tim trong data de update no,
      // hien tai dang lam voi 1 array,
      // const { id, data } = action.payload;
      state.loadingUpdate = false;
      // let temp = [...state.data];
      // let indexItem = temp.findIndex((ele) => ele.id === id);
      // // tim thay index cua item dang update, truong hop tim thay thi indexItem luon > -1, vi gia tri index la tu 0 tro len
      // if (indexItem > -1) {
      //   // bat dau update item
      //   // ta tim thay index cua item roi, thi viec tiep theo la tro? den
      //   temp[indexItem] = { ...temp[indexItem], ...data };
      // }
      // state.data = temp;
    },
    UPDATE_TODO_FAILED: (state) => {
      state.loadingUpdate = false;
    },
    DELETE_TODO_REQUREST: (state, action) => {
      // trong thang aciton nay co payload tu ben kia truyen vo, nhưng mà action nay chung ta chỉ dung dể goi event saga thoi nen ko can xu ly gi o day
      state.loadingDelete = true;
    },
    DELETE_TODO_SUCCESS: (state, action) => {
      // h phan update, ta se truyen len id & dataUpdate, tu id ta se tim trong data de update no,
      // hien tai dang lam voi 1 array,
      // const { id } = action.payload;
      state.loadingDelete = false;
      // let temp = [...state.data];
      // let indexItem = temp.findIndex((ele) => ele.id === id);
      // // tim thay index cua item dang update, truong hop tim thay thi indexItem luon > -1, vi gia tri index la tu 0 tro len
      // if (indexItem > -1) {
      //   // bat dau update item
      //   // ta tim thay index cua item roi, thi viec tiep theo la tro? den
      //   temp.splice(indexItem, 1);
      // }
      // state.data = temp;
    },
    DELETE_TODO_FAILED: (state) => {
      state.loadingDelete = false;
    },
    REQUREST_TODAYLIST: (state, action) => {
      state.loadingGet = true;
    },
    REQUREST_TODAYLIST_SUCCESS: (state, action) => {
      const { data, limit, page } = action.payload;

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
