import Head from 'next/head'
import { SetStateAction, useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Vsl from '../components/Vsl'
import { OfferContext } from '../providers/Offer'
import fb from '../utils/fb'
import Script from 'next/script'
import { HiddenElements } from '../components/Player/VTurb'
import Geo from '../components/Geo'
import { ParallaxProvider } from 'react-scroll-parallax'
import { InputMask } from '@react-input/mask'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Vsl04(): JSX.Element {
    const {
        setCheckoutLink,
        setPagina,
        eventId,
        setValue,
        checkoutLink,
        setClint,
        clint,
        pagina,
        value,
    } = useContext(OfferContext)

    useEffect(() => {
        setCheckoutLink('https://luizgregatti.youcanbook.me/')
        setClint('https://andrinno.com/api/redirect/queue/76')
        setPagina('vsl04 - AHO')
        setValue(3997)
    }, [setCheckoutLink, setClint, setPagina, setValue])

    useEffect(() => {
        if (eventId) {
            if (process.env.NODE_ENV === 'production') {
                fb('PageView', 'PageView' + eventId).then(r => r)
            }
        }
    }, [eventId])

    const [utmObj, setUtmObj] = useState({
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_term: '',
        utm_content: '',
    })

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
    })

    function handleInputChangeLead(event: {
        target: { value: SetStateAction<string> }
    }) {
        setWhatsappLead2(event.target.value)
    }

    function redirectTo() {

        if (process.env.NODE_ENV === 'production') {
            fb('Lead', 'Lead' + eventId, nameLead2, emailLead2, whatsappLead2).then(r => r)
        }
        //redirect to /wpp-youtube-obrigado

        window.location.href = checkoutLink + '?FNAME=' + nameLead2 + '&EMAIL=' + emailLead2 + '&PHONE=55' + whatsappLead2
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

            const url = clint ?? process.env.NEXT_PUBLIC_CLINT_LEAD

            const data = {
                name: nameLead2,
                email: emailLead2,
                whatsapp: whatsappLead2,
                pagina,
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
        <div className='min-h-screen bg-left-top bg-[length:100vw_100vh] bg-fixed bg-[url(/bg-white.webp)]'
             data-theme={'dark'}>
            <Head>
                <title>Agência Home Office - Sua agência de viagens online</title>
            </Head>
            {process.env.NODE_ENV === 'production' && (
                <>
                    <Script id='facebook-pixel-page' strategy='afterInteractive'>
                        {`
                            fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                            fbq('track', 'PageView', {}, {eventID: '${'PageView' + eventId}'});
                        `}
                    </Script>
                </>
            )}

            <ParallaxProvider>
                <Geo />
                <Navbar leadRedirect={checkoutLink} logo={false} className='hidden' />
                <Vsl playerComponent={'vturb'}
                     player={'65b3ad755a96190009b25940'}
                     video={'99583553-0c7c-40d5-b819-534dcd7867b9'}>

                    <HiddenElements seconds='230'>
                        {/*<iframe*/}
                        {/*    src='https://bot.funnelhub.io/aho-vsl'*/}
                        {/*    className='border-0 w-full h-[666px]'*/}
                        {/*></iframe>*/}
                        <div className='max-w-md md:max-w-3xl mx-auto px-6 mt-12 z-10 text-center'>
                            <h1 className='text-white contents mb-4 md:mb-8 rounded-md text-xl md:text-3xl w-fit px-2'>
                                Preencha seus dados abaixo e agende a sua
                                <span className='rounded-lg px-2 mx-2 bg-gradient'>
                                    consultoria estratégica individual gratuita
                                </span>
                            </h1>

                            <form
                                id='formLead2'
                                className='py-4 grid gap-2 mt-8'
                                onSubmit={handleSubmitLead}
                            >
                                <input
                                    type='text'
                                    name='name_lead2'
                                    placeholder='Nome Completo'
                                    className='input input-bordered input-primary w-full bg-white text-black'
                                    value={nameLead2}
                                    onChange={(event) =>
                                        setNameLead2(event.target.value)
                                    }
                                />
                                <input
                                    type='email'
                                    name='email_lead2'
                                    placeholder='E-mail'
                                    className='input input-bordered input-primary w-full bg-white text-black'
                                    value={emailLead2}
                                    onChange={(event) =>
                                        setEmailLead2(event.target.value)
                                    }
                                />

                                <InputMask
                                    mask='(__) _____-____'
                                    replacement={{ _: /\d/ }}
                                    value={whatsappLead2}
                                    name='whatsapp_lead2'
                                    onChange={handleInputChangeLead}
                                    className='input input-bordered input-primary w-full bg-white text-black'
                                    placeholder='(XX) 9XXXX-XXXX'
                                />
                            </form>

                            <button
                                form='formLead2'
                                type='submit'
                                className='btn rounded-md btn-block btn-primary bg-[#38EA99] border-0 font-light'
                                disabled={loading2}
                            >
                                {loading2 && (
                                    <svg
                                        className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                    >
                                        <circle
                                            className='opacity-25'
                                            cx='12'
                                            cy='12'
                                            r='10'
                                            stroke='currentColor'
                                            strokeWidth='4'
                                        ></circle>
                                        <path
                                            className='opacity-75'
                                            fill='currentColor'
                                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                        ></path>
                                    </svg>
                                )}

                                Fazer inscrição gratuitamente
                            </button>
                        </div>
                    </HiddenElements>
                </Vsl>
            </ParallaxProvider>
        </div>
    )
}
