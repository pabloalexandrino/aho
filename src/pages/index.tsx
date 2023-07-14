import Head from 'next/head'
import { useContext, useEffect } from 'react'
import TagManager from 'react-gtm-module'
import BlockedPage from '../components/BlockedPage'
import Navbar from '../components/Navbar'
import Vsl from '../components/Vsl'
import { OfferContext } from '../providers/Offer'
import fb from '../utils/fb'
import Script from 'next/script'
import BlurImage from '../components/BlurImage'

export default function Home(): JSX.Element {
    const {
        setCheckoutLink,
        setPagina,
        eventId,
        setValue,
    } = useContext(OfferContext)

    useEffect(() => {
        // setCheckoutLink('https://go.rendacommilhas.com.br/checkout/rcm-site')
        setCheckoutLink(
            'https://go.rendacommilhas.com.br/form/993645a3-3767-40f3-a477-7b0a4905d98b',
        )
        setPagina('site')
        setValue(997)
    }, [setCheckoutLink, setPagina, setValue])

    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            fb('PageView', 'PageView' + eventId)
            TagManager.dataLayer({
                dataLayer: {
                    event: 'PageView' + eventId,
                    page: 'rcm',
                },
            })
        }
    }, [eventId])

    return (
        <div className="bg-left-top bg-[length:100vw_100vh] bg-fixed bg-[url(/bg-white.webp)]">
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

            <Navbar leadRedirect={'https://empreendaclub.andrinno.com/redirect/queue/7'} />
            <Vsl showButton={true} playerComponent={'vturb'} player={'64a407bb2e6fd10009827d12'}
                 video={'99583553-0c7c-40d5-b819-534dcd7867b9'} float />
            <BlockedPage
                show={true}
                offer={{
                    price: 'ou R$ 997,00 à vista',
                    installment: '12x de R$ 99,73*',
                    discount: '-R$ 3.023,00',
                    //base 4020,00
                }}
            />
        </div>
    )
}
