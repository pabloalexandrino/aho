// import { useEffect, useState } from 'react'
// import { getLocation } from '../utils/getCity'

// interface LocationData {
//     city: string
//     region_name: string
// }

export function Geo2() {
    // const [city, setCity] = useState<string>()
    // const [region, setRegion] = useState<string>()

    // useEffect(() => {
    // async function fetchLocationData() {
    //     try {
    //         const response = await fetch('https://api.ipbase.com/v1/json/')
    //         const data: LocationData = await response.json()
    //         setCity(data.city)
    //         setRegion(data.region_name)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // getLocation()
    //     .then((city) => {
    //         setCity(city)
    //     })
    //     .catch((error) => {
    //         fetchLocationData()
    //     })
    // }, [])

    return (
        <div className="w-full p-2 text-center text-white bg-error">
            <h1>
                {/* Você e algumas pessoas de{' '}
                <span className="font-bold">{city ?? 'São Paulo'}</span> foram
                selecionadas para participar */}
                <span className="mr-2">⚠️</span>
                ASSISTA O VÍDEO ABAIXO E ENTENDA O DESAFIO DO PIX de R$1.000!
                <span className="ml-2">⚠️</span>
            </h1>
        </div>
    )
}

// import { useEffect, useState } from 'react'
// import { getLocation } from '../utils/getCity'

interface IMarquee {
    marquee?: boolean
    text?: (string | JSX.Element)[] | string
    gratitude?: boolean
}

import Marquee from 'react-fast-marquee'

export default function Geo({
    marquee = false,
    text = '⚠️ ASSISTA O VÍDEO ABAIXO E ENTENDA O DESAFIO DO PIX de R$1.000 ⚠️',
}: IMarquee): JSX.Element {
    return (
        <div className={`w-full px-4 py-2 text-white text-center bg-error`}>
            {marquee && text ? (
                <Marquee>
                    <div className="flex gap-8 mx-4">
                        <h1>{text}</h1>
                        <h1>{text}</h1>
                        <h1>{text}</h1>
                        <h1>{text}</h1>
                        <h1>{text}</h1>
                    </div>
                </Marquee>
            ) : (
                <h1>{text}</h1>
            )}
        </div>
    )
}
