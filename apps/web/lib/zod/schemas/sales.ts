import z from "@/lib/zod";
import { clickEventSchemaTB } from "./clicks";

export const trackSaleRequestSchema = z.object({
  // Required
  customerId: z
    .string({ required_error: "customerId is required" })
    .trim()
    .min(1, "customerId is required")
    .max(100)
    .describe(
      "This is the unique identifier for the customer in the client's app. This is used to track the customer's journey.",
    ),
  amount: z
    .number({ required_error: "amount is required" })
    .int()
    .positive()
    .describe("The amount of the sale. Should be passed in cents."),
  paymentProcessor: z
    .enum(["stripe", "shopify", "paddle"])
    .describe("The payment processor via which the sale was made."),

  // Optional
  eventName: z
    .string()
    .max(50)
    .optional()
    .default("Purchase")
    .describe(
      "The name of the sale event. It can be used to track different types of event for example 'Purchase', 'Upgrade', 'Payment', etc.",
    )
    .openapi({ example: "Purchase" }),
  invoiceId: z
    .string()
    .nullish()
    .default(null)
    .describe("The invoice ID of the sale."),
  currency: z
    .string()
    .default("usd")
    .describe("The currency of the sale. Accepts ISO 4217 currency codes."),
  metadata: z
    .record(z.unknown())
    .nullish()
    .default(null)
    .describe("Additional metadata to be stored with the sale event."),
});

export const saleEventSchemaTB = clickEventSchemaTB
  .omit({ timestamp: true })
  .and(
    z.object({
      timestamp: z.string().optional(), //autogenerated by Tinybird
      event_id: z.string(),
      event_name: z.string().default("Purchase"),
      customer_id: z.string(),
      payment_processor: z.string(),
      amount: z.number(),
      invoice_id: z.string().default(""),
      currency: z.string().default("usd"),
      metadata: z.string().default(""),
    }),
  );

export const saleEventEnrichedSchema = z
  .object({
    event: z.literal("sale").default("sale"),
    timestamp: z.string(),
    event_id: z.string(),
    event_name: z.string(),
    customer_name: z.string(),
    customer_email: z.string(),
    customer_avatar: z.string(),
    payment_processor: z.string(),
    invoice_id: z.string(),
    saleAmount: z.number(),
    click_id: z.string(),
    link_id: z.string(),
    domain: z.string(),
    key: z.string(),
    url: z.string(),
    continent: z.string().nullable(),
    country: z.string().nullable(),
    city: z.string().nullable(),
    device: z.string().nullable(),
    browser: z.string().nullable(),
    os: z.string().nullable(),
    referer: z.string().nullable(),
    qr: z.number().nullable(),
    ip: z.string().nullable(),
  })
  .openapi({ ref: "SaleEvent" });
