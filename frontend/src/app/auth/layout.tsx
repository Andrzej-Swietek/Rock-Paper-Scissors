import React from "react";
import {Heading, Paragraph} from "@core/typography";
import Image from "next/image";
import header_image from '../../../public/img/lobby_header.jpg';
export default function AuthLayout({
   children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className={'grid grid-cols-12 items-center px-4 lg:px-16 gap-x-8 gap-y-4 w-full h-full pt-32 pb-32'}>

            <div className={'col-span-6 bg-light rounded-[10px] w-full h-full min-h-[50vh] mt-16 shadow-md'}>
                <Image
                    src={header_image}
                    alt={'Banner image'}
                    sizes="100vw"
                    className={'rounded-[10px]'}
                    objectFit={'cover'}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>
            <div className={'col-span-6'}>
                <Heading className={'text-center col-span-full'} variant="h2">Authorization</Heading>
                <Paragraph className={'text-center col-span-full'}>
                    Log or Register in order to play with other players
                </Paragraph>
                {children}
            </div>
        </main>
    )
}
