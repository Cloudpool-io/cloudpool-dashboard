import z from "zod";

export const contributionSchema = z.object({
  name: z.string().optional(),
  infraProvider: z.string().max(64, {
    message: "Infrastructure provider name cannot exceed 64 characters",
  }),
  softwareStack: z.string().min(1, { message: "Software stack is required" }),
  region: z.string().min(1, { message: "Region is required" }),
  version: z
    .string()
    .max(24, { message: "Version cannot exceed 24 characters" }),
  credentials: z.object({
    Private_Key: z.string(),
    Host: z.string(),
    Port: z.string(),
    Username: z.string(),
    Password: z.string(),
    Database_Name: z.string(),
  }),
  cpu: z.coerce.number().max(32767, {
    message: "CPU value must be less than or equal to 32,767",
  }),
  ram: z.coerce.number().max(32767, {
    message: "RAM value must be less than or equal to 32,767",
  }),
  diskSizeGb: z.coerce.number().max(32767, {
    message: "Disk size must be less than or equal to 32,767 GB",
  }),
});

export type contributionFormInputs = z.infer<typeof contributionSchema>;
