import { Dayjs } from "dayjs";

export interface PackageFormData {
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
  packages?: PackageFormData[];
}

export interface DimensionsValues {
  length: number;
  height: number;
  width: number;
}

export interface CreatePackageDto {
  content: string;
  height: number;
  width: number;
  length: number;
  weight: number;
}

export interface CreateShipmentDto {
  pickupAddress: string;
  scheduledDate: string;
  customerName: string;
  customerLastname: string;
  customerEmail: string;
  customerPhoneNumber: string;
  customerPhoneExtension: string;
  customerAddress: string;
  customerState: string;
  customerCity: string;
  customerReferencePoint: string;
  instructions: string;
  packages: CreatePackageDto[];
}

export interface Shipment {
  id: string;
  pickupAddress: string;
  scheduledDate: string;
  customerName: string;
  customerLastname: string;
  customerEmail: string;
  customerPhoneNumber: string;
  customerPhoneExtension: string;
  customerAddress: string;
  customerState: string;
  customerCity: string;
  customerReferencePoint: string;
  instructions: string;
  createdAt: string;
  updatedAt: string;
  packages: Package[];
}

export interface Package {
  id: string;
  content: string;
  height: number;
  width: number;
  length: number;
  weight: number;
  shipmentId: string;
  createdAt: string;
  updatedAt: string;
}