export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  EMAIL_VALIDATION: "/email-validation",
  API: {
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
      FORGOT_PASSWORD: "/auth/forgot-password",
      VERIFY_FORGOT_PASSWORD_TOKEN: "/auth/verify-forgot-password-token",
      RESET_PASSWORD: "/auth/reset-password",
      NEXT_AUTH_PREFIX: "/api/auth",
    },
  },
};

export const PUBLIC_ROUTES: string[] = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
];
