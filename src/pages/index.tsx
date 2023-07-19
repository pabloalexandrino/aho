import Head from 'next/head'
import { useContext, useEffect } from 'react'
import TagManager from 'react-gtm-module'
import BlockedPage from '../components/BlockedPage'
import Navbar from '../components/Navbar'
import Vsl from '../components/Vsl'
import { OfferContext } from '../providers/Offer'
import fb from '../utils/fb'
import Script from 'next/script'

export default function Home(): JSX.Element {
    const {
        setCheckoutLink,
        setPagina,
        eventId,
        setValue,
    } = useContext(OfferContext)

    useEffect(() => {
        setCheckoutLink('https://view.forms.app/gregatti/formspaginaaho')
        setPagina('aho-site')
        setValue(3500)
    }, [setCheckoutLink, setPagina, setValue])

    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            fb('PageView', 'PageView' + eventId).then(r => r)
            TagManager.dataLayer({
                dataLayer: {
                    event: 'PageView' + eventId,
                    page: 'aho',
                },
            })
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

            <Navbar leadRedirect={'https://empreendaclub.typeform.com/go-aho'} />
            <Vsl showButton playerComponent={'vturb'} player={'64a407bb2e6fd10009827d12'}
                 video={'99583553-0c7c-40d5-b819-534dcd7867b9'} />
            <BlockedPage
                show={true}
            />
        </div>
    )
}
