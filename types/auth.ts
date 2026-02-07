import { Dayjs } from "dayjs";

export interface LoginFormValues {
  email: string;
  password?: string;
}

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  sex: string;
  birthDate: Dayjs;
  email: string;
  whatsapp: {
    countryCode: string;
    number: string;
  };
  password: string;
  confirmPassword: string;
}
