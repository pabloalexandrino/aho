import { useContext, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { OfferContext } from '../providers/Offer'
import CapturePage from '../components/CapturePage'
import Script from 'next/script'
import Head from 'next/head'

export default function Home() {
    const {
        setPagina,
        setValue,
        eventId,
    } = useContext(OfferContext)

    useEffect(() => {
        setPagina('aho-alunos')
        setValue(3500)
    }, [setPagina, setValue])

    return (
        <>
            <Head>
                <title>Agência Home Office - Sua Agência de Viagens Online</title>
            </Head>
            <Script id='facebook-pixel-page' strategy='afterInteractive'>
                {`
                    fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                    fbq('track', 'PageView', {}, {eventID: '${'PageView' + eventId}'});
                `}
            </Script>

            <CapturePage form={false} />
        </>
    )
}
