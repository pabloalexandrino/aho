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

export default function Vsl01(): JSX.Element {
    const {
        setCheckoutLink,
        setPagina,
        eventId,
        setValue,
        showElements,
    } = useContext(OfferContext)

    const url = 'https://empreendaclub.typeform.com/aho-vsl01'

    useEffect(() => {
        setCheckoutLink(url)
        setPagina('vls01')
        setValue(10000)
    }, [setCheckoutLink, setPagina, setValue])

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
                <Navbar leadRedirect={url} logo={false} />
                <Vsl showButton={showElements} playerComponent={'vturb'} player={'651427fd0c9e0a0009284921'}
                     video={'99583553-0c7c-40d5-b819-534dcd7867b9'} showTimer={true} />

                {/*6:30*/}
                <HiddenElements seconds='390'>
                    <BlockedPage
                        show={showElements}
                    />
                </HiddenElements>


            </ParallaxProvider>
        </div>
    )
}
