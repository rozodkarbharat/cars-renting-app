import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getfeaturesCars = createAsyncThunk(
  "cars/featuredcars",
  async (values, { rejectWithValue }) => {
    try {
      let data = await axios("http://localhost:8000/car/featured-cars")
      return data.data
    }
    catch (error) {
      console.log(error, 'errro')
      rejectWithValue(error.response.data)
    }
  }
);


export const getFilteredCars = createAsyncThunk(
  "cars/filteredCars",
  async (values, { rejectWithValue }) => {
    try {
      let data = await axios.post("http://localhost:8000/car/get-available-cars-by-modelid", values)
      return data.data
    }
    catch (error) {
      console.log(error, 'errro')
      rejectWithValue(error.response.data)
    }
  }
);

export const getAllCarsModels = createAsyncThunk(
  "cars/allcarsmodels",
  async (values, { rejectWithValue }) => {
    try {
      let data = await axios("http://localhost:8000/car/get-models")
      return data.data
    }
    catch (error) {
      console.log(error, 'errro')
      rejectWithValue(error.response.data)
    }
  })

export const bookCar = createAsyncThunk(
  "cars/bookcar",
  async ({ car, starttime, endtime }, { rejectWithValue }) => {
    try {
      let data = await axios("http://localhost:8000/car/get-models")
      return data.data
    }
    catch (error) {
      console.log(error, 'errro')
      rejectWithValue(error.response.data)
    }
  })




const carsSlice = createSlice({
  name: "cars",
  initialState: {
    isLoading: false,
    error: null,
    featuredCars: [],
    AllCarsModels: [],
    filteredCars: []
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getfeaturesCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getfeaturesCars.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.featuredCars = action.payload.data;
          state.isLoading = false;
        }
        else {
          state.featuredCars = [];
          state.isLoading = false;
          state.error = "error";
        }
      })
      .addCase(getfeaturesCars.rejected, (state, action) => {
        console.error("Error during sign-in:", action.error.message);
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllCarsModels.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCarsModels.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.AllCarsModels = action.payload.data;
          state.isLoading = false;
        }
        else {
          state.AllCarsModels = [];
          state.isLoading = false;
          state.error = "error";
        }
      })
      .addCase(getAllCarsModels.rejected, (state, action) => {
        console.error("Error during sign-in:", action.error.message);
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getFilteredCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFilteredCars.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.filteredCars = action.payload.data;
          state.isLoading = false;
        }
        else {
          state.AllCarsModels = [];
          state.isLoading = false;
          state.error = "error";
        }
      })
      .addCase(getFilteredCars.rejected, (state, action) => {
        console.error("Error during sign-in:", action.error.message);
        state.isLoading = false;
        state.error = action.error.message;
      })
  },
});

export default carsSlice.reducer;