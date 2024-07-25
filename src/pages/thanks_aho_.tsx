import Head from 'next/head'
import Script from 'next/script'
import { useCallback, useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Obrigado2 from '../components/Obrigado2'
import fb from '../utils/fb'
import { setCookies } from '../utils/useCookies'
import { OfferContext } from '../providers/Offer'
import Link from 'next/link'
import { HiddenElements } from '../components/Player/VTurb'

export default function Home(): JSX.Element {
    const [price, setPrice] = useState('0')
    const [fbClick, setFbClick] = useState('')
    const { eventId } = useContext(OfferContext)
    // const minutes = 5

    useEffect(() => {
        setFbClick(localStorage.getItem('fb-click') || '')
    }, [fbClick])

    const fetchPrice = useCallback(async () => {
        const urlParams = new URLSearchParams(window.location.search)
        setPrice(urlParams.get('value')!)

        if (urlParams.get('fbclid')) {
            setFbClick(urlParams.get('fbclid')!)
            setCookies('@AHO:fbclid', fbClick, 60 * 60 * 24 * 30)
        }

        if (process.env.NODE_ENV === 'production' && urlParams.get('value')) {
            await fb('PageView', 'PageView' + eventId)
            await fb(
                'Purchase',
                'Purchase' + eventId,
                urlParams.get('name') || '',
                urlParams.get('email') || '',
                urlParams.get('phone') || '',
                urlParams.get('content-name') || '',
                urlParams.get('content-id') || '',
                parseFloat(price),
                urlParams.get('country') || 'br',
                urlParams.get('uf') || '',
                urlParams.get('city') || '',
                urlParams.get('cep') || '',
                '',
            )
        }
    }, [fbClick, eventId, price])

    useEffect(() => {
        fetchPrice().then(r => r)
    }, [fetchPrice])

    return (
        <div data-theme={'light'} className='bg-base-100'>
            <Head>
                <title>Obrigado - Não Feche</title>
                <meta name='robots' content='noindex' />
                {/* <!-- Event snippet for AHO conversion page --> */}
            </Head>

            {process.env.NODE_ENV === 'production' && price !== '0' && (
                <>
                    <Script id='facebook-pixel-page' strategy='afterInteractive'>
                        {`
                            fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                            fbq('track', 'PageView', {}, {eventID: '${'PageView' + eventId}'});
                            fbq('track', 'Purchase', {
                                currency: "BRL",
                                value:${parseFloat(price)}
                            }, {
                                eventID: '${'Purchase' + eventId}'
                            });
                        `}
                    </Script>
                </>
            )}

            <Obrigado2 />

            <HiddenElements seconds={72}>
                <section className='relative mx-auto py-4 px-6 bg-black flex flex-col justify-center'>
                    <div
                        className='-mt-16 md:-mt-20 mb-6  mx-auto animate-bounce bg-lime-600 p-2 w-10 h-10 ring-1 ring-green-900/5 shadow-lg rounded-xl flex items-center justify-center'>
                        <svg
                            className='w-6 h-6 text-black'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path d='M19 14l-7 7m0 0l-7-7m7 7V3'></path>
                        </svg>
                    </div>

                    <Link
                        href='https://wa.me/551831751687/?text=Ol%C3%A1%2C%20gostaria%20de%20receber%20o%20v%C3%ADdeo%20do%20AHO%20aqui%20no%20WhatsApp.'
                        rel={'noreferrer'}
                        target={'_blank'}
                    >
                        <div className='btn btn-primary h-auto mx-auto mt-2 py-4'>
                        <span className='text-3xl mr-2 text-center hidden sm:block'>
                            💬
                        </span>
                            RECEBA O VÍDEO NO WHATSAPP
                        </div>
                    </Link>
                </section>
            </HiddenElements>
            <div className='bg-black'>
                <Footer />
            </div>
        </div>
    )
}
