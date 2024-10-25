"use client";

import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "px-7 py-8 flex items-center justify-center rounded-xl animate-bounce",
  {
    variants: {
      variant: {
        default: "h-[10vw] text-bold-20 bg-primary",
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
  const handleButtonClick = () => {
    return (location.href = href);
  };
  return (
    <button
      onClick={() => handleButtonClick()}
      className={`${buttonVariants({ variant })}`}
    >
      {children}
    </button>
  );
};

export default Button;
