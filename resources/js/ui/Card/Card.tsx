import React, { ReactNode } from "react";
import { cn } from "@/utils";

interface Props extends React.HTMLProps<HTMLDivElement> {
    children: ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, Props>(
    ({ className = "", children, ...props }: Props, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "w-full rounded-2xl bg-white shadow p-6 border border-gray-200",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

export default Card;
