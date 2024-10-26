import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const signUp = createAsyncThunk(
    "auth/signUp",
    async ({ values }, { rejectWithValue }) => {
      try {
      let data =   await axios.post("http://localhost:8000/auth/signup", values,{withCredentials:true})
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
        let data =   await axios.post("http://localhost:8000/auth/login",values, {withCredentials: true});
        return data
      }
      catch (error) {
        return rejectWithValue(error.response.data)
      }
    }
  );

  export const verifyEmail = createAsyncThunk(
    "auth/verifyEmail",
    async (token,{rejectWithValue}) => {
      try {
        let data =   await axios("http://localhost:8000/auth/verifyEmail", {
          headers:{
            token: `Bearer ${token}`,
          },
          withCredentials:true
        })
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

        let res = await axios("http://localhost:8000/auth/signout",{withCredentials:true})
        return {error:false}; 
      } catch (error) {
        console.log("Error during sign-out:", error);
        return rejectWithValue(error.response?.data || "An error occurred during sign-out");
      }
    }
  );

export const validateUser  = createAsyncThunk(
  "auth/validate",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axios("http://localhost:8000/auth/validate-user",{withCredentials:true})
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);


const authSlice = createSlice({
    name: "auth",
    initialState: {
      isLoading: false,
      error: null,
      role: "",
    
    },
    
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(signUp.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(signUp.fulfilled, (state, action) => {
          state.role = "";
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
          if(action.payload.data && action.payload.data.role){
            state.role = action.payload.data.role
          }
            state.isLoading = false;
            state.error = "error";
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
          state.role = "";
          state.isLoading = false;
        })
        .addCase(signOut.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        })
        .addCase(validateUser.pending, (state,action) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(validateUser.fulfilled, (state,action) => {
          if(action.payload.data && action.payload.data.role){
            state.role = action.payload.data.role;            
          }
          state.isLoading = false;
        })
        .addCase(validateUser.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload; 
        })
        .addCase(verifyEmail.pending, (state,action) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(verifyEmail.fulfilled, (state,action) => {
          state.isLoading = false;
          state.error = null;
        })
        .addCase(verifyEmail.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload; 
        });
    },
  });
  
  export default authSlice.reducer;