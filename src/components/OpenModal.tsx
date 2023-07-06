import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { setCookies } from '../utils/useCookies'
import AccessInstagram from './Modals/Instagram'

export default function OpenModal() {
    const { '@AHO:Modal': ModalCookies } = parseCookies(undefined)
    const [showModalCookies, setShowModalCookies] = useState(ModalCookies)

    const handleOpenModal = () => {
        const elementOpenModal = document.getElementById('line-open-modal')
        if (!showModalCookies) {
            setCookies('@AHO:Modal', 'open', 60 * 60)
            elementOpenModal?.removeEventListener('mouseover', handleOpenModal)
            return document
                .getElementById('modal-access')
                ?.classList.add('modal-open')
        }
    }

    useEffect(() => {
        const elementOpenModal = document.getElementById('line-open-modal')
        elementOpenModal?.addEventListener('mouseover', handleOpenModal)
    })

    return (
        <>
            <span
                id="line-open-modal"
                className="md:h-3 block fixed top-0 w-full z-10"
            ></span>
            <AccessInstagram />
        </>
    )
}
