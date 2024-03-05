import React, { ReactNode, useContext, useEffect, useState } from 'react'
import Blur from './Blur'
import Countdown from './CountDown'
import { OfferContext } from '../providers/Offer'
import { parseCookies } from 'nookies'
import { setCookies } from '../utils/useCookies'
import VTurb from './Player/VTurb'
import CallToAction from './CallToAction'
import Head from 'next/head'

interface IVsl {
    showButton?: boolean
    float?: boolean
    video?: string
    showTimer?: boolean
    player?: string
    playerComponent?: string
    full?: boolean
    arrow?: boolean
    abTest?: boolean
    children?: ReactNode
    head?: ReactNode
}

export default function Vsl({
    showButton,
    float,
    video,
    showTimer = false,
    player,
    playerComponent = 'panda',
    full = false,
    arrow = false,
    abTest = false,
    children,
    head,
}: IVsl): JSX.Element {
    const [clientWindowHeight, setClientWindowHeight] = useState(0)
    const [isClosed, setIsClosed] = useState(!float)
    const [initialValue, setInitialValue] = useState(0)
    const [counter, setCounter] = useState(initialValue)
    const [display, setDisplay] = useState(false)
    const { setTargetDate, expired } = useContext(OfferContext)
    const { '@AHO:Countdown': CountdownCookies } = parseCookies(undefined)

    useEffect(() => {
        if (showTimer) {
            const timeoutId = setTimeout(() => {
                setDisplay(true)
                const target = new Date().setMinutes(
                    new Date().getMinutes() +
                        parseInt(process.env.NEXT_PUBLIC_TIME_1 ?? '0')
                )
                if (!CountdownCookies) {
                    setTargetDate(target.toString())
                    setCookies('@AHO:Countdown', target, 60 * 60 * 24 * 7)
                }
            }, 770 * 1000) // 12 minutos e 50 segundos (770 segundos)

            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, [showTimer, CountdownCookies, setTargetDate])

    // useEffect(() => {
    //     const now = new Date()
    //
    //     if (now.getHours() >= 0 && now.getHours() < 6) {
    //         setInitialValue(96)
    //     } else if (now.getHours() >= 6 && now.getHours() < 12) {
    //         setInitialValue(514)
    //     } else if (now.getHours() >= 12 && now.getHours() < 18) {
    //         setInitialValue(754)
    //     } else {
    //         setInitialValue(914)
    //     }
    //
    //     setCounter(initialValue)
    //
    //     const intervalId = setInterval(() => {
    //         const random = Math.random()
    //         if (random > 0.4) {
    //             setCounter((prevCounter) => prevCounter + 3)
    //         } else {
    //             setCounter((prevCounter) => prevCounter - 2)
    //         }
    //     }, 3000)
    //
    //     return () => clearInterval(intervalId)
    // }, [initialValue, float])

    const handleScroll = () => {
        setClientWindowHeight(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleClose = () => {
        document
            .getElementById('vsl')
            ?.classList.remove(
                'fixed',
                'bottom-0',
                'right-0',
                'max-w-[400px]',
                'box-red-glow'
            )
        document.getElementById('close')?.classList.add('hidden')
        document.getElementById('overlay')?.classList.add('absolute')

        setIsClosed(true)
    }

    player = player ?? process.env.NEXT_PUBLIC_PLAYER_ID
    video = video ?? process.env.NEXT_PUBLIC_VIDEO_ID

    return (
        <>
            {playerComponent === 'panda' ? (
                <Head>
                    <link
                        rel="preload"
                        href={`https://player-${player}.tv.pandavideo.com.br/embed/css/styles.css`}
                        as="style"
                    />
                    <link
                        rel="prerender"
                        href={`https://player-${player}.tv.pandavideo.com.br/embed/?v=${video}`}
                    />
                    <link
                        rel="preload"
                        href={`https://player-${player}.tv.pandavideo.com.br/embed/js/hls.js`}
                        as="script"
                    />
                    <link
                        rel="preload"
                        href={`https://player-${player}.tv.pandavideo.com.br/embed/js/plyr.polyfilled.min.js`}
                        as="script"
                    />
                    <link
                        rel="preload"
                        href={`https://config.tv.pandavideo.com.br/${player}/${video}.json`}
                        as="fetch"
                    />
                    <link
                        rel="preload"
                        href={`https://config.tv.pandavideo.com.br/${player}/config.json`}
                        as="fetch"
                    />
                    <link
                        rel="preload"
                        href={`https://b-${player}.tv.pandavideo.com.br/${video}/playlist.m3u8`}
                        as="fetch"
                    />
                    <link
                        rel="dns-prefetch"
                        href={`https://b-${player}.tv.pandavideo.com.br`}
                    />
                    <link
                        rel="dns-prefetch"
                        href={`https://player-${player}.tv.pandavideo.com.br`}
                    />
                    <link
                        rel="dns-prefetch"
                        href={`https://${player}.b-cdn.net" /`}
                    />
                </Head>
            ) : (
                <Head>
                    <link
                        rel="preload"
                        href={`https://scripts.converteai.net/${video}/players/${player}/player.js`}
                        as="script"
                    />
                    <link
                        rel="preload"
                        href={
                            'https://cdn.converteai.net/lib/js/smartplayer/v1/smartplayer.min.js'
                        }
                        as="script"
                    />
                    <link
                        rel="preload"
                        href={`https://images.converteai.net/${video}/${
                            abTest ? 'ab-test' : 'players'
                        }/${player}/thumbnail.jpg`}
                        as="image"
                    />
                    <link
                        rel="preload"
                        href={`https://cdn.converteai.net/${video}/${player}/main.m3u8`}
                        as="fetch"
                    />
                    <link
                        rel="dns-prefetch"
                        href="https://cdn.converteai.net"
                    />
                    <link
                        rel="dns-prefetch"
                        href="https://scripts.converteai.net"
                    />
                    <link
                        rel="dns-prefetch"
                        href="https://images.converteai.net"
                    />
                    <link
                        rel="dns-prefetch"
                        href="https://api.vturb.com.br"
                    ></link>
                </Head>
            )}

            <section className="flex justify-center min-h-screen pb-12 text-white bg-gradient-to-tl from-gray-700 via-gray-900 to-black">
                <Blur />

                <div className="container max-w-5xl px-6 md:mt-6">
                    {showTimer && display && (
                        <div className="px-6 py-2 mx-auto text-white rounded-lg w-fit bg-error">
                            {/* gerar cronometro de 10 minutos retrocedendo o tempo */}
                            <div className="flex flex-col gap-8 text-center">
                                <h2 className="text-sm font-bold md:text-2xl">
                                    {expired ? (
                                        'Oferta encerrada'
                                    ) : (
                                        <div className="flex">
                                            Essa oferta se encerra em{' '}
                                            <Countdown style="text" />
                                        </div>
                                    )}
                                </h2>
                            </div>
                        </div>
                    )}

                    {/*<div className='flex items-center gap-1 mx-auto mt-6 w-fit'>*/}
                    {/*    /!*<span className="mr-2">⚠️</span>*!/*/}
                    {/*    <h2 className='max-w-xs p-2 text-xs leading-normal text-center text-black rounded-lg animate-pulse bg-warning md:text-lg'>*/}
                    {/*        VÍDEO ABAIXO REVELA*/}
                    {/*    </h2>*/}
                    {/*    /!*<span className="ml-2">⚠️</span>*!/*/}
                    {/*</div>*/}

                    {head ? (
                        head
                    ) : (
                        <h1 className="inline-block my-6 text-xl font-bold text-center uppercase rounded-md md:text-3xl md:leading-snug">
                            Entenda como lucrar de <br className="sm:hidden" />
                            <span className="px-4 font-bold text-white rounded-lg bg-gradient">
                                10 a 30 mil reais por mês
                            </span>{' '}
                            <br className="sm:hidden" /> com sua agência home
                            office!
                        </h1>
                    )}
                    <div className="relative flex w-full max-w-5xl mx-auto my-8">
                        <div
                            id="overlay"
                            className="absolute w-full h-0 pb-[56.25%] rounded-xl overflow-hidden box-red-glow"
                        ></div>

                        <button
                            onClick={handleClose}
                            id="close"
                            className="hidden btn-circle btn btn-sm fixed -mt-8 right-0 bottom-[230px] z-10"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        {/*<div*/}
                        {/*    className='z-20 flex justify-center w-full'*/}
                        {/*    id='vsl'*/}
                        {/*>*/}
                        <div
                            id="vsl"
                            className="z-20 flex justify-center w-full"
                        >
                            <VTurb
                                player={player}
                                video={video}
                                abTest={abTest}
                            />
                        </div>
                    </div>

                    {/*<div className='text-center'>*/}
                    {/*    Assista até o final, tem 2 presentes 🎁 para você lá!*/}
                    {/*</div>*/}

                    {/*<div className='relative flex justify-center w-full mt-2 text-center'>*/}
                    {/*    <svg*/}
                    {/*        xmlns='http://www.w3.org/2000/svg'*/}
                    {/*        fill='none'*/}
                    {/*        viewBox='0 0 24 24'*/}
                    {/*        strokeWidth={1.5}*/}
                    {/*        stroke='currentColor'*/}
                    {/*        className='w-6 h-6'*/}
                    {/*    >*/}
                    {/*        <path*/}
                    {/*            strokeLinecap='round'*/}
                    {/*            strokeLinejoin='round'*/}
                    {/*            d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'*/}
                    {/*        />*/}
                    {/*    </svg>*/}

                    {/*    <span className='mx-2'>*/}
                    {/*        <span className='font-bold'>{counter}</span> pessoas*/}
                    {/*        assistindo agora*/}
                    {/*    </span>*/}
                    {/*</div>*/}

                    <div className={`mt-8 ${showButton ? 'block' : 'hidden'}`}>
                        <CallToAction />
                    </div>

                    {children}
                </div>
            </section>
        </>
    )
}
