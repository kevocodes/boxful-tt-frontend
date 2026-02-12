import { RegisterDto, RegisterFormValues } from "@/types/auth";

export const registerMapper = (data: RegisterFormValues): RegisterDto => {
    return {
        name: data.firstName,
        lastname: data.lastName,
        email: data.email,
        password: data.password,
        gender: data.gender,
        birthDate: data.birthDate.toISOString(),
        phoneNumber: data.whatsapp?.number,
        phoneExtension: data.whatsapp?.countryCode,
    };
};