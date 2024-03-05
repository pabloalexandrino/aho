import { parseCookies } from 'nookies'
import React, { createContext, useState } from 'react'

interface OfferContextData {
    targetDate: string
    setTargetDate: React.Dispatch<React.SetStateAction<string>>
    expired: boolean
    setExpired: React.Dispatch<React.SetStateAction<boolean>>
    chance: string
    setChance: React.Dispatch<React.SetStateAction<string>>
    checkoutLink: string
    setCheckoutLink: React.Dispatch<React.SetStateAction<string>>
    pagina: string
    setPagina: React.Dispatch<React.SetStateAction<string>>
    eventId: string
    showElements: boolean
    setShowElements: React.Dispatch<React.SetStateAction<boolean>>
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
    clint: string
    setClint: React.Dispatch<React.SetStateAction<string>>
    instagram: string
    setInstagram: React.Dispatch<React.SetStateAction<string>>
    renda: string
    setRenda: React.Dispatch<React.SetStateAction<string>>
}

interface OfferProviderProps {
    children: React.ReactNode
}

export const OfferContext = createContext<OfferContextData>(
    {} as OfferContextData
)

export function OfferProvider({ children }: OfferProviderProps) {
    const { '@VP:Countdown': CountdownCookies } = parseCookies(undefined)
    const { '@VP:Chance': ChanceCookies } = parseCookies(undefined)
    const [chance, setChance] = useState(ChanceCookies)
    const [targetDate, setTargetDate] = useState(CountdownCookies)
    const [expired, setExpired] = useState(false)
    const [checkoutLink, setCheckoutLink] = useState('')
    const [pagina, setPagina] = useState('')
    const [showElements, setShowElements] = useState(false)
    const [value, setValue] = useState(0)
    const [clint, setClint] = useState('')
    const [instagram, setInstagram] = useState('')
    const [renda, setRenda] = useState('')

    const eventId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)

    return (
        <OfferContext.Provider
            value={{
                targetDate,
                setTargetDate,
                expired,
                setExpired,
                chance,
                setChance,
                checkoutLink,
                setCheckoutLink,
                pagina,
                setPagina,
                eventId,
                showElements,
                setShowElements,
                value,
                setValue,
                clint,
                setClint,
                instagram,
                setInstagram,
                renda,
                setRenda,
            }}
        >
            {children}
        </OfferContext.Provider>
    )
}
