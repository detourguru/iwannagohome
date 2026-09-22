"use client";

import useHandleResultEvent from "@/hooks/useHandleResultEvent";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "w-full flex items-center justify-center rounded-xl",
  {
    variants: {
      variant: {
        default:
          "h-[4vw] px-7 py-8 text-bold-20 font-heading bg-primary animate-bounce",
        home: "h-fit py-3 text-bold-20 font-heading bg-primary",
        replay: "h-fit py-3 text-bold-20 font-heading text-white bg-secondary",
        share: "h-fit py-3 text-bold-20 font-heading text-white bg-gray-500",
        analyze:
          "h-fit mb-4 p-2 text-regular-12 text-white bg-secondary animate-pulse",
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
  body?: any;
}

const Button = ({ children, variant, href, body }: ButtonProps) => {
  const { handleButtonClick, copied } = useHandleResultEvent({
    variant: variant,
    href: href,
    body: body,
  });

  return (
    <div className="relative w-full">
      {copied && (
        <span
          role="status"
          aria-live="polite"
          className="absolute -top-9 left-1/2 -translate-x-1/2 text-regular-12 text-white bg-secondary px-3 py-1.5 rounded-full whitespace-nowrap"
        >
          복사 되었어요 🔗
        </span>
      )}
      <button
        onClick={() => handleButtonClick()}
        className={`${buttonVariants({ variant })}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
