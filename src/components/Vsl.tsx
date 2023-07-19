import { useContext, useEffect, useState } from 'react'
import Blur from './Blur'
import CallToAction from './CallToAction'
import Countdown from './CountDown'
import { OfferContext } from '../providers/Offer'
import { parseCookies } from 'nookies'
import { setCookies } from '../utils/useCookies'
import VTurb from './Player/VTurb'

interface IVsl {
    showButton?: boolean
    float?: boolean
    video?: string
    showTimer?: boolean
    player?: string
    playerComponent?: string
}

export default function Vsl({
                                showButton,
                                float,
                                video,
                                showTimer = false,
                                player,
                                playerComponent = 'panda',
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
                    parseInt(process.env.NEXT_PUBLIC_TIME_1 ?? '0'),
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


    useEffect(() => {
        const now = new Date()

        if (now.getHours() >= 0 && now.getHours() < 6) {
            setInitialValue(96)
        } else if (now.getHours() >= 6 && now.getHours() < 12) {
            setInitialValue(514)
        } else if (now.getHours() >= 12 && now.getHours() < 18) {
            setInitialValue(754)
        } else {
            setInitialValue(914)
        }

        setCounter(initialValue)

        const intervalId = setInterval(() => {
            const random = Math.random()
            if (random > 0.4) {
                setCounter((prevCounter) => prevCounter + 3)
            } else {
                setCounter((prevCounter) => prevCounter - 2)
            }
        }, 3000)

        return () => clearInterval(intervalId)
    }, [initialValue, float])

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
            'box-red-glow',
        )
        document.getElementById('close')?.classList.add('hidden')
        document.getElementById('overlay')?.classList.add('absolute')

        setIsClosed(true)
    }

    // useEffect(() => {
    //     if (clientWindowHeight > 960 && !isClosed) {
    //         document
    //             .getElementById('vsl')
    //             ?.classList.add(
    //             'fixed',
    //             'bottom-0',
    //             'right-0',
    //             'max-w-[400px]',
    //             'box-red-glow',
    //             'rounded-xl',
    //         )
    //
    //         document.getElementById('close')?.classList.remove('hidden')
    //
    //         document.getElementById('overlay')?.classList.remove('absolute')
    //     } else {
    //         document
    //             .getElementById('vsl')
    //             ?.classList.remove(
    //             'fixed',
    //             'bottom-0',
    //             'right-0',
    //             'max-w-[400px]',
    //             'box-red-glow',
    //         )
    //
    //         document.getElementById('close')?.classList.add('hidden')
    //
    //         document.getElementById('overlay')?.classList.add('absolute')
    //     }
    // }, [clientWindowHeight, isClosed])

    player = player ?? process.env.NEXT_PUBLIC_PLAYER_ID
    video = video ?? process.env.NEXT_PUBLIC_VIDEO_ID

    return (
        <>
            <section className='flex justify-center pb-12'>
                <Blur />

                <div className='container max-w-4xl px-6 md:mt-6'>
                    {showTimer && display && (
                        <div className='w-fit rounded-lg mx-auto bg-error text-white py-2 px-6'>
                            {/* gerar cronometro de 10 minutos retrocedendo o tempo */}
                            <div className='flex flex-col gap-8 text-center'>
                                <h2 className='font-bold text-sm md:text-2xl'>
                                    {expired
                                        ? 'Oferta encerrada'
                                        : (
                                            <div className='flex'>
                                                Essa oferta se encerra em{' '}
                                                <Countdown style='text' />
                                            </div>
                                        )}
                                </h2>
                            </div>
                        </div>
                    )}

                    <h1 className='md:text-center uppercase my-6 rounded-md text-xl md:text-3xl md:leading-snug font-bold text-justify inline-block'
                    >
                        Lucre de <span
                        className='text-white bg-gradient font-bold rounded-lg px-4'>10 a 50 mil reais
                        por mês</span> {' '}(ou mais) com sua agência de viagens home office!
                    </h1>
                    <h3 className='text-sm md:text-lg md:text-center'>
                        O modelo de negócio que permite <span className='font-bold'>Lucro, Escala e Liberdade</span>,
                        usando apenas uma única plataforma: <span className='font-bold'>O ViajaFlux!</span>
                    </h3>

                    <div className='my-8 w-full max-w-5xl flex mx-auto relative'>
                        <div
                            id='overlay'
                            className='absolute w-full h-0 pb-[56.25%] rounded-xl overflow-hidden box-red-glow'
                        ></div>

                        <button
                            onClick={handleClose}
                            id='close'
                            className='hidden btn-circle btn btn-sm fixed -mt-8 right-0 bottom-[230px] z-10'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-6 h-6'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        </button>
                        <div
                            className='w-full flex justify-center z-20'
                            id='vsl'
                        >
                            <VTurb player={player} video={video} />
                        </div>
                    </div>

                    <div className='text-center relative flex justify-center w-full'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
                            />
                        </svg>

                        <span className='mx-2'>
                            <span className='font-bold'>{counter}</span> pessoas
                            assistindo agora
                        </span>
                    </div>

                    <div className={`mt-8 ${showButton ? 'block' : 'hidden'}`}>
                        <CallToAction />
                    </div>
                </div>
            </section>
        </>
    )
}
