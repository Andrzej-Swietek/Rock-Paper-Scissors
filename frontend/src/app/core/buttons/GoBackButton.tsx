"use client"

import {FC} from "react";
import { useRouter } from 'next/navigation'
interface GoBackButtonProps extends ButtonProps{}

export const GoBackButton: FC<GoBackButtonProps> = ({
        className,
        onClick,
        variant,
        href
}) => {

    const router = useRouter();

    const handleGoBack = (): void => {
        if ( onClick ) {
            onClick();
            return;
        } else if (href)
            router.push(href);
        router.back();
    };

    return (
        <>
            <button
                className={`rounded-full p-4 transition-all duration-500 group ${variant === "filled" ? "bg-primary hover:bg-white" : "bg-white bg-primary"} ${
                    variant === "outlined" ? "border border-primary" : ""
                } ${className}`}
                onClick={handleGoBack}
            >
                {variant === "outlined" ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6 text-primary group-hover:text-white transition-all duration-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6 text-white group-hover:text-primary active:text-primary transition-all duration-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                )}
            </button>
        </>
    )
}