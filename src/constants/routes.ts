export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  EMAIL_VALIDATION: "/email-validation",
  SHIPMENTS: "/shipments",
  API: {
    AUTH: {
      NEXT_AUTH_PREFIX: "/api/auth",
    }
  },
};

export const PUBLIC_ROUTES: string[] = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
];
