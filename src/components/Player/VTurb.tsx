import Image from 'next/image'
import Script from 'next/script'
import { useContext, useEffect } from 'react'
import { OfferContext } from '../../providers/Offer'

interface IVturb {
    player: string | undefined
    video: string | undefined
    vertical?: boolean
}

export default function VTurb({ player, video, vertical = false }: IVturb) {
    return (
        <div className='w-full h-auto relative flex rounded-xl'>
            <div
                id={`vid_${player}`}
                className={`relative ${
                    vertical ? 'pb-[182.6%]' : 'pb-[56.25%]'
                } w-full h-0 rounded-xl overflow-hidden box-glow grid place-items-center`}
            >
                <Image id={`thumb_${player}`} layout='fill'
                       src={`https://images.converteai.net/${video}/players/${player}/thumbnail.jpg`}
                       className='absolute rounded-xl top-0 left-0 w-full h-full object-cover block'
                       alt='Video Thumbnail' />

                <div id={`backdrop_${player}`}
                     className='absolute rounded-xl top-0 left-0 w-full h-full bg-black opacity-50 blackdrop-blur-sm'
                     style={{ WebkitBackdropFilter: 'blur(5px)' }}></div>
            </div>
            <Script id={`src_${player}`}
                    strategy='afterInteractive'
                    src={`https://scripts.converteai.net/${video}/players/${player}/player.js`}>
            </Script>
        </div>
    )
}

// @ts-ignore
export const HiddenElements = ({ children, seconds }) => {
    const { showElements, setShowElements } = useContext(OfferContext)
    useEffect(() => {
        const alreadyDisplayedKey = `@AHOalreadyElsDisplayed${seconds}`

        let attempts = 0

        const showHiddenElements = () => {
            setShowElements(true)
            localStorage.setItem(alreadyDisplayedKey, String(true))
        }

        const startWatchVideoProgress = () => {
            // @ts-ignore
            if (typeof window.smartplayer === 'undefined' || !(window.smartplayer.instances && window.smartplayer.instances.length)) {
                if (attempts >= 10) return
                attempts += 1
                return setTimeout(() => {
                    startWatchVideoProgress()
                }, 1000)
            }

            // @ts-ignore
            window.smartplayer.instances[0].on('timeupdate', () => {
                // @ts-ignore
                if (showElements || window.smartplayer.instances[0].smartAutoPlay) return
                // @ts-ignore
                if (window.smartplayer.instances[0].video.currentTime < seconds) return
                showHiddenElements()
            })
        }

        const alreadyElsDisplayed = localStorage.getItem(alreadyDisplayedKey)

        if (typeof window !== 'undefined') {
            if (alreadyElsDisplayed === 'true') {
                setTimeout(() => {
                    showHiddenElements()
                }, 100)
            } else {
                startWatchVideoProgress()
            }
        }
    }, [seconds, showElements])

    return (
        showElements && children
    )
}
