import { createSlice } from "@reduxjs/toolkit";

interface IDataLogin {
  username: string;
  password: string;
  remember: boolean;
}

// Define a type for the slice state
interface UserState {
  loadingLogin: boolean;

  data: IDataLogin[];
}

// Define the initial state using that type
const initialState: UserState = {
  loadingLogin: false,

  data: [],
};

/**
 * viet action theo cau truc : REQUEST -> SUCCESS | FAILED
 */

export const LoginSlice = createSlice({
  name: "login",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    LOGIN_REQUREST: (state, action) => {
      state.loadingLogin = true;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.loadingLogin = false;
    },
    LOGIN_FAILED: (state) => {
      state.loadingLogin = false;
    },
  },
});

export const LoginActions = LoginSlice.actions;

export default LoginSlice.reducer;
