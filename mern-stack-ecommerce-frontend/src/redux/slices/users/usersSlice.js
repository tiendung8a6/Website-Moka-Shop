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

// update user profile action 
export const updateUserAction = createAsyncThunk(
  "users/update",
  async ({ fullname, email, image }, { rejectWithValue, getState }) => {
    try {
      // Lấy token từ state để gửi trong header của request
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      // Gửi yêu cầu HTTP đến endpoint "/api/v1/users/updateuser"
      const response = await axios.put(
        `${baseURL}/users/update`,
        { fullname, email, image },
        config
      );

      // Return the updated user object as part of the action payload
      return response.data.user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// upload img action 
export const uploadImageAction = createAsyncThunk(
  "users/uploadImage",
  async (formData, { rejectWithValue }) => {
    try {
      // Make the HTTP request to the "upload image" endpoint
      const response = await axios.post(`${baseURL}/image`, formData);
      return response.data.imageUrl; // Return the uploaded image URL from the API response
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);


//fetch users action
export const fetchUsersAction = createAsyncThunk(
  "users/list",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${baseURL}/users`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);


// toggle lock customers action
export const toggleLockCustomersAction = createAsyncThunk(
  "users/toggleLock",
  async (customerId, { rejectWithValue, getState, dispatch }) => {
    try {
      // Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // Make the API call to toggle the lock status of the customer with the given ID
      const { data } = await axios.put(
        `${baseURL}/users/togglelock/${customerId}`,
        {},
        config
      );
      // Return the data from the API response if needed
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//users slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
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
    //handle actions
    builder.addCase(toggleLockCustomersAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(toggleLockCustomersAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(toggleLockCustomersAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
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
    //fetch all
    builder.addCase(fetchUsersAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsersAction.rejected, (state, action) => {
      state.loading = false;
      state.users = null;
      state.error = action.payload;
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
    
     // Update User
     builder.addCase(updateUserAction.pending, (state, action) => {
      state.loading = true; // Indicate that the user update process is ongoing
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.loading = false; // Reset loading state
      // Update the user info in the state with the data from the API response
      state.userAuth.userInfo = action.payload;
      // Optionally, you can display a success message to the user in your UI
      console.log("User has been updated successfully");
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.loading = false; // Reset loading state
      state.error = action.payload; // Store the error message returned from the API
      // Optionally, you can display an error message to the user in your UI
      console.error("Failed to update user", state.error);
    });

    // Upload Image
    builder.addCase(uploadImageAction.pending, (state, action) => {
      state.loading = true; // Indicate that the image upload process is ongoing
    });
    builder.addCase(uploadImageAction.fulfilled, (state, action) => {
      state.loading = false; // Reset loading state
      // Optionally, you can display a success message to the user in your UI
      console.log("Image has been uploaded successfully");
    });
    builder.addCase(uploadImageAction.rejected, (state, action) => {
      state.loading = false; // Reset loading state
      state.error = action.payload; // Store the error message returned from the API
      // Optionally, you can display an error message to the user in your UI
      console.error("Failed to upload image", state.error);
    });

  },
});

//generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
