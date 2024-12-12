import { SoftwareStack } from "@/core/enums/SoftwareStack.enum";
import z from "zod";

export const contributionSchema = z
  .object({
    name: z.string().optional(),
    infraProvider: z
      .string()
      .min(1, {
        message: "You have to choose at least one provider",
      })
      .max(64, {
        message: "Infrastructure provider name cannot exceed 64 characters",
      }),
    softwareStack: z.string().min(1, { message: "Software stack is required" }),
    region: z.string().min(1, { message: "Region is required" }),
    version: z
      .string()
      .min(1, {
        message: "Version is required",
      })
      .max(24, { message: "Version cannot exceed 24 characters" }),
    credentials: z.object({
      Private_Key: z.string(),
      Host: z.string(),
      Port: z.string(),
      Username: z.string(),
      Connection_String: z.string(),
    }),
    cpu: z.coerce.number().min(1).max(32767, {
      message: "CPU value must be less than or equal to 32,767",
    }),
    ram: z.coerce.number().min(1).max(32767, {
      message: "RAM value must be less than or equal to 32,767",
    }),
    diskSizeGb: z.coerce.number().min(1).max(32767, {
      message: "Disk size must be less than or equal to 32,767 GB",
    }),
  })
  .superRefine((data, ctx) => {
    const { softwareStack, credentials } = data;

    if ([SoftwareStack.Debian, SoftwareStack.Ubuntu].includes(softwareStack as SoftwareStack)) {
      ["Private_Key", "Host", "Port", "Username"].forEach((field) => {
        if (!credentials[field as keyof typeof credentials]) {
          ctx.addIssue({
            code: "custom",
            path: ["credentials", field],
            message: `${field} is required for VM-based stacks.`,
          });
        }
      });
    } else if (!credentials.Connection_String) {
      ctx.addIssue({
        code: "custom",
        path: ["credentials", "Connection_String"],
        message: "Connection String is required for Databases.",
      });
    }
  });

export type contributionFormInputs = z.infer<typeof contributionSchema>;
