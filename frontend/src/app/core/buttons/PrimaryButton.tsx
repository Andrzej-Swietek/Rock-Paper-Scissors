'use client'
import {FC, ReactNode} from "react";
import { twMerge } from 'tailwind-merge'

interface PrimaryButtonProps extends ButtonProps {
    text: ReactNode;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({ href, onClick, className, text }) => {
  return (
      <button className={ twMerge(``, className) } onClick={() => onClick()}>
          { text }
      </button>
  )
}