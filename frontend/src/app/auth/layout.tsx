import React from "react";
import {Heading, Paragraph} from "@core/typography";
import Image from "next/image";
import header_image from '../../../public/img/lobby_header.jpg';
import {GoBackButton} from "@core/buttons/GoBackButton";
export default function AuthLayout({
   children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className={'grid grid-cols-12 items-center px-4 lg:px-16 gap-x-8 gap-y-4 w-full h-full pt-32 pb-32'}>
            {/*<GoBackButton className={'absolute top-12 left-12'} variant={'outlined'} />*/}
            <GoBackButton className={'absolute top-12 left-12'} variant={'filled'} />
            <div className={'col-span-6 bg-light rounded-[10px] w-full h-full min-h-[50vh] mt-16 relative'}>
                <div className={'w-full shadow-md rounded-[10px] md:sticky md:top-32'}>
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
