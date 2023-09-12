import Head from 'next/head'
import { useContext, useEffect } from 'react'
import BlockedPage from '../components/BlockedPage'
import Navbar from '../components/Navbar'
import Vsl from '../components/Vsl'
import { OfferContext } from '../providers/Offer'
import fb from '../utils/fb'
import Script from 'next/script'
import { ParallaxProvider } from 'react-scroll-parallax'

export default function Home(): JSX.Element {
    const {
        setCheckoutLink,
        setPagina,
        eventId,
        setValue,
    } = useContext(OfferContext)

    useEffect(() => {
        setCheckoutLink('https://empreendaclub.typeform.com/go-aho')
        setPagina('aho-site')
        setValue(3500)
    }, [setCheckoutLink, setPagina, setValue])

    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            fb('PageView', 'PageView' + eventId).then(r => r)
        }
    }, [eventId])

    return (
        <div className='bg-left-top bg-[length:100vw_100vh] bg-fixed bg-[url(/bg-white.webp)]' data-theme={'dark'}>
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
                <Navbar leadRedirect={'https://empreendaclub.typeform.com/go-aho'} />
                <Vsl showButton playerComponent={'vturb'} player={'64b92bbdd66489000873fe34'}
                     video={'99583553-0c7c-40d5-b819-534dcd7867b9'} />
                <BlockedPage
                    show={true}
                />
            </ParallaxProvider>
        </div>
    )
}
