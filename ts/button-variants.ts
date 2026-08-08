// @polara-health/brand — shared button variants (cva).
// Slot-driven: colors come from the app's theme layer (--color-accent etc.),
// so this one definition is on-brand in every product.
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "rounded-lg font-medium transition-all disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-(--color-ring) focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-(--color-accent) text-white hover:bg-(--color-accent-hover) " +
          "disabled:bg-polara-gray-100 disabled:text-polara-gray-400",
        outline:
          "border border-polara-gray-200 text-polara-gray-700 hover:bg-polara-gray-50 " +
          "disabled:bg-polara-gray-50 disabled:border-polara-gray-100 disabled:text-polara-gray-400",
        ghost:
          "text-polara-blue underline underline-offset-2 hover:text-polara-deepblue " +
          "disabled:text-polara-gray-400 disabled:no-underline",
        destructive:
          "bg-polara-danger text-white hover:bg-polara-danger-text " +
          "focus-visible:ring-polara-danger disabled:bg-polara-gray-100 disabled:text-polara-gray-400",
      },
      size: {
        default: "px-4 py-2",
        sm: "px-3 py-1.5 text-sm",
        icon: "p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

export type ButtonVariant = "primary" | "outline" | "ghost" | "destructive";
export type ButtonSize = "default" | "sm" | "icon";
