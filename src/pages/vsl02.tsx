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
        checkoutLink,
    } = useContext(OfferContext)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const utmParams = urlParams.get('utm_source') ? `?utm_source=${urlParams.get('utm_source')}&utm_medium=${urlParams.get('utm_medium')}&utm_campaign=${urlParams.get('utm_campaign')}&utm_term=${urlParams.get('utm_term')}&utm_content=${urlParams.get('utm_content')}` : ''
        const url = 'https://empreendaclub.typeform.com/aho-vsl02' + utmParams

        setCheckoutLink(url)
        setPagina('vls02')
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
                <Navbar leadRedirect={checkoutLink} logo={false} />
                <Vsl url={checkoutLink} showButton={showElements} playerComponent={'vturb'}
                     player={'651490973e82640009918a9e'}
                     video={'99583553-0c7c-40d5-b819-534dcd7867b9'} showTimer={true} />

                {/*8:40*/}
                <HiddenElements seconds='520'>
                    <BlockedPage
                        url={checkoutLink}
                        show={showElements}
                    />
                </HiddenElements>


            </ParallaxProvider>
        </div>
    )
}
