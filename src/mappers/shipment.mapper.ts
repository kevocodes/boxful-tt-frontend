import { CreateShipmentDto, OrderFormData } from "@/types/shipment";

export const createShipmentMapper = (
  data: OrderFormData,
): CreateShipmentDto => {
  return {
    pickupAddress: data.pickupAddress || "",
    scheduledDate: data.scheduledDate?.toISOString() || "",
    customerName: data.firstName || "",
    customerLastname: data.lastName || "",
    customerEmail: data.email || "",
    customerPhoneNumber: data.phone?.number || "",
    customerPhoneExtension: data.phone?.countryCode || "",
    customerAddress: data.recipientAddress || "",
    customerState: data.department || "",
    customerCity: data.municipality || "",
    customerReferencePoint: data.referencePoint || "",
    instructions: data.instructions || "",
    isCod: data.isCod || false,
    codExpectedAmount: data.codExpectedAmount || undefined,    
    packages:
      data.packages?.map((pkg) => ({
        content: pkg.content,
        height: pkg.height,
        width: pkg.width,
        length: pkg.length,
        weight: pkg.weight,
      })) || [],
  };
};
