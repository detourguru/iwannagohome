"use client";

import useHandleEvent from "@/hooks/useHandleEvent";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "w-full flex items-center justify-center rounded-xl",
  {
    variants: {
      variant: {
        default: "h-[4vw] px-7 py-8 text-bold-20 bg-primary animate-bounce",
        replay: "h-fit py-3 text-bold-20 text-white bg-secondary",
        share: "h-fit py-3 text-bold-20 text-white bg-gray-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href: string;
}

const Button = ({ children, variant, href }: ButtonProps) => {
  const { handleButtonClick } = useHandleEvent();
  return (
    <button
      onClick={() => handleButtonClick({ variant, href })}
      className={`${buttonVariants({ variant })}`}
    >
      {children}
    </button>
  );
};

export default Button;
