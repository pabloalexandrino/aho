export async function getLocation() {
    const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    }

    function success(pos: GeolocationPosition) {
        const crd = pos.coords
        const lat = crd.latitude.toString()
        const lng = crd.longitude.toString()
        const coordinates: [string, string] = [lat, lng]
        return city(coordinates)
    }

    function error(err: GeolocationPositionError) {
        console.warn(`ERROR(${err.code}): ${err.message}`)
        return `ERROR(${err.code}): ${err.message}`
    }

    const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, options)
        }
    )

    return await city([
        position.coords.latitude.toString(),
        position.coords.longitude.toString(),
    ])
}

async function city(coordinates: [string, string]): Promise<string> {
    const lat = coordinates[0]
    const lng = coordinates[1]
    const token = process.env.NEXT_PUBLIC_LOCATIONIQ_TOKEN
    const url = `https://us1.locationiq.com/v1/reverse.php?key=${token}&lat=${lat}&lon=${lng}&format=json`

    const response = await fetch(url)
    const data = await response.json()

    return data.address.city
}
