import { Dayjs } from "dayjs";

export interface Package {
  id?: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  content: string;
}

export interface Phone {
  countryCode: string;
  number: string;
}

export interface OrderFormData {
  pickupAddress?: string;
  scheduledDate?: Dayjs;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: Phone;
  recipientAddress?: string;
  department?: string;
  municipality?: string;
  referencePoint?: string;
  instructions?: string;
  packages?: Package[];
}

export interface DimensionsValues {
  length: number;
  height: number;
  width: number;
}
