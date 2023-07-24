import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { OfferProvider } from '../providers/Offer'
import '../styles/globals.css'
import { setCookies } from '../utils/useCookies'
import { ToastContainer } from 'react-toastify'
import FloatBlocks from '../components/FloatBlocks'
import { ParallaxProvider } from 'react-scroll-parallax'

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()

    if (router.asPath.includes('?') && router.asPath.includes('utm_source')) {
        const utmSource = router.asPath.split('utm_source=')[1]?.split('&')[0]
        const utmMedium = router.asPath.split('utm_medium=')[1]?.split('&')[0]
        const utmCampaign = router.asPath
            .split('utm_campaign=')[1]
            ?.split('&')[0]
        const utmContent = router.asPath.split('utm_content=')[1]?.split('&')[0]
        const utmTerm = router.asPath.split('utm_term=')[1]?.split('&')[0]
        const utm = {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            utm_content: utmContent,
            utm_term: utmTerm,
        }
        setCookies('@AHO:UTM', JSON.stringify(utm), 60 * 60 * 24 * 30)
    }

    if (router.asPath.includes('?') && router.asPath.includes('gclid=')) {
        const gclid = router.asPath.split('gclid=')[1].split('&')[0]
        setCookies('@AHO:gclid', gclid, 60 * 60 * 24 * 30)
    }

    if (router.asPath.includes('?') && router.asPath.includes('fbclid=')) {
        const fbclid = router.asPath.split('fbclid=')[1].split('&')[0]
        setCookies('@AHO:fbclid', fbclid, 60 * 60 * 24 * 30)
    }

    if (router.asPath.includes('?') && router.asPath.includes('fbp=')) {
        const fbp = router.asPath.split('fbp=')[1].split('&')[0]
        setCookies('@AHO:fbp', fbp, 60 * 60 * 24 * 30)
    }

    if (router.asPath.includes('?') && router.asPath.includes('fbc=')) {
        const fbc = router.asPath.split('fbc=')[1].split('&')[0]
        setCookies('@AHO:fbc', fbc, 60 * 60 * 24 * 30)
    }

    return (
        <>
            {/*<GoogleFonts*/}
            {/*    href='https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700;900&display=swap' />*/}
            <ThemeProvider defaultTheme='light'>
                <OfferProvider>
                    <ParallaxProvider>
                        <ToastContainer />
                        <FloatBlocks />
                        <Component {...pageProps} />
                    </ParallaxProvider>
                </OfferProvider>
            </ThemeProvider>
        </>
    )
}

export default MyApp
