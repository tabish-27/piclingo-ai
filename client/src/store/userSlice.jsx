import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import SummaryApi from "../helpers/SummaryApi";

// Define an async thunk for fetching user details
export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("userData"))
      const userId = user._id
      const token = localStorage.getItem("authToken");

      if (!token || !userId) {
        console.warn("No token or userId found in localStorage");
        return rejectWithValue("No token or userId found");
      }

      console.log("Fetching user details for userId:", userId);

      const dataResponse = await fetch(
        `${SummaryApi.userDetails.url}?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token for secure API calls
          },
        }
      );

      const dataApi = await dataResponse.json();
      console.log("API Response:", dataApi);

      if (!dataApi.success) {
        toast.error("Failed to fetch user details");
        return rejectWithValue(dataApi.message);
      }

      return dataApi.data; // Return fetched data to store in Redux state
    } catch (err) {
      console.error("Error occurred in fetchUserDetails", err);
      toast.error("Error fetching user details");
      return rejectWithValue(err.message);
    }
  }
);

// Create user slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
