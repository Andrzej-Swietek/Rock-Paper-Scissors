import {Component, FC, HTMLProps, ReactNode} from "react";
import {twMerge} from "tailwind-merge";
import {HeadingProps} from "@/types/typography";


const styles = {
    h1: "block my-8 antialiased tracking-normal font-sans text-5xl font-black leading-tight",
    h2: "block my-6 antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3]",
    h3: "block my-4 antialiased tracking-normal font-sans text-3xl font-semibold leading-snug",
    h4: "block my-4 antialiased tracking-normal font-sans text-2xl font-semibold leading-snug",
    h5: "block my-4 antialiased tracking-normal font-sans text-xl font-semibold leading-snug",
    h6: "block my-4 antialiased tracking-normal font-sans text-base font-semibold leading-relaxed",
};


export const Heading: FC<HeadingProps> = ({variant :Component ="h2", className='', children, ...rest}) => {
    const headingClasses: string = styles[Component];

    return (
        <Component className={twMerge(headingClasses, className)} {...rest}>
            { children }
        </Component>
    )
}