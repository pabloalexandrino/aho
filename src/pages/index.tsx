import { useContext, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { OfferContext } from '../providers/Offer'
import CapturePage from '../components/CapturePage'
import Script from 'next/script'

export default function Home() {
    const {
        setPagina,
        setValue,
        eventId
    } = useContext(OfferContext)

    useEffect(() => {
        setPagina('aho-trafego')
        setValue(3500)
    }, [setPagina, setValue])

    return (
        <>
            <Script id='facebook-pixel-page' strategy='afterInteractive'>
                {`
                    fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                    fbq('track', 'Lead', {}, {eventID: '${'PageView' + eventId}'});

                    fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID2}');
                    fbq('track', 'Lead', {}, {eventID: '${'PageView' + eventId}'});
                `}
            </Script>

            <CapturePage form={true} />
        </>
    )
}
