import { Dayjs } from "dayjs";

export interface LoginFormValues {
  email: string;
  password?: string;
}

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Dayjs;
  email: string;
  whatsapp: {
    countryCode: string;
    number: string;
  };
  password: string;
  confirmPassword: string;
}

export interface RegisterDto {
  name: string;
  lastname: string;
  password: string;
  email: string;
  gender: string;
  birthDate: string;
  phoneNumber: string;
  phoneExtension: string;
}

export interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}

export interface ValidAuthDto {
  access_token: string;
  user: {
    id: string;
    name: string;
    lastname: string;
    email: string;
    role: string;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
}