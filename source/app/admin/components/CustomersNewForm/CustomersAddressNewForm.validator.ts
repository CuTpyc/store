import { withZod } from "@rvf/zod";
import { z } from "zod";
import { $Enums } from "@prisma/client";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const country = z
  .string()
  .trim()
  .min(1, { message: "Country is required" });

export const city = z
  .string()
  .trim()
  .min(1, { message: "Country is required" });

export const postalCode = z
  .string()
  .trim()
  .min(4, { message: "Country is required" });

export const phoneForAddress = z
  .string().regex(phoneRegex, 'Invalid Number!')
  .trim()

export const customersAddressesNewFormValidator = withZod(
  z
    .object({

      country: country,
      city: city,
      postalCode: postalCode,
      phoneForAddress: phoneForAddress,
    })

);
