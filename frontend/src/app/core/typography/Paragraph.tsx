import {FC} from "react";
import {ParagraphProps} from "@/types/typography";
import {twMerge} from "tailwind-merge";

export const Paragraph: FC<ParagraphProps> = ({variant = "compact", className='', children, ...rest}) => {
    const styles = {
        "compact" : "block antialiased font-sans text-xl font-normal leading-relaxed",
        "robust": "block antialiased font-sans text-base font-light leading-relaxed",
        "small": "block antialiased font-sans text-sm font-light leading-normal"
    }

    const headingClasses: string = styles[variant];

    return (
        <p className={twMerge(headingClasses, className)} {...rest}>
            { children }
        </p>
    )
}