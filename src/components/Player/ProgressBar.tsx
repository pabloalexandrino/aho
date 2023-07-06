import { useEffect, useState } from 'react'

const ProgressBar = (props: { player: YT.Player | undefined }) => {
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            if (props.player) {
                setCurrentTime(props.player.getCurrentTime())
                setDuration(props.player.getDuration())
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [props.player])

    const getAccelerationFactor = (time: number, duration: number): number => {
        // Começa com um fator de aceleração alto e diminui com o tempo
        const maxFactor = 5
        const factor = maxFactor + (maxFactor - 1) * (1 - time / duration) ** 2
        // Limita o fator entre 1 e maxFactor
        return Math.min(Math.max(factor, 1), maxFactor)
    }

    const progress =
        100 *
        (1 -
            Math.pow(
                1 - currentTime / duration,
                getAccelerationFactor(currentTime, duration)
            ))

    return (
        <div className="absolute bottom-0 z-10 w-full h-3 px-2 py-1">
            <div
                className="h-full box-glow bg-gradient-to-r from-primary to-secondary w-full transition-all duration-1000 rounded-xl"
                style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
        </div>
    )
}

export default ProgressBar
