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
    eventId: string,
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    showElements: boolean,
    setShowElements: React.Dispatch<React.SetStateAction<boolean>>
}

interface OfferProviderProps {
    children: React.ReactNode
}

export const OfferContext = createContext<OfferContextData>(
    {} as OfferContextData
)

export function OfferProvider({ children }: OfferProviderProps) {
    const { '@AHO:Countdown': CountdownCookies } = parseCookies(undefined)
    const { '@AHO:Chance': ChanceCookies } = parseCookies(undefined)
    const [chance, setChance] = useState(ChanceCookies)
    const [targetDate, setTargetDate] = useState(CountdownCookies)
    const [expired, setExpired] = useState(false)
    const [checkoutLink, setCheckoutLink] = useState('')
    const [pagina, setPagina] = useState('')
    const [value, setValue] = useState(0)
    const [showElements, setShowElements] = useState(false)

    const eventId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

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
                value,
                setValue,
                showElements,
                setShowElements
            }}
        >
            {children}
        </OfferContext.Provider>
    )
}

// export function useOfferContext() {
//     const context = React.useContext(OfferContext)
//     if (context === undefined) {
//         throw new Error('useOfferContext must be used within a OfferProvider')
//     }
//     return context
// }
