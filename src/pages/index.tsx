import { useContext, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { OfferContext } from '../providers/Offer'
import CapturePage from '../components/CapturePage'

export default function Home() {
    const {
        setPagina,
        setValue
    } = useContext(OfferContext)

    useEffect(() => {
        setPagina('aho-trafego')
        setValue(3500)
    }, [setPagina, setValue])

    return <CapturePage form={true} />
}
