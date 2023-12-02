'use client'

import React, { FC } from "react";
import Image from 'next/image';
import Link from 'next/link';


interface Props extends IconButtonProps {}

const IconTemplate: FC<Props> = ({ icon, iconSize, onClick, className })  => ( <div className={`${className} ${iconSize} aspect-square cursor-pointer`} onClick={ onClick } > <Image src={ icon || '' } alt={ 'hero icon' } width={100} height={100} /> </div> )

export const IconButton: FC<Props> = ({ icon, iconSize, onClick=()=>{}, href, styles }) => {
    return (
        <>
            {
                href
                    ?
                    <Link href={ href || '' } >
                        <IconTemplate icon={ icon } iconSize={ iconSize } onClick={ onClick } styles={ styles } />
                    </Link>
                    :
                    <IconTemplate icon={ icon } iconSize={ iconSize } onClick={ onClick } styles={ styles } />
            }
        </>
    )
}
