interface ButtonProps {
    className?: string;
    onClick: ()=> void;
    href?: string;
}

interface IconButtonProps extends ButtonProps  {
    icon?: string;
    iconSize?: string;
}
