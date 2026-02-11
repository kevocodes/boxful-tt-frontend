import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import {
  LoginFormValues,
  ValidAuthDto,
  RegisterDto,
  ResetPasswordDto,
} from "@/types/auth";

const baseRoute = "/auth";


export async function login(
    credentials: LoginFormValues,
  ): Promise<ApiResponse<ValidAuthDto>> {
    const response = await api.post<ApiResponse<ValidAuthDto>>(
      `${baseRoute}/login`,
      credentials,
    );
    return response.data;
  }

 export async function register(data: RegisterDto): Promise<ApiResponse<ValidAuthDto>> {
    const response = await api.post<ApiResponse<ValidAuthDto>>(
      `${baseRoute}/register`,
      data,
    );

    return response.data;
  }

  export async function sendForgotPassword(email: string): Promise<ApiResponse<void>> {
    const response = await api.post<ApiResponse<void>>(
      `${baseRoute}/forgot-password`,
      { email },
    );
    return response.data;
  }

  export async function validateResetPasswordToken(
    token: string,
  ): Promise<ApiResponse<void>> {
    const response = await api.get<ApiResponse<void>>(
      `${baseRoute}/verify-forgot-password-token/${token}`,
    );
    return response.data;
  }

  export async function resetPassword(
    data: ResetPasswordDto,
  ): Promise<ApiResponse<void>> {
    const response = await api.patch<ApiResponse<void>>(
      `${baseRoute}/reset-password/${data.token}`,
      { password: data.password },
    );
    return response.data;
  }

  export async function sendVerificationEmail(
    token: string,
  ): Promise<ApiResponse<string>> {
    const response = await api.post<ApiResponse<string>>(
      `${baseRoute}/send-verification-email`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  export async function validateVerificationEmail(
    otp: string,
    token: string,
  ): Promise<ApiResponse<void>> {
    const response = await api.post<ApiResponse<void>>(
      `${baseRoute}/verify-email`,
      { otp },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }
