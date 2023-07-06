// import { useEffect, useState } from 'react'
// import { getLocation } from '../utils/getCity'

// interface LocationData {
//     city: string
//     region_name: string
// }

export default function Geo() {
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
        <div className="w-full bg-error p-2 text-white text-center">
            <h1>
                {/* Você e algumas pessoas de{' '}
                <span className="font-bold">{city ?? 'São Paulo'}</span> foram
                selecionadas para participar */}
                <span className="mr-2">⚠️</span>
                NÃO FECHE A PÁGINA! ENTENDA O DESAFIO DO PIX de R$1.000!
                <span className="ml-2">⚠️</span>
            </h1>
        </div>
    )
}
