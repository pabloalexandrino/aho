import Head from 'next/head'
import { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Vsl from '../components/Vsl'
import { OfferContext } from '../providers/Offer'
import fb from '../utils/fb'
import Script from 'next/script'
import BlockedPage from '../components/BlockedPage'
import Geo from '../components/Geo'
import { ParallaxProvider } from 'react-scroll-parallax'

export default function Index(): JSX.Element {
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
        const utmParams = urlParams.get('utm_source')
            ? `?utm_source=${urlParams.get(
                'utm_source',
            )}&utm_medium=${urlParams.get(
                'utm_medium',
            )}&utm_campaign=${urlParams.get(
                'utm_campaign',
            )}&utm_term=${urlParams.get(
                'utm_term',
            )}&utm_content=${urlParams.get('utm_content')}`
            : ''
        const url = 'https://empreendaclub.typeform.com/aho-vsl02' + utmParams

        setCheckoutLink(url)
        setPagina('index - AHO')
        setValue(3997)
    }, [setCheckoutLink, setPagina, setValue])

    useEffect(() => {
        if (eventId) {
            if (process.env.NODE_ENV === 'production') {
                fb('PageView', 'PageView' + eventId).then((r) => r)
            }
        }
    }, [eventId])

    return (
        <div
            className='min-h-screen bg-left-top bg-[length:100vw_100vh] bg-fixed bg-[url(/bg-white.webp)]'
            data-theme={'dark'}
        >
            <Head>
                <title>
                    Agência Home Office - Sua agência de viagens online
                </title>
            </Head>
            {process.env.NODE_ENV === 'production' && (
                <>
                    <Script
                        id='facebook-pixel-page'
                        strategy='afterInteractive'
                    >
                        {`
                            fbq('init', '${
                            process.env.NEXT_PUBLIC_FB_PIXEL_ID
                        }');
                            fbq('track', 'PageView', {}, {eventID: '${
                            'PageView' + eventId
                        }'});
                        `}
                    </Script>
                </>
            )}

            <ParallaxProvider>
                <Geo
                    text={'SEU NEGÓCIO ONLINE ESTÁ NO TUTORIAL ABAIXO 👇'}
                    marquee
                />
                <Navbar leadRedirect={checkoutLink} logo={false} />
                <Vsl
                    showButton={showElements}
                    playerComponent={'vturb'}
                    player={'65f0f845c30b6200081effc8'}
                    video={'99583553-0c7c-40d5-b819-534dcd7867b9'}
                    head={
                        <>
                            <h1 className='inline-block my-6 text-xl font-bold text-center uppercase rounded-md md:text-3xl md:leading-snug'>
                                Tutorial ensina como lucrar de{' '}
                                <br className='sm:hidden' />
                                <span className='px-4 font-bold text-white rounded-lg bg-gradient'>
                                        10 a 30 mil reais por mês
                                    </span>{' '}
                                <br className='sm:hidden' /> (ou mais) com
                                sua Agência de Viagens Home Office!
                            </h1>
                            <div className='text-lg text-center text-white'>
                                Assista até o final e garanta sua
                                consultoria gratuita.
                            </div>
                        </>
                    }
                />

                {/*<HiddenElements seconds="0">*/}
                <BlockedPage url={checkoutLink} />
                {/*</HiddenElements>*/}
            </ParallaxProvider>
        </div>
    )
}
