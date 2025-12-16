import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const getToken = () => localStorage.getItem("accessToken") || null;
const getUser = () => {
  try {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

const initialState = {
  user: getUser(),
  accessToken: getToken(),
  loginStatus: "idle",
  loginError: null,
  loginMessage: null,

  registerStatus: "idle",
  registerError: null,
  registerMessage: null,

  resetPasswordRequestStatus: "idle",
  resetPasswordRequestMessage: null,
  resetPasswordRequestError: null,

  resetPasswordVerifyStatus: "idle",
  resetPasswordVerifyMessage: null,
  resetPasswordVerifyError: null,

  resetPasswordStatus: "idle",
  resetPasswordMessage: null,
  resetPasswordError: null,

  changeAccountStatus: "idle",
  changeAccountMessage: null,
  changeAccountError: null,

  isVerified: false,
  resetEmail: null,
  resetCode: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(`auth/login`, userData);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({
        message: "Gagal terhubung ke server. Cek koneksi.",
      });
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(`auth/register`, userData);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({
        message: "Gagal terhubung ke server. Cek koneksi.",
      });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(`auth/logout`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Gagal logout");
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  }
);

export const googleLoginSuccess = createAsyncThunk(
  "auth/googleLoginSuccess",
  async (userData, { rejectWithValue }) => {
    try {
      // userData should contain { user, token }
      return userData;
    } catch (error) {
      return rejectWithValue({ message: "Gagal proses login Google" });
    }
  }
);

export const requestResetPassword = createAsyncThunk(
  "auth/requestResetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post(`auth/request-reset`, { email });
      return { message: response.data, email: email };
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({
        message: "Gagal terhubung ke server. Cek koneksi.",
      });
    }
  }
);

export const verifyCodeResetPassword = createAsyncThunk(
  "auth/verifyCodeResetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`auth/verify-reset-code`, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({
        message: "Gagal terhubung ke server. Cek koneksi.",
      });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`auth/reset-password`, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({
        message: "Gagal terhubung ke server. Cek koneksi.",
      });
    }
  }
);

