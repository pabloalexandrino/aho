import Head from 'next/head'
import { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Vsl from '../components/Vsl'
import { OfferContext } from '../providers/Offer'
import fb from '../utils/fb'
import Script from 'next/script'
import BlockedPage from '../components/BlockedPage'
import { HiddenElements } from '../components/Player/VTurb'
import Geo from '../components/Geo'
import { ParallaxProvider } from 'react-scroll-parallax'

export default function Vsl03(): JSX.Element {
    const {
        setCheckoutLink,
        setPagina,
        eventId,
        setValue,
        showElements,
        checkoutLink,
        setClint,
    } = useContext(OfferContext)

    useEffect(() => {
        setCheckoutLink('https://go.rendacommilhas.com.br/form/9a9f6afa-e926-4e59-bcb1-37dd2d5fcf42')
        setClint('https://andrinno.com/api/redirect/queue/76')
        setPagina('vsl03 - AHO')
        setValue(3997)
    }, [setCheckoutLink, setClint, setPagina, setValue])

    useEffect(() => {
        if (eventId) {
            if (process.env.NODE_ENV === 'production') {
                fb('PageView', 'PageView' + eventId).then(r => r)
            }
        }
    }, [eventId])

    return (
        <div className='min-h-screen bg-left-top bg-[length:100vw_100vh] bg-fixed bg-[url(/bg-white.webp)]'
             data-theme={'dark'}>
            <Head>
                <title>Agência Home Office - Sua agência de viagens online</title>
            </Head>
            {process.env.NODE_ENV === 'production' && (
                <>
                    <Script id='facebook-pixel-page' strategy='afterInteractive'>
                        {`
                            fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                            fbq('track', 'PageView', {}, {eventID: '${'PageView' + eventId}'});
                        `}
                    </Script>
                </>
            )}

            <ParallaxProvider>
                <Geo />
                <Navbar leadRedirect={checkoutLink} logo={false} className='hidden' />
                <Vsl showButton={showElements} playerComponent={'vturb'}
                     player={'6552e7f9156f08000920a96b'}
                     video={'99583553-0c7c-40d5-b819-534dcd7867b9'} showTimer={true} />

                {/*436*/}
                <HiddenElements seconds='436'>
                    <BlockedPage
                        url={checkoutLink}
                        show={showElements}
                    />
                </HiddenElements>


            </ParallaxProvider>
        </div>
    )
}
