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
      let data = await axios.post("http://localhost:8000/car/get-available-cars-by-modelid", values,{
        headers: {
          Authorization: `Bearer ${values.token}`,
        },
      })
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
  async (token, { rejectWithValue }) => {
    try {
      let data = await axios("http://localhost:8000/car/get-models",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return data.data
    }
    catch (error) {
      console.log(error, 'errro')
      rejectWithValue(error.response.data)
    }
  })

export const bookCar = createAsyncThunk(
  "cars/bookcar",
  async ({carid, modelid,starttime,endtime, userId, token }, { rejectWithValue }) => {
    try {
      let data = await axios.post("http://localhost:8000/car/book-car",{carid, modelid,starttime,endtime, userId},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return data.data
    }
    catch (error) {
      console.log(error, 'errro')
      rejectWithValue(error.response.data)
    }
  })

export const addCard = createAsyncThunk(
  "cars/addcar",
  async ({formData, token}, { rejectWithValue }) => {
    try {
      let data = await axios.post("http://localhost:8000/admin/add-car",formData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return data.data
    }
    catch (error) {
      console.log(error, 'errro')
      rejectWithValue(error.response.data)
    }
  })


export const getMyCars= createAsyncThunk("car/mycars", async function(token,{rejectWithValue}){
    try{
      const response = await axios.get("http://localhost:8000/admin/my-cars", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        return response.data
    }
    catch(error){
      return {}
    }
  })

export const deleteOneCar = createAsyncThunk("car/deletecar", async function({token,id},{rejectWithValue}){
  try{
    
    const response = await axios.post("http://localhost:8000/admin/delete-car",{id}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      return response.data
  }
  catch(error){
    rejectWithValue(error.response.data)
  }
})

export const updateOneCar = createAsyncThunk("car/updatecar", async function({token,id, charge},{rejectWithValue}){
  try{
    
    const response = await axios.post("http://localhost:8000/admin/update-car",{id,charge:+charge}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      return response.data
  }
  catch(error){
    rejectWithValue(error.response.data)
  }
})

export const getMyBookings= createAsyncThunk("car/mybookings", async function(token,{rejectWithValue}){
  try{
    const response = await axios.get("http://localhost:8000/user/booked-cars", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      return response.data
  }
  catch(error){
    return {}
  }
})

export const cancelBooking = createAsyncThunk("car/cancelbooking", async function({token,id},{rejectWithValue}){
  try{
    
    const response = await axios.post("http://localhost:8000/user/cancel-booking",{id}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      return response.data
  }
  catch(error){
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
    filteredCars: [],
    myAllCars: [],
    myBookings:[]
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
        console.error("Error during getting all car models:", action.error.message);
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
        }
        else {
          state.AllCarsModels = [];
          state.error = "error";
        }
        state.isLoading = false;
      })
      .addCase(getFilteredCars.rejected, (state, action) => {
        console.error("Error during getting filtered cars:", action.error.message);
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.isLoading = false;

      })
      .addCase(addCard.rejected, (state, action) => {
        console.error("Error during adding car:", action.error.message);
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getMyCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyCars.fulfilled, (state, action) => {
        if(action.payload.data && action.payload.data.length>0){
          state.myAllCars = action.payload.data
        }
        else{
          state.myAllCars = []
        }
        state.error=""
        state.isLoading = false;

      })
      .addCase(getMyCars.rejected, (state, action) => {
        console.error("Error during gettimg my cars:", action.error.message);
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOneCar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOneCar.fulfilled, (state, action) => {
        state.error=""
        state.isLoading = false;

      })
      .addCase(deleteOneCar.rejected, (state, action) => {
        console.error("Error during dleting car:", action.error.message);
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateOneCar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOneCar.fulfilled, (state, action) => {
        state.error=""
        state.isLoading = false;

      })
      .addCase(updateOneCar.rejected, (state, action) => {
        console.error("Error during updating car:", action.error.message);
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(bookCar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(bookCar.fulfilled, (state, action) => {
        state.error=""
        state.isLoading = false;

      })
      .addCase(bookCar.rejected, (state, action) => {
        console.error("Error during booking car:", action.error.message);
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getMyBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyBookings.fulfilled, (state, action) => {
        if(action.payload?.data && action.payload?.data?.length>0){
          state.myBookings= action.payload.data
        }
        state.error=""
        state.isLoading = false;

      })
      .addCase(getMyBookings.rejected, (state, action) => {
        console.error("Error getting booking car:", action.error.message);
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(cancelBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
          state.error=""
          state.isLoading = false;

      })
      .addCase(cancelBooking.rejected, (state, action) => {
        console.error("Error getting booking car:", action.error.message);
        state.isLoading = false;
        state.error = action.error.message;
      })
  },
});

export default carsSlice.reducer;