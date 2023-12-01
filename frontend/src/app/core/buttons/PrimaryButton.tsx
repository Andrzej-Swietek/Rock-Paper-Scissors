'use client'
import {FC, ReactNode} from "react";
import { twMerge } from 'tailwind-merge'
import Link from "next/link";

interface PrimaryButtonProps extends ButtonProps {
    text: ReactNode;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({ href, onClick, variant='filled', className, text }) => {
    const variantStyle = buttonStyleFactory(variant as ButtonVariant);
    return (
        <>
            {
                href ?
                    <Link href={href}>
                        <button className={ twMerge(variantStyle, className) } onClick={() => onClick?.()}>
                            { text }
                        </button>
                    </Link> :
                    <button className={ twMerge(variantStyle, className) } onClick={() => onClick?.()}>
                        { text }
                    </button>
            }

        </>
  )
}

const buttonStyleFactory = (variant: 'filled' | 'outlined' | 'text' | 'disabled') => {
    const commonStyle = 'flex-center text-center text-xs lg:text-base xl:text-lg font-bold py-2 px-2 lg:py-2 lg:px-3 xl:px-4 rounded-[30px] cursor-pointer duration-300 easy-in-out';

    //variant style
    const filledStyle = `bg-primary focus:bg-primaryContainer focus:text-primary text-white hover:shadow-base`;
    const outlinedStyle = `text-primary border-primary hover:bg-primaryContainer focus:bg-primaryContainer bg-white border`;
    const textStyle = `text-primary hover:bg-primaryContainer focus:bg-primaryContainer active:bg-primaryContainer`;
    const disabledStyle = `!bg-[#eee] !text-neutral !cursor-default !border-none`;

    switch (variant){
        case "filled":
            return twMerge(commonStyle, filledStyle);
        case "outlined":
            return twMerge(commonStyle, outlinedStyle);
        case "text":
            return twMerge(commonStyle, textStyle);
        case "disabled":
            return twMerge(commonStyle, disabledStyle);
        default:
            return twMerge(commonStyle, filledStyle);
    }
}