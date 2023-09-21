import { useContext, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { OfferContext } from '../../providers/Offer'
import CapturePage from '../../components/CapturePage'
import Head from 'next/head'

export default function Home() {
    const {
        setPagina,
        setValue,
        eventId,
    } = useContext(OfferContext)

    useEffect(() => {
        setPagina('aho-trafego')
        setValue(4000)
    }, [setPagina, setValue])

    return (
        <>
            <Head>
                <title>Agência Home Office - Sua Agência de Viagens Online</title>
            </Head>
            <CapturePage form={true} />
        </>
    )
}
