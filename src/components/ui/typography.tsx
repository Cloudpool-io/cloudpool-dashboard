import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      small: "text-sm font-medium leading-none",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
});

type AllowedElements =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "code"
  | "small";

interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>,
  VariantProps<typeof typographyVariants> {
  as?: AllowedElements;
}

const Typography = React.forwardRef<
  HTMLHeadingElement | HTMLParagraphElement,
  TypographyProps
>(({ as: Component = "h1", className, variant, ...props }, ref) => {
  return (
    <Component
      ref={ref}
      className={cn(typographyVariants({ className, variant }))}
      {...props}
    />
  );
});
Typography.displayName = "Typography";

export { Typography };
