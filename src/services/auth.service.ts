import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { LoginFormValues, ValidAuthDto, RegisterDto, ResetPasswordDto } from "@/types/auth";

export class AuthService {
  static async login(
    credentials: LoginFormValues,
  ): Promise<ApiResponse<ValidAuthDto>> {
    const { data } = await api.post<ApiResponse<ValidAuthDto>>(
      "/auth/login",
      credentials,
    );
    return data;
  }

  static async register(data: RegisterDto): Promise<ApiResponse<ValidAuthDto>> {
    const response = await api.post<ApiResponse<ValidAuthDto>>(
      "/auth/register",
      data,
    );
    return response.data;
  }

  static async sendForgotPassword(email: string): Promise<ApiResponse<void>> {
    const response = await api.post<ApiResponse<void>>(
      "/auth/forgot-password",
      { email },
    );
    return response.data;
  }

  static async validateResetPasswordToken(token: string): Promise<ApiResponse<void>> {
    const response = await api.get<ApiResponse<void>>(
      `/auth/verify-forgot-password-token/${token}`,
    );
    return response.data;
  }

  static async resetPassword(data: ResetPasswordDto): Promise<ApiResponse<void>> {
    const response = await api.patch<ApiResponse<void>>(
      `/auth/reset-password/${data.token}`,
      { password: data.password },
    );
    return response.data;
  }
}
