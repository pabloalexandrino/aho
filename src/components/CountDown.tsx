import { Suspense, useContext, useEffect, useState } from 'react'
import { OfferContext } from '../providers/Offer'

interface ICountdown {
    style?: string
}

export default function Countdown({ style = 'blocks' }: ICountdown) {
    const { targetDate, setExpired, expired } = useContext(OfferContext)

    const [remainingTime, setRemainingTime] = useState(
        parseInt(targetDate) - new Date().getTime(),
    )

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime(parseInt(targetDate) - new Date().getTime())
        }, 1000)

        if (remainingTime <= 0) {
            setExpired(true)
        } else {
            setExpired(false)
        }
        return () => clearInterval(intervalId)
    }, [targetDate, remainingTime, setExpired, expired])

    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60)
    const seconds = Math.floor((remainingTime / 1000) % 60)

    return (
        style === 'blocks' ? (
            <div className='grid grid-flow-col gap-5 text-center auto-cols-max'>
                <div
                    className={`flex flex-col p-2 rounded-box ${
                        minutes <= 0 && seconds <= 0
                            ? 'bg-error text-white'
                            : 'bg-neutral'
                    }`}
                >
                <span className='countdown font-mono text-5xl'>
                    <span
                        style={{
                            ['--value' as any]: minutes < 0 ? '0' : minutes,
                        }}
                    ></span>
                </span>
                    min
                </div>
                <div
                    className={`flex flex-col p-2 rounded-box ${
                        minutes <= 0 && seconds <= 0
                            ? 'bg-error text-white'
                            : 'bg-neutral'
                    }`}
                >
                <span className='countdown font-mono text-5xl'>
                    <span
                        style={{
                            ['--value' as any]: seconds < 0 ? '0' : seconds,
                        }}
                    ></span>
                </span>
                    seg
                </div>
            </div>
        ) : (
            <Suspense fallback={<div>Carregando...</div>}>
                <div className='ml-2'>
                    {minutes && minutes < 0 ? '00' : String(minutes).padStart(2, '0')}
                    : {seconds && seconds < 0 ? '00' : String(seconds).padStart(2, '0')}
                </div>
            </Suspense>
        )
    )
}
