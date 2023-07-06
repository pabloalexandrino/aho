import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import fb from '../utils/fb'
import { OfferContext } from '../providers/Offer'

export default function Custom404() {
    const router = useRouter()

    const {
        eventId,
    } = useContext(OfferContext)

    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            fb('PageView', 'PageView' + eventId)
        }
    }, [eventId])

    useEffect(() => {
        router.replace('/').then(r => r)
    })

    return null
}
