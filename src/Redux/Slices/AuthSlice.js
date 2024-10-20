import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const signUp = createAsyncThunk(
    "auth/signUp",
    async ({ values }, { rejectWithValue }) => {
      try {
        console.log(values,'values')
      let data =   await axios.post("http://localhost:8000/auth/signup", values)

      return data
      }
      catch (error) {
        console.log(error, 'errro')
        return rejectWithValue(error.response.data)
      }
    }
  );
  
  export const signIn = createAsyncThunk(
    "auth/signIn",
    async (values,{rejectWithValue}) => {
      try {
        let data =   await axios.post("http://localhost:8000/auth/login", values)
        return data
      }
      catch (error) {
        console.log(error, 'errro')
        return rejectWithValue(error.response.data)
      }
    }
  );

  export const signOut = createAsyncThunk(
    "auth/signOut",
    async (_, { rejectWithValue }) => {
      try {

        return {error:false}; 
      } catch (error) {
        console.log("Error during sign-out:", error);
        return rejectWithValue(error.response?.data || "An error occurred during sign-out");

      }
    }
  );
  
  


const authSlice = createSlice({
    name: "auth",
    initialState: {
      isLoading: false,
      error: null,
      token: localStorage.getItem("token") || "",
      role: localStorage.getItem("role") || "",
      userId:""
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
          if(action.payload.data && action.payload.data.token){
            localStorage.setItem("role", action.payload.data.role || "user");
            localStorage.setItem("token", action.payload.data.token);
            state.token = action.payload.data.token;
            state.role = action.payload.data.role || "user"
            state.isLoading = false;
            state.userId = action.payload.data.id
          }
          else{
            state.token = "";
            state.isLoading = false;
            state.error = "error";
            state.userId = ""
          }
        })
        .addCase(signIn.rejected, (state, action) => {
          console.error("Error during sign-in:", action.error.message);
          state.isLoading = false;
          state.error = action.error.message;
        })
        .addCase(signOut.pending, (state,action) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(signOut.fulfilled, (state,action) => {
          localStorage.removeItem("role");
          localStorage.removeItem("token");
          state.token = "";
          state.role = "";
          state.isLoading = false;
          state.userId = "";
        })
        .addCase(signOut.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload; // Set the error message from action.payload
        });
    },
  });
  
  export default authSlice.reducer;