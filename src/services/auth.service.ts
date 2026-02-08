import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import {
  LoginFormValues,
  ValidAuthDto,
  RegisterDto,
  ResetPasswordDto,
} from "@/types/auth";
import { ROUTES } from "@/constants/routes";

export class AuthService {
  static async login(
    credentials: LoginFormValues,
  ): Promise<ApiResponse<ValidAuthDto>> {
    const { data } = await api.post<ApiResponse<ValidAuthDto>>(
      ROUTES.API.AUTH.LOGIN,
      credentials,
    );
    return data;
  }

  static async register(data: RegisterDto): Promise<ApiResponse<ValidAuthDto>> {
    const response = await api.post<ApiResponse<ValidAuthDto>>(
      ROUTES.API.AUTH.REGISTER,
      data,
    );
    return response.data;
  }

  static async sendForgotPassword(email: string): Promise<ApiResponse<void>> {
    const response = await api.post<ApiResponse<void>>(
      ROUTES.API.AUTH.FORGOT_PASSWORD,
      { email },
    );
    return response.data;
  }

  static async validateResetPasswordToken(
    token: string,
  ): Promise<ApiResponse<void>> {
    const response = await api.get<ApiResponse<void>>(
      `${ROUTES.API.AUTH.VERIFY_FORGOT_PASSWORD_TOKEN}/${token}`,
    );
    return response.data;
  }

  static async resetPassword(
    data: ResetPasswordDto,
  ): Promise<ApiResponse<void>> {
    const response = await api.patch<ApiResponse<void>>(
      `${ROUTES.API.AUTH.RESET_PASSWORD}/${data.token}`,
      { password: data.password },
    );
    return response.data;
  }
}
