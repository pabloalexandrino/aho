import Head from 'next/head'
import { SetStateAction, useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Vsl from '../components/Vsl'
import { OfferContext } from '../providers/Offer'
import fb from '../utils/fb'
import Script from 'next/script'
import Geo from '../components/Geo'
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
        instagram,
        setInstagram,
        renda,
        setRenda,
    } = useContext(OfferContext)

    useEffect(() => {
        setCheckoutLink('https://luizgregatti.youcanbook.me/')
        setClint('https://andrinno.com/api/redirect/queue/76')
        setPagina('vsl05 - AHO')
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
        renda: yup.string().required('Por favor, informe a sua renda mensal.'),
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
                { nameLead2, emailLead2, whatsappLead2, renda },
                { abortEarly: false },
            )

            const url = clint ? clint : process.env.NEXT_PUBLIC_CLINT_LEAD

            const data = {
                name: nameLead2,
                email: emailLead2,
                whatsapp: whatsappLead2,
                pagina: `${pagina}, source:${utmObj.utm_source}, medium:${utmObj.utm_medium}, campaign:${utmObj.utm_campaign}, term:${utmObj.utm_term}, content:${utmObj.utm_content}, renda:${renda}, insta:${instagram}`,
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
            className='min-h-screen bg-left-top bg-[length:100vw_100vh] bg-fixed bg-[url(/bg-white.webp)]'
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

            <div>
                <Geo
                    text={
                        '⚠️ HOJE É O ÚLTIMO DIA PARA ASSISTIR ESTE TUTORIAL! ⚠️'
                    }
                    marquee
                />
                <Navbar
                    leadRedirect={checkoutLink}
                    logo={false}
                    className='hidden'
                />
                <Vsl
                    playerComponent={'vturb'}
                    player={'65f0f845c30b6200081effc8'}
                    video={'99583553-0c7c-40d5-b819-534dcd7867b9'}
                    head={
                        <h1 className='block my-6 text-lg font-bold text-center uppercase rounded-md md:text-3xl md:leading-snug'>
                            TUTORIAL ENSINA COMO <br />
                            <span className='px-4 font-bold text-white rounded-lg bg-gradient'>
                                LUCRAR ATÉ 50 MIL REAIS POR MÊS
                            </span>{' '}
                            <br />
                            COM SUA AGÊNCIA HOME OFFICE!{' '}
                        </h1>
                    }
                >
                    <div className='z-10 max-w-md px-6 mx-auto mt-12 text-center md:max-w-3xl'>
                        <h1 className='px-2 mb-4 text-xl text-white rounded-md contents md:mb-8 md:text-3xl w-fit'>
                            Preencha seus dados abaixo e agende a sua
                            <span className='px-2 mx-2 rounded-lg bg-gradient'>
                                consultoria estratégica individual gratuita
                            </span>
                        </h1>

                        <form
                            id='formLead2'
                            className='grid gap-2 py-4 mt-8'
                            onSubmit={handleSubmitLead}
                        >
                            <input
                                type='text'
                                name='name_lead2'
                                placeholder='Nome Completo'
                                className='w-full text-black bg-white input input-bordered input-primary'
                                value={nameLead2}
                                onChange={(event) =>
                                    setNameLead2(event.target.value)
                                }
                            />
                            <input
                                type='email'
                                name='email_lead2'
                                placeholder='E-mail'
                                className='w-full text-black bg-white input input-bordered input-primary'
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
                                className='w-full text-black bg-white input input-bordered input-primary'
                                placeholder='(XX) 9XXXX-XXXX'
                            />

                            <input
                                type='text'
                                name='instagram'
                                placeholder='@seu.instagram'
                                className='w-full text-black bg-white input input-bordered input-primary'
                                value={instagram}
                                onChange={(event) =>
                                    setInstagram(event.target.value)
                                }
                            />

                            <select
                                name='renda'
                                className='w-full text-black bg-white select select-bordered select-primary'
                                onChange={(event) =>
                                    setRenda(event.target.value)
                                }
                            >
                                <option value='' selected disabled>
                                    Qual sua renda mensal ou faturamento?
                                </option>
                                <option value='Até 5k'>Até R$5.000,00</option>
                                <option value='De 5k a 10k'>
                                    De R$5.000,00 a R$10.000,00
                                </option>
                                <option value='De 10k a 25k'>
                                    De R$10.000,00 a R$25.000,00
                                </option>
                                <option value='Acima de 25k'>
                                    Acima de R$25.000,00
                                </option>
                            </select>
                        </form>

                        <button
                            form='formLead2'
                            type='submit'
                            className='btn rounded-md btn-block btn-primary bg-[#38EA99] border-0'
                            disabled={loading2}
                        >
                            {loading2 && (
                                <svg
                                    className='w-5 h-5 mr-3 -ml-1 text-white animate-spin'
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
                    {/* </HiddenElements> */}
                </Vsl>
            </div>
        </div>
    )
}
