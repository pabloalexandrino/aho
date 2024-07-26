import { SetStateAction, useContext, useEffect, useState } from 'react'
import * as yup from 'yup'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { InputMask } from '@react-input/mask'
import fb from '../utils/fb'
import { OfferContext } from '../providers/Offer'

export default function Embed() {
    const {
        eventId,
        setPagina,
        pagina,
        value,
        clint,
        setValue,
        setClint,
        setCheckoutLink,
        checkoutLink,
    } = useContext(OfferContext)

    useEffect(() => {
        // setCheckoutLink('https://luizgregatti.youcanbook.me/')
        setCheckoutLink('/thanks_aho_')
        setClint('https://andrinno.com/api/redirect/queue/76')
        setValue(4997)
    }, [setCheckoutLink, setClint, setValue])

    useEffect(() => {
        if (eventId) {
            if (process.env.NODE_ENV === 'production') {
                fb('PageView', 'PageView' + eventId).then((r) => r)
            }
        }

        const urlParams = new URLSearchParams(window.location.search)
        const tag = urlParams.get('tag') ?? ''
        setTheme(urlParams.get('theme') ?? 'dark')
        setPagina(tag)

    }, [eventId, setPagina])

    const [nameLead2, setNameLead2] = useState('')
    const [emailLead2, setEmailLead2] = useState('')
    const [whatsappLead2, setWhatsappLead2] = useState('')
    // const [instagram2, setInstagram2] = useState('')
    const [renda, setRenda] = useState('')
    const [loading2, setLoading2] = useState(false)
    const [theme, setTheme] = useState('dark')
    const schema = yup.object().shape({
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
        renda: yup.string().required('Por favor, informe a valor disposto a investir.'),
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

        window.parent.location.href =
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
            await schema.validate(
                { nameLead2, emailLead2, whatsappLead2, renda },
                { abortEarly: false },
            )

            const url = clint ? clint : process.env.NEXT_PUBLIC_CLINT_LEAD

            const data = {
                name: nameLead2,
                email: emailLead2,
                whatsapp: whatsappLead2,
                pagina: `${renda}, ${pagina}`,
                valor: value.toString(),
                investimento: renda,
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
         theme === 'dark' ? (
            <div className={'bg-black h-screen'}>
                <ToastContainer />
                <div className='w-full max-w-2xl text-left flex flex-col mx-auto'>
                    <h2 className='font-light text-white mt-4 text-xs sm:text-base'>
                        Preencha seus dados abaixo para receber a apresentação completa da <span
                        className='font-bold'>Agência de Viagens Home Office</span> ✌
                    </h2>
                    <div className='card card-compact border w-full h-fit rounded-lg my-4 md:my-12'>
                        <div className='card-body'>
                            <div className='card-title text-primary'>Inscreva-se</div>

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
                                    value={nameLead2}
                                    onChange={(event) =>
                                        setNameLead2(event.target.value)
                                    }
                                />

                                <input
                                    type='email'
                                    name='email'
                                    placeholder='E-mail'
                                    className='w-full text-black bg-white input input-bordered input-primary'
                                    value={emailLead2}
                                    onChange={(event) => setEmailLead2(event.target.value)}
                                />

                                <InputMask
                                    mask='(__) _____-____'
                                    replacement={{ _: /\d/ }}
                                    value={whatsappLead2}
                                    name='whatsapp_lead'
                                    onChange={handleInputChangeLead}
                                    className='input input-bordered w-full bg-white text-black'
                                    placeholder='(XX) 9XXXX-XXXX'
                                />

                                <div className='text-sm leading-4 text-white py-4'>
                                    Dentro da Agência Home Office você tem acesso completo a um ecossistema para
                                    criação da sua Agência de Viagens Online, contando com sistema de gestão próprio
                                    e acompanhamento personalizado.<br /><br />
                                    Já somos mais de 1.200 agências em todo Brasil que somam mais de 50 milhões de
                                    faturamento.<br /><br />
                                    Considerando a entrega proposta, qual valor você tem para investir em sua
                                    agência?
                                </div>
                                <select
                                    name='renda'
                                    className='w-full text-black bg-white select select-bordered select-primary'
                                    onChange={(event) =>
                                        setRenda(event.target.value)
                                    }
                                >
                                    <option value='' selected disabled>
                                        Valor disponível para investimento
                                    </option>
                                    <option value='de 3k a 5k'>
                                        de R$ 3.000 a R$5.000,00
                                    </option>
                                    <option value='De 5k a 8k'>
                                        De R$5.000,00 a R$8.000,00
                                    </option>
                                    <option value='De 8k a 12k'>
                                        De R$8.000,00 a R$12.000,00
                                    </option>
                                    <option value='Acima de 12k'>
                                        Acima de R$12.000,00
                                    </option>
                                </select>
                            </form>
                        </div>
                    </div>
                    <button
                        form='formLead'
                        type='submit'
                        className='btn rounded-md btn-block btn-primary border-0 animation animate-pulse hover:bg-white hover:text-primary box-glow'
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

                        Enviar
                    </button>
                </div>
            </div>
        ) : (
            <div className={'bg-white h-screen'}>
                <ToastContainer />
                <div className='w-full max-w-2xl text-left flex flex-col mx-auto'>
                    <h2 className='font-light text-black mt-4 text-xs sm:text-base'>
                        Preencha seus dados abaixo para receber a apresentação completa da <span
                        className='font-bold'>Agência de Viagens Home Office</span> ✌
                    </h2>
                    <div className='card card-compact border w-full h-fit rounded-lg my-4 md:my-12'>
                        <div className='card-body'>
                            <div className='card-title text-primary'>Inscreva-se</div>

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
                                    value={nameLead2}
                                    onChange={(event) =>
                                        setNameLead2(event.target.value)
                                    }
                                />

                                <input
                                    type='email'
                                    name='email'
                                    placeholder='E-mail'
                                    className='w-full text-black bg-white input input-bordered input-primary'
                                    value={emailLead2}
                                    onChange={(event) => setEmailLead2(event.target.value)}
                                />

                                <InputMask
                                    mask='(__) _____-____'
                                    replacement={{ _: /\d/ }}
                                    value={whatsappLead2}
                                    name='whatsapp_lead'
                                    onChange={handleInputChangeLead}
                                    className='input input-bordered w-full bg-white text-black'
                                    placeholder='(XX) 9XXXX-XXXX'
                                />

                                <div className='text-sm leading-4 text-black py-4'>
                                    Dentro da Agência Home Office você tem acesso completo a um ecossistema para
                                    criação da sua Agência de Viagens Online, contando com sistema de gestão próprio
                                    e acompanhamento personalizado.<br /><br />
                                    Já somos mais de 1.200 agências em todo Brasil que somam mais de 50 milhões de
                                    faturamento.<br /><br />
                                    Considerando a entrega proposta, qual valor você tem para investir em sua
                                    agência?
                                </div>
                                <select
                                    name='renda'
                                    className='w-full text-black bg-white select select-bordered select-primary'
                                    onChange={(event) =>
                                        setRenda(event.target.value)
                                    }
                                >
                                    <option value='' selected disabled>
                                        Valor disponível para investimento
                                    </option>
                                    <option value='de 3k a 5k'>
                                        de R$ 3.000 a R$5.000,00
                                    </option>
                                    <option value='De 5k a 8k'>
                                        De R$5.000,00 a R$8.000,00
                                    </option>
                                    <option value='De 8k a 12k'>
                                        De R$8.000,00 a R$12.000,00
                                    </option>
                                    <option value='Acima de 12k'>
                                        Acima de R$12.000,00
                                    </option>
                                </select>
                            </form>
                        </div>
                    </div>
                    <button
                        form='formLead'
                        type='submit'
                        className='btn rounded-md btn-block btn-primary border-0 animation animate-pulse hover:bg-white hover:text-primary box-glow'
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

                        Enviar
                    </button>
                </div>
            </div>
        )
    )
}
