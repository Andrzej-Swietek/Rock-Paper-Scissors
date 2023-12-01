import {HTMLProps, ReactNode} from "react";

type HeaderVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type ParagraphVariant = 'compact' | 'robust' | "small"

type HeadingProps = {
    variant?: HeaderVariant;
    className?: string;
    children: ReactNode;
} & HTMLProps<HTMLDivElement>;

type ParagraphProps = {
    variant?: ParagraphVariant;
    className?: string;
    children: ReactNode;
} & HTMLProps<HTMLDivElement>;