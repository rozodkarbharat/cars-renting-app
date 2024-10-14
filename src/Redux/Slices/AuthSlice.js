import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const signUp = createAsyncThunk(
    "auth/signUp",
    async ({ values }, { rejectWithValue }) => {
      try {
        console.log(values,'values')
      let data =   await axios.post("http://localhost:8000/user/signup", values)

      return data
      }
      catch (error) {
        console.log(error, 'errro')
        rejectWithValue(error.response.data)
      }
    }
  );
  
  export const signIn = createAsyncThunk(
    "auth/signIn",
    async (values,{rejectWithValue}) => {
      try {
        let data =   await axios.post("http://localhost:8000/user/login", values)
        console.log(data,'data')
        return data
      }
      catch (error) {
        console.log(error, 'errro')
        rejectWithValue(error.response.data)
      }
    }
  );
  


const authSlice = createSlice({
    name: "auth",
    initialState: {
      isLoading: false,
      error: null,
      token: false,
      role:""
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(signUp.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(signUp.fulfilled, (state, action) => {
          state.token = false;
          state.isLoading = false;
        })
        .addCase(signUp.rejected, (state, action) => {
          console.error("Error during sign-up:", action.error.message);
          state.isLoading = false;
          state.error = action.error.message;
        })
        .addCase(signIn.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(signIn.fulfilled, (state, action) => {
          console.log(action.payload.data.token,'payload')
          if(action.payload.data && action.payload.data.token){
            state.token = action.payload.data.token;
            state.role = action.payload.data.role || "user"
            state.isLoading = false;
          }
          else{
            state.token = "";
            state.isLoading = false;
            state.error = "error";
          }
        })
        .addCase(signIn.rejected, (state, action) => {
          console.error("Error during sign-in:", action.error.message);
          state.isLoading = false;
          state.error = action.error.message;
        })
    },
  });
  
  export default authSlice.reducer;