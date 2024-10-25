"use client";

import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "px-7 py-8 flex items-center justify-center rounded-xl animate-bounce",
  {
    variants: {
      variant: {
        default: "h-[70px] text-bold-20 bg-primary",
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
  onClick?: () => void;
}

const Button = ({ children, onClick, variant }: ButtonProps) => {
  return (
    <button
      onClick={() => onClick}
      className={`${buttonVariants({ variant })}`}
    >
      {children}
    </button>
  );
};

export default Button;
