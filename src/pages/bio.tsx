import { SetStateAction, useContext, useEffect, useState } from 'react'
import * as yup from 'yup'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { InputMask } from '@react-input/mask'
import fb from '../utils/fb'
import { OfferContext } from '../providers/Offer'

export default function Bio() {
    const [nameLead, setNameLead] = useState('')
    const [emailLead, setEmailLead] = useState('')
    const [whatsappLead, setWhatsappLead] = useState('')
    const [loading, setLoading] = useState(false)
    const [utmObj, setUtmObj] = useState({
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_term: '',
        utm_content: '',
    })
    const {
        eventId,
        setPagina,
        pagina,
        value,
        setValue,
    } = useContext(OfferContext)

    useEffect(() => {
        setPagina('youtube - RCM')
    }, [setPagina])

    useEffect(() => {
        setValue(497)
    }, [setValue])


    useEffect(() => {
        //get cookies
        const utm = document.cookie.match(
            new RegExp('(?:^|; )@RCM:UTM=([^;]*)'),
        )

        try {
            if (utm) {
                setUtmObj(JSON.parse(decodeURIComponent(utm[1])))
            }
        } catch (error) {
            console.error(error)
        }
    }, [])

    const schema = yup.object().shape({
        nameLead: yup.string().required('Por favor, informe o seu nome.'),
        emailLead: yup
            .string()
            .email('Por favor, informe um e-mail válido.')
            .required('Por favor, informe o seu e-mail.'),
        whatsappLead: yup
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
        setWhatsappLead(event.target.value)
    }

    function redirectTo() {

        if (process.env.NODE_ENV === 'production') {
            fb('Lead', 'Lead' + eventId, nameLead, emailLead, whatsappLead)
        }
        //redirect to /wpp-youtube-obrigado
        window.location.href = '/wpp-youtube-obrigado'
        setLoading(false)
    }

    const handleSubmitLead = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        setLoading(true)
        try {
            // Validação dos dados do formulário
            await schema.validate(
                { nameLead, emailLead, whatsappLead },
                { abortEarly: false },
            )

            if (process.env.NEXT_PUBLIC_CLINT_LEAD_YOUTUBE) {
                const data = {
                    name: nameLead,
                    email: emailLead,
                    whatsapp: whatsappLead,
                    pagina,
                    valor: value.toString(),
                }
                await fetch(
                    process.env.NEXT_PUBLIC_CLINT_LEAD_YOUTUBE + '?' +
                    new URLSearchParams(data),
                )
            }

            const source = utmObj.utm_source || ''
            const medium = utmObj.utm_medium || ''
            const campaign = utmObj.utm_campaign || ''
            const term = utmObj.utm_term || ''
            const content = utmObj.utm_content || ''

            //Graditude.Digital
            const res = await fetch('https://sistema.gratitude.digital/fly/cron/assessLeads.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameLead,
                    email: emailLead,
                    'phone': whatsappLead,
                    source,
                    medium,
                    campaign,
                    term,
                    content,
                }),
            })

            //BREVO
            await fetch('/api/mailingList', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: nameLead,
                    email: emailLead,
                    whatsapp: whatsappLead,
                    pagina: 'youtube',
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
                setLoading(false)
            } else {
                console.error(error)
                setLoading(false)
                redirectTo()
            }
        }
    }

    return (
        <div
            className='flex h-screen bg-black bg-no-repeat bg-contain bg-[url(/luiz.webp)] bg-fixed bg-right-top w-full'>
            <div className='flex gap-12 flex-col w-full max-w-md md:max-w-4xl md:pl-16 absolute z-10'>
                {/*<div className='relative h-16 ml-2 w-full'>*/}
                {/*    <BlurImage*/}
                {/*        layout={'fill'}*/}
                {/*        src='/logo-youtube.svg'*/}
                {/*        alt='Youtube'*/}
                {/*        className='object-contain object-left-top'*/}
                {/*    />*/}
                {/*</div>*/}

                {/*<div className='relative ml-4 h-12 w-full'>*/}
                {/*    <BlurImage*/}
                {/*        layout={'fill'}*/}
                {/*        src='/logo.webp'*/}
                {/*        alt='AHO'*/}
                {/*        className='object-contain object-left-top'*/}
                {/*    />*/}
                {/*</div>*/}
            </div>
            <ToastContainer />
            <div className='max-w-md md:max-w-4xl px-6 mt-64 md:pl-24 sm:mt-48 absolute z-10'>
                <h1 className='text-white contents uppercase mb-4 md:mb-8 rounded-md text-xl md:text-4xl w-fit px-2'>
                    COMO LUCRAR
                    <span className='rounded-lg px-2 mx-2 bg-gradient'>
                        DE 10 A 50 MIL REAIS POR MÊS
                    </span>(OU MAIS) COM SUA AGÊNCIA DE VIAGENS HOME OFFICE!
                </h1>
                <h2 className='font-light text-white mt-8'>
                    Mesmo sendo iniciante em milhas e sem conhecimento em turismo.
                </h2>
                <div className='card card-compact border w-full h-fit rounded-lg my-4 md:my-12'>
                    <div className='card-body'>
                        <div className='card-title text-error'>Inscreva-se</div>

                        <form
                            id='formLead'
                            className='py-4 grid gap-2'
                            onSubmit={handleSubmitLead}
                        >
                            <input
                                type='text'
                                name='name_lead'
                                placeholder='Nome Completo'
                                className='input input-bordered w-full bg-white text-black'
                                value={nameLead}
                                onChange={(event) =>
                                    setNameLead(event.target.value)
                                }
                            />

                            <InputMask
                                mask='(__) _____-____'
                                replacement={{ _: /\d/ }}
                                value={whatsappLead}
                                name='whatsapp_lead'
                                onChange={handleInputChangeLead}
                                className='input input-bordered w-full bg-white text-black'
                                placeholder='(XX) 9XXXX-XXXX'
                            />
                        </form>
                    </div>
                </div>
                <button
                    form='formLead'
                    type='submit'
                    className='btn rounded-md btn-block btn-error border-0'
                    disabled={loading}
                >
                    {loading && (
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
            <div className='relative self-end w-full h-full'>
                {/*<BlurImage*/}
                {/*    layout={'fill'}*/}
                {/*    src='/luiz.webp'*/}
                {/*    alt='Luiz'*/}
                {/*    className='object-contain sm:object-right-bottom object-top'*/}
                {/*/>*/}
            </div>
        </div>
    )
}
