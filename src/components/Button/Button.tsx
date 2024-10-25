"use client";

import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "w-full px-7 py-8 flex items-center justify-center rounded-xl",
  {
    variants: {
      variant: {
        default: "h-[4vw] text-bold-20 bg-primary animate-bounce",
        replay: "h-[2vw] text-bold-20 bg-gray-100",
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