export const changeAccount = createAsyncThunk(
  "auth/changeAccount",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`auth/change-user`, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({
        message: "Gagal terhubung ke server. Cek koneksi.",
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateProfile: (state) => {
      state.accessToken = getToken();
      const decodeToken = jwtDecode(getToken());
      state.user = decodeToken.user;
    },
    resetChangeAccountStatus: (state) => {
      (state.changeAccountStatus = "idle"),
        (state.changeAccountMessage = null),
        (state.changeAccountError = null);
    },
    resetLoginStatus: (state) => {
      state.loginStatus = "idle";
      state.loginMessage = null;
      state.loginError = null;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.loginStatus = "idle";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      //login
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
        state.loginError = null;
        state.loginMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { message, data } = action.payload;

        // ✅ PERBAIKAN: accessToken sekarang langsung di data, bukan nested

        const accessToken = data ? data.accessToken : null;

        if (!accessToken) {
          console.error("❌ Access token tidak ditemukan di response");
          state.loginStatus = "failed";
          state.loginMessage = "Token tidak valid";
          return;
        }

        // ✅ Decode token untuk mendapatkan user data
        try {
          const decodeToken = jwtDecode(accessToken);
          const userData = decodeToken.user;

          state.loginStatus = "success";
          state.loginError = null;
          state.loginMessage = message;
          state.accessToken = accessToken;
          state.user = userData;

          // ✅ Simpan ke localStorage
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("user", JSON.stringify(userData));


        } catch (e) {
          console.error("❌ Gagal decode token saat login:", e);
          state.loginStatus = "failed";
          state.loginMessage = "Gagal memproses data login";
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginMessage = action.payload?.message || "Login gagal";
        state.loginStatus = "failed";
        state.loginError = action.payload;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      })

      //register
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { status, message } = action.payload;
        state.registerStatus = "success";
        state.error = null;
        state.message = message;
        state.accessToken = null;
        state.user = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.message = action.payload?.message || "Pendaftaran gagal.";
        state.registerStatus = "failed";
        state.accessToken = null;
        state.user = null;
      })

      //logout
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.error = null;
        state.message = "Logout berhasil";
        state.status = "idle";
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.error = null;
        state.status = "idle";
      })

      // Google OAuth login
      .addCase(googleLoginSuccess.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(googleLoginSuccess.fulfilled, (state, action) => {
        const { status, message, data } = action.payload;
        const { user, token } = data;
        const userDecode = jwtDecode(token);

        state.status = "success";
        state.error = null;
        state.message = message || "Login dengan Google berhasil";
        state.accessToken = token;
        state.user = userDecode.user;

        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(userDecode.user));
      })
      .addCase(googleLoginSuccess.rejected, (state, action) => {
        state.message = action.payload?.message || "Login dengan Google gagal";
        state.status = "failed";
        state.error = action.payload;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      })

      //request password
      .addCase(requestResetPassword.pending, (state) => {
        state.resetPasswordRequestStatus = "loading";
        state.resetPasswordRequestMessage = null;
        state.resetPasswordRequestError = null;
      })
      .addCase(requestResetPassword.fulfilled, (state, action) => {
        state.resetPasswordRequestStatus = action.payload.message.status;
        state.resetPasswordRequestMessage = action.payload.message.message;
        state.resetPasswordRequestError = null;
        state.resetEmail = action.payload.email;
      })
      .addCase(requestResetPassword.rejected, (state, action) => {
        const errorPayload = action.payload || {};
        state.resetPasswordRequestStatus = "failed";
        state.resetPasswordRequestError =
          errorPayload.message || "Gagal mengirim kode reset.";
        state.resetPasswordRequestMessage =
          errorPayload.message || "Proses gagal.";
        state.resetEmail = null;
      })

      //verify reset password
      .addCase(verifyCodeResetPassword.pending, (state) => {
        state.resetPasswordVerifyStatus = "loading";
        state.resetPasswordVerifyMessage = null;
        state.resetPasswordVerifyError = null;
      })
      .addCase(verifyCodeResetPassword.fulfilled, (state, action) => {
        state.resetPasswordVerifyStatus = "success";
        state.resetPasswordVerifyMessage = action.payload.message;
        state.isVerified = true;
        state.resetCode = action.meta.arg.resetCode;
      })
      .addCase(verifyCodeResetPassword.rejected, (state, action) => {
        state.resetPasswordVerifyStatus = "error";
        state.resetPasswordVerifyMessage = action.payload.message;
        state.resetPasswordVerifyError = action.payload.data;
        state.isVerified = false;
      })

      //reset password
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordStatus = "loading";
        state.resetPasswordMessage = null;
        state.resetPasswordError = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordStatus = action.payload.status;
        state.resetPasswordMessage = action.payload;
        state.isVerified = false;
        state.resetEmail = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordStatus = "failed";
        state.resetPasswordMessage = action.payload;
      })

      //change account
      .addCase(changeAccount.pending, (state) => {
        state.changeAccountStatus = "loading";
        state.changeAccountMessage = null;
        state.changeAccountError = null;
      })
      .addCase(changeAccount.fulfilled, (state, action) => {
        const { status, message, data } = action.payload;

        // ✅ PENTING: Decode token untuk dapat role yang BARU
        const accessToken = data.accessToken;

        if (!accessToken) {
          console.error("❌ Access token tidak ditemukan");
          state.changeAccountStatus = "failed";
          state.changeAccountMessage = "Token tidak valid";
          return;
        }

        // ✅ Decode token baru untuk ambil user data dengan role TERBARU
        let finalUserData;
        try {
          const decoded = jwtDecode(accessToken);
          finalUserData = decoded.user;

        } catch (error) {
          console.error("❌ Gagal decode token:", error);
          state.changeAccountStatus = "failed";
          state.changeAccountMessage = "Gagal decode token";
          return;
        }

        state.changeAccountStatus = status;
        state.changeAccountMessage = message;
        state.accessToken = accessToken;
        state.user = finalUserData; // ✅ Gunakan data dari decode, bukan dari response.data.user

        // ✅ Simpan ke localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(finalUserData));


      })

      .addCase(changeAccount.rejected, (state, action) => {
        state.changeAccountStatus = "failed";
        state.changeAccountMessage =
          action.payload?.message || "Gagal ganti akun";
        state.changeAccountError = action.payload;
      });
  },
});

export const {
  logout,
  setOAuthCredentials,
  resetChangeAccountStatus,
  updateProfile,
  resetLoginStatus,
} = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;

export const selectLoginStatus = (state) => state.auth.loginStatus;
export const selectLoginError = (state) => state.auth.loginError;
export const selectLoginMessage = (state) => state.auth.loginMessage;

export const selectRegisterStatus = (state) => state.auth.registerStatus;
export const selectRegisterError = (state) => state.auth.registerError;
export const selectRegisterMessage = (state) => state.auth.registerMessage;

export const selectIsVerified = (state) => state.auth.isVerified;
export const selectResetEmail = (state) => state.auth.resetEmail;
export const selectResetCode = (state) => state.auth.resetCode;

export const selectResetPasswordRequestStatus = (state) =>
  state.auth.resetPasswordRequestStatus;
export const selectResetPasswordRequestError = (state) =>
  state.auth.resetPasswordRequestError;
export const selectResetPasswordRequestMessage = (state) =>
  state.auth.resetPasswordRequestMessage;

export const selectResetPasswordVerifyStatus = (state) =>
  state.auth.resetPasswordVerifyStatus;
export const selectResetPasswordVerifyError = (state) =>
  state.auth.resetPasswordVerifyError;
export const selectResetPasswordVerifyMessage = (state) =>
  state.auth.resetPasswordVerifyMessage;

export const selectResetPasswordStatus = (state) =>
  state.auth.resetPasswordStatus;
export const selectResetPasswordError = (state) =>
  state.auth.resetPasswordError;
export const selectResetPasswordMessage = (state) =>
  state.auth.resetPasswordMessage;

export const selectChangeAccountStatus = (state) =>
  state.auth.changeAccountStatus;
export const selectChangeAccountError = (state) =>
  state.auth.changeAccountError;
export const selectChangeAccountMessage = (state) =>
  state.auth.changeAccountMessage;

export default authSlice.reducer;
