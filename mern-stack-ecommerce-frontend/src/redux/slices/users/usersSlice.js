import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";
//initialState
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: null,
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

//register action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (
    { email, password, fullname },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      //make the http request
      const { data } = await axios.post(`${baseURL}/users/register`, {
        email,
        password,
        fullname,
      });
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update user shipping address action
export const updateUserShippingAddressAction = createAsyncThunk(
  "users/update-shipping-address",
  async (
    {
      firstName,
      lastName,
      address,
      city,
      postalCode,
      province,
      phone,
      country,
    },
    { rejectWithValue, getState, dispatch }
  ) => {
    console.log(
      firstName,
      lastName,
      address,
      city,
      postalCode,
      province,
      phone,
      country
    );
    try {
      //get token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${baseURL}/users/update/shipping`,
        {
          firstName,
          lastName,
          address,
          city,
          postalCode,
          province,
          phone,
          country,
        },
        config
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//user profile action
export const getUserProfileAction = createAsyncThunk(
  "users/profile-fetched",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //get token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/users/profile`, config);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//login action
export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      //make the http request
      const { data } = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
      });
      //save the user into localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//logout action
export const logoutAction = createAsyncThunk(
  "users/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //get token
    localStorage.removeItem("userInfo");
    return true;
  }
);


// forgot password action 

export const forgotPasswordAction = createAsyncThunk(
  "users/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      // Make the HTTP request to the "forgot password" endpoint
      await axios.post(`${baseURL}/users/forgotpassword`, { email });
      return "success"; // Indicate success without any additional data
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// change pass action

export const changePasswordAction = createAsyncThunk(
  "users/changePassword",
  async ({ currentPassword, newPassword }, { rejectWithValue, getState }) => {
    try {
      // Lấy token từ state để gửi trong header của request
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Gửi yêu cầu HTTP đến endpoint "/api/v1/users/changepassword"
      await axios.post(
        `${baseURL}/users/changepassword`,
        { currentPassword, newPassword },
        config
      );

      return "success"; // Trả về "success" để chỉ ra thành công mà không có dữ liệu bổ sung
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);



//users slice

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    //handle actions
    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userAuth.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.userAuth.loading = false;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });
    //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //logout
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = null;
    });
    //profile
    builder.addCase(getUserProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //shipping address
    builder.addCase(
      updateUserShippingAddressAction.pending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(
      updateUserShippingAddressAction.fulfilled,
      (state, action) => {
        state.user = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      updateUserShippingAddressAction.rejected,
      (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }
    );
    //reset error action
    builder.addCase(resetErrAction.pending, (state) => {
      state.error = null;
    });

    // Forgot Password
    builder.addCase(forgotPasswordAction.pending, (state, action) => {
      state.loading = true; // Indicate that the password reset process is ongoing
    });
    builder.addCase(forgotPasswordAction.fulfilled, (state, action) => {
      state.loading = false; // Reset loading state
      // Optionally, you can display a success message to the user in your UI
    });
    builder.addCase(forgotPasswordAction.rejected, (state, action) => {
      state.loading = false; // Reset loading state
      state.error = action.payload; // Store the error message returned from the API
      // Optionally, you can display an error message to the user in your UI
    });

    // Change Password
    builder.addCase(changePasswordAction.pending, (state, action) => {
      state.loading = true; // Indicate that the password change process is ongoing
    });
    builder.addCase(changePasswordAction.fulfilled, (state, action) => {
      state.loading = false; // Reset loading state
      // Optionally, you can display a success message to the user in your UI
      console.log("Password has been changed successfully");
    });
    builder.addCase(changePasswordAction.rejected, (state, action) => {
      state.loading = false; // Reset loading state
      state.error = action.payload; // Store the error message returned from the API
      // Optionally, you can display an error message to the user in your UI
      console.error("Failed to change password", state.error);
    });
  },
});

//generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
