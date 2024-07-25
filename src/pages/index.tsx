import Head from 'next/head'
import { SetStateAction, useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Vsl from '../components/Vsl'
import { OfferContext } from '../providers/Offer'
import fb from '../utils/fb'
import Script from 'next/script'
import Geo from '../components/Geo'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BlockedPage from '../components/BlockedPage'
import { ParallaxProvider } from 'react-scroll-parallax'

export default function Index(): JSX.Element {
    const {
        setCheckoutLink,
        setPagina,
        eventId,
        setValue,
        showElements,
        checkoutLink,
        setClint,
        clint,
        pagina,
        value,
    } = useContext(OfferContext)

    useEffect(() => {
        setCheckoutLink('https://luizgregatti.youcanbook.me/')
        setClint('https://andrinno.com/api/redirect/queue/76')
        setPagina('site - AHO')
        setValue(5997)
    }, [setCheckoutLink, setClint, setPagina, setValue])

    const [utmObj, setUtmObj] = useState({
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_term: '',
        utm_content: '',
    })

    useEffect(() => {
        if (eventId) {
            if (process.env.NODE_ENV === 'production') {
                fb('PageView', 'PageView' + eventId).then((r) => r)
            }
        }

        const urlParams = new URLSearchParams(window.location.search)
        setUtmObj({
            utm_source: urlParams.get('utm_source') || '',
            utm_medium: urlParams.get('utm_medium') || '',
            utm_campaign: urlParams.get('utm_campaign') || '',
            utm_term: urlParams.get('utm_term') || '',
            utm_content: urlParams.get('utm_content') || '',
        })
    }, [eventId])

    const [nameLead2, setNameLead2] = useState('')
    const [emailLead2, setEmailLead2] = useState('')
    const [whatsappLead2, setWhatsappLead2] = useState('')
    const [loading2, setLoading2] = useState(false)

    const schema2 = yup.object().shape({
        nameLead2: yup.string().required('Por favor, informe o seu nome.'),
        emailLead2: yup
            .string()
            .email('Por favor, informe um e-mail válido.')
            .required('Por favor, informe o seu e-mail.'),
        whatsappLead2: yup
            .string()
            .required('Por favor, informe o seu número de telefone.')
            .matches(
                /^\(\d{2}\) \d{5}-\d{4}$/,
                'Por favor, informe um número de telefone válido (exemplo: (99) 99999-9999).',
            ),
        // renda: yup.string().required('Por favor, informe a sua renda mensal.'),
    })

    function handleInputChangeLead(event: {
        target: { value: SetStateAction<string> }
    }) {
        setWhatsappLead2(event.target.value)
    }

    function redirectTo() {
        if (process.env.NODE_ENV === 'production') {
            fb(
                'Lead',
                'Lead' + eventId,
                nameLead2,
                emailLead2,
                whatsappLead2,
            ).then((r) => r)
        }
        //redirect to /wpp-youtube-obrigado

        window.location.href =
            checkoutLink +
            '?FNAME=' +
            nameLead2 +
            '&EMAIL=' +
            emailLead2 +
            '&PHONE=55' +
            whatsappLead2
        setLoading2(false)
    }

    const handleSubmitLead = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        setLoading2(true)
        try {
            // Validação dos dados do formulário
            await schema2.validate(
                { nameLead2, emailLead2, whatsappLead2 },
                { abortEarly: false },
            )

            const url = clint ? clint : process.env.NEXT_PUBLIC_CLINT_LEAD

            const data = {
                name: nameLead2,
                email: emailLead2,
                whatsapp: whatsappLead2,
                pagina: `${pagina}, source:${utmObj.utm_source}, medium:${utmObj.utm_medium}, campaign:${utmObj.utm_campaign}, term:${utmObj.utm_term}, content:${utmObj.utm_content}`,
                valor: value.toString(),
            }
            await fetch(url + '?' + new URLSearchParams(data))

            //BREVO
            await fetch('/api/mailingList', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: nameLead2,
                    email: emailLead2,
                    whatsapp: whatsappLead2,
                    pagina,
                }),
            })
            redirectTo()
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const validationErrors = error.inner.map(
                    (error) => error.message,
                )
                validationErrors.forEach((message) => {
                    toast.error(message)
                })
                setLoading2(false)
            } else {
                console.error(error)
                setLoading2(false)
                redirectTo()
            }
        }
    }

    return (
        <div
            className='min-h-screen bg-left-top bg-[length:100vw_100vh] bg-fixed bg-[url(/bg-white.webp)] bg-base-100'
            data-theme={'dark'}
        >
            <Head>
                <title>
                    Agência Home Office - Sua agência de viagens online
                </title>
            </Head>
            {process.env.NODE_ENV === 'production' && (
                <>
                    <Script
                        id='facebook-pixel-page'
                        strategy='afterInteractive'
                    >
                        {`
                            fbq('init', '${
                            process.env.NEXT_PUBLIC_FB_PIXEL_ID
                        }');
                            fbq('track', 'PageView', {}, {eventID: '${
                            'PageView' + eventId
                        }'});
                        `}
                    </Script>
                </>
            )}

            <ParallaxProvider>
                <Geo
                    text={'SEU NEGÓCIO ONLINE ESTÁ NO TUTORIAL ABAIXO 👇'}
                    marquee
                />
                <Navbar
                    leadRedirect={checkoutLink}
                    logo={false}
                    className='hidden'
                />

                <Vsl
                    showButton={showElements}
                    playerComponent={'vturb'}
                    player={'65f0f845c30b6200081effc8'}
                    video={'99583553-0c7c-40d5-b819-534dcd7867b9'}
                    head={
                        <>
                            <h1 className='inline-block my-6 text-xl font-bold text-center uppercase rounded-md md:text-3xl md:leading-snug'>
                                Tutorial ensina como lucrar de{' '}
                                <br className='sm:hidden' />
                                <span className='px-4 font-bold text-white rounded-lg bg-gradient'>
                                        10 a 50 mil reais por mês
                                    </span>{' '}
                                <br className='sm:hidden' /> (ou mais) com
                                sua Agência de Viagens Home Office!
                            </h1>
                            <div className='text-lg text-center text-white'>
                                Assista até o final e garanta sua
                                consultoria gratuita.
                            </div>
                        </>
                    }
                />

                {/*<HiddenElements seconds="0">*/}
                <BlockedPage url={checkoutLink} />
                {/*</HiddenElements>*/}
            </ParallaxProvider>
        </div>
    )
}
