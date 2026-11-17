import { THEME_MODE } from "@/constants/themes.constant";
import { selectColor } from "@/schemas/base.schema";
import { z } from "zod";

export const appearanceSettingsSchema = z.object({
  section: z.literal("APPEARANCE").default("APPEARANCE"),
  mode: z.enum(THEME_MODE, {
    message: "Please choose a valid theme mode",
  }),
  walletCardDesignId: z.number().min(1, "Please select a wallet card design"),
  colorPaletteId: z.string().trim().min(1, "Please select a color palette"),
  compactScheduleView: z.boolean().default(false),
  highContrastMode: z.boolean().default(false),
});

export type AppearanceSettingsFormValues = z.infer<
  typeof appearanceSettingsSchema
>;
