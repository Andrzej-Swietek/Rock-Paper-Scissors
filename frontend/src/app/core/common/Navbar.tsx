import {FC} from "react";

'use client'

import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Transition } from "@headlessui/react";
import Link from 'next/link';
import Image from 'next/image';
import uuid from 'react-uuid';
import {PrimaryButton} from "@core/buttons";
// import { IconButton, PrimaryButton, RoundButton } from './buttons';


export const Navbar: FC<{}> = ()=> {
    const [open, setOpen] = useState<boolean>(false);
    const [ showMore, setShowMore ] = useState<boolean>(false);

    const [sticky, setSticky] = useState<boolean>(false);
    const navRef = useRef<HTMLDivElement>(null);

    const stickyStyle: string = `sticky top-0 left-0 transform translate-x-0 drop-shadow bg-white  w-full z-[1000] `;
    const normalStyle: string = `absolute top-0 left-1/2 transform -translate-x-1/2 z-[999999]`;

    useLayoutEffect( ()=> {
        window.addEventListener('scroll', (e)=> {
            window.scrollY > (navRef.current?.style?.height || 50) && setSticky(true);
            window.scrollY <= (navRef.current?.style?.height || 50) && setSticky(false );
        })
    },[])

    const navigation = [
        { path: '/', name: 'Home' },
        { path: '/', name: 'Profile' },
        { path: '/', name: 'About' },
        { path: '/play', name: 'Play' },
    ]

    return (
        <nav ref={navRef} className={`w-full sticky top-0 z-[1000]`}>

            {/*MAIN NAV*/}
            <div className={`relative flex flex-row w-full h-[115px] items-center ${ sticky ? 'bg-white drop-shadow' : 'bg-white ' } transition duration-500 hover:ease-in-out`}>

                <div className={'hidden md:flex w-full h-full grid grid-col-12 gap-1 xl:gap-4 px-4 justify-center items-center'}>
                    {/*<IconButton href={'/'} icon={'/icons/crp-logo.svg'} iconSize={'w-[48px]'} styles={'col-span-1 my-auto'} />*/}
                    {
                        navigation.map( item => (
                            item.name == 'Play'
                                ?
                                <PrimaryButton
                                    onClick={()=>{} }
                                    key={ uuid() }
                                    text={item.name}
                                    href={ item.path }
                                    variant={ 'filled' }
                                    className={ 'col-span-2 mx-4' }
                                />
                                :
                                <PrimaryButton
                                    onClick={()=>{} }
                                    key={ uuid() }
                                    href={ item.path }
                                    variant={ 'text' }
                                    className={ `col-span-2 mx-4 !lg:text-lg text-neutral !font-normal` }
                                    text={ item.name }
                                />
                        ))
                    }
                    <PrimaryButton
                        href={'/auth/login'}
                        variant={'filled'}
                        text={ 'Sign In' }
                        className={ 'col-span-2' }
                        onClick={()=>{} }
                    />
                    <PrimaryButton
                        href={'/auth/register'}
                        variant={'outlined'}
                        className={ `col-span-2 mx-2 xl:mx-4` }
                        onClick={()=>{} }
                        text={'Sign Up'}
                    />
                    <div className={'col-span-1 bg-primary w-[40px] aspect-square rounded-full flex-center'}>
                        {/*<IconButton href={'/'} icon={'/icons/search-icon.svg'} iconSize={'w-[24px]'} />*/}
                    </div>
                </div>

                {/*MOBILE NAV*/}
                <button
                    id="menu-btn"
                    title="Open menu"
                    aria-label="navigation menu"
                    className={`${open? 'open':''} absolute md:hidden top-[1rem] right-0 mr-12 mt-6 hamburger focus:outline-none z-30`}
                    onClick={ ()=> setOpen(prev => !prev) }
                >
                    <span className={`hamburger-top bg-black`}> </span>
                    <span className={`hamburger-middle bg-black`}> </span>
                    <span className={`hamburger-bottom bg-black`}> </span>
                </button>
                <Link
                  className={'absolute md:hidden left-0 !h-full flex-center  aspect-square focus:outline-none z-30'}
                  passHref href={`/`}
                >
                    <Image width={70} height={70} src={'/next.svg'} alt={'logo'}/>
                </Link>


                <div className="lg:hidden">
                    <Transition
                        show={open}
                        enter="duration-200 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div id="menu" className={`${ open ? 'flex' : 'hidden' } bg-white text-neutral w-screen h-screen absolute flex-col p-6`}>
                            <p className={'flex flex-col text-lg text-gradient uppercase mb-8'}>
                                {/* Some text */}
                            </p>
                            {
                                [...navigation]
                                    .filter( (item)=> item.name !== 'Donate now' && item.name !== 'Search' )
                                    .map((item)=>(<Link key={uuid()} href={item.path} className={'text-lg text-left pl-8 font-thin pb-4 text-neutral hover:text-primary'}> {item.name}</Link>))
                            }
                            <div className={'border-y border-primary border-1 w-full mb-4'}></div>
                            {
                                // [...more].map((item)=>(<Link key={uuid()} href={item.path}><a className={'text-lg font-normal pb-4 hover:text-secondaryTextColor'}>{item.name}</a></Link>))
                            }
                            <Link key={uuid()} href={'/auth/register'} className={'text-lg text-left pl-8 font-thin pb-4 text-neutral hover:text-primary'}> Sign Up </Link>
                            <Link key={uuid()} href={'/auth/login'} className={'text-lg text-left pl-8 font-bold pb-4 text-primary hover:text-primary'}> Sign In </Link>

                        </div>
                    </Transition>
                </div>
            </div>
        </nav>
    )
}
