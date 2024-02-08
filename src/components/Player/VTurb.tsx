import Image from 'next/image'
import Script from 'next/script'
import { useContext, useEffect } from 'react'
import { OfferContext } from '../../providers/Offer'

interface IVturb {
    player: string | undefined
    video: string | undefined
    vertical?: boolean
    iframe?: boolean
    abTest?: boolean
}

export default function VTurb({
                                  player,
                                  video,
                                  vertical = false,
                                  iframe = false,
                                  abTest = false,
                              }: IVturb) {

    //use effect to wait smartplayer element id to be created
    useEffect(() => {
        const interval = setInterval(() => {
            if (document.getElementById(`vid_${player}`)) {
                clearInterval(interval)
                const smart = document.getElementById('smartplayer')
                console.log(smart)
                if (smart) {
                    document.getElementById(`vid_${player}`)?.appendChild(smart)
                }
            }
        }, 200)
        return () => clearInterval(interval)
    }, [player])

    return (
        iframe ? (
            <div className={`${vertical ? 'pb-[176.6%]' : 'pb-[56.25%]'} relative`}>
                <iframe
                    src={`https://scripts.converteai.net/${video}/players/${player}/embed.html`}
                    id={`ifr_${player}`}
                    className='absolute top-0 left-0 w-full h-full rounded-xl'
                    referrerPolicy='origin'
                    title='Video Player'
                >
                </iframe>
            </div>
        ) : (
            <div className={`w-full h-auto relative flex rounded-xl ${vertical ? 'max-w-[80%]' : ''}`}>
                <div
                    id={`vid_${player}`}
                    className={`relative w-full rounded-xl overflow-hidden box-glow grid place-items-center`}
                >
                    <Image
                        id={`thumb_${player}`}
                        layout='fill'
                        src={`https://images.converteai.net/${video}/players/${player}/thumbnail.jpg`}
                        className={`absolute rounded-xl top-0 left-0 w-full h-full object-cover block`}
                        alt='Video Thumbnail'
                    />

                    <div id={`backdrop_${video}`}
                         className='absolute rounded-xl top-0 left-0 w-full h-full bg-black opacity-50 blackdrop-blur-sm'
                         style={{ WebkitBackdropFilter: 'blur(5px)' }}
                    ></div>
                </div>
                {video && player && (
                    <Script type='text/javascript' id={'scr_' + player}>
                        {`
                        const s=document.createElement('script');
                        s.src="https://scripts.converteai.net/${video}/${abTest ? 'ab-test' : 'players'}/${player}/player.js"
                        s.async=!0
                        document.head.appendChild(s);
                    `}
                    </Script>
                )}
            </div>
        ))
}

// @ts-ignore
export const HiddenElements = ({ children, seconds }) => {
    const { showElements, setShowElements } = useContext(OfferContext)

    useEffect(() => {
        const alreadyDisplayedKey = `@RCMalreadyElsDisplayed${seconds}`

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
    }, [seconds, setShowElements, showElements])

    return (
        showElements && children
    )
}
