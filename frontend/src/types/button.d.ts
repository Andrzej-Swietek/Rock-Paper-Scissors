interface ButtonProps {
    className?: string;
    onClick?: ()=> void;
    href?: string;
    variant: ButtonVariant
}

interface IconButtonProps extends ButtonProps  {
    icon?: string;
    iconSize?: string;
}

type ButtonVariant = "filled" | "outlined" | "text" | "disabled"