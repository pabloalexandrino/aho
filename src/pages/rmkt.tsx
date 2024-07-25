import { SetStateAction, useContext, useEffect, useState } from 'react'
import * as yup from 'yup'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { InputMask } from '@react-input/mask'
import fb from '../utils/fb'
import { OfferContext } from '../providers/Offer'
import BlurImage from '../components/BlurImage'
import Geo from '../components/Geo'
import VTurb from '../components/Player/VTurb'
import Blur from '../components/Blur'
import FloatBlocks from '../components/FloatBlocks'

export default function Youtube() {
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
        setPagina('AHO-RMKT')
        setValue(4997)
    }, [setCheckoutLink, setClint, setPagina, setValue])

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
    }, [eventId, setUtmObj])

    const [nameLead2, setNameLead2] = useState('')
    const [emailLead2, setEmailLead2] = useState('')
    const [whatsappLead2, setWhatsappLead2] = useState('')
    // const [instagram2, setInstagram2] = useState('')
    const [renda, setRenda] = useState('')
    const [loading2, setLoading2] = useState(false)

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
        // instagram2: yup
        //     .string()
        //     .test('no-at-symbol', 'O instagram não pode conter o caractere "@"', (value) => {
        //         return !value!.includes('@')
        //     })
        //     .test('no-space', 'O instagram não pode conter espaços', (value) => {
        //         return !value!.includes(' ')
        //     })
        //     .required('Por favor, informe o seu Instagram.'),
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
            await schema.validate(
                { nameLead2, emailLead2, whatsappLead2, renda },
                { abortEarly: false },
            )

            const url = clint ? clint : process.env.NEXT_PUBLIC_CLINT_LEAD

            const data = {
                name: nameLead2,
                email: emailLead2,
                whatsapp: whatsappLead2,
                pagina: `${renda}, ${pagina}, source:${utmObj.utm_source}, medium:${utmObj.utm_medium}, campaign:${utmObj.utm_campaign}, term:${utmObj.utm_term}, content:${utmObj.utm_content}`,
                valor: value.toString(),
                investimento: renda
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
        <div className='bg-black'>
            <Geo text={'EXCLUSIVO PARA QUEM QUER EMPREENDER NO TURISMO'} marquee />
            <div style={{ backgroundPositionY: '100px' }}
                 className='grid relative bg-black bg-no-repeat bg-contain bg-[url(/luiz-green.webp)] bg-fixed bg-right-top w-full pt-8'>
                <ToastContainer />
                <div className='w-full max-w-6xl text-left justify-start flex flex-col mx-auto'>
                    {/*<div className='max-w-6xl grid relative py-2 px-6 mx-auto sm:mx-0'>*/}
                    {/*<span className='text-xs ml-3 mb-4'>*/}
                    {/*    Presente 🎁 exclusivo para você que se cadastrar ainda hoje!*/}
                    {/*</span>*/}
                    {/*<div className='flex relative'>*/}
                    {/*    <div className='h-12 mr-4 w-[1px] bg-white/20'></div>*/}
                    {/*    <div className='relative h-12 w-1/2 sm:w-[120px]'>*/}
                    {/*        <BlurImage*/}
                    {/*            layout={'responsive'}*/}
                    {/*            src='/logo.webp'*/}
                    {/*            alt='AHO'*/}
                    {/*            width='200'*/}
                    {/*            height='80'*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*</div>*/}

                    <div className='max-w-md md:max-w-2xl px-6 sm:mt-32 z-10 mb-12'>
                        <h1 className='text-white contents uppercase mb-4 md:mb-8 rounded-md text-xl md:text-3xl w-fit px-2'>
                            VAMOS TE EXPLICAR COMO VOCÊ PODE TER UMA AGÊNCIA DE VIAGENS ONLINE E LUCRAR DE
                            <span className='rounded-lg px-2 mx-2 bg-gradient text-black'>10 A 50 MIL REAIS POR MÊS
                            </span>
                        </h1>

                        {/*<iframe src='https://flyeducacional.typeform.com/to/MQWE2ro4'*/}
                        {/*        className='w-full h-[500px] mt-8'></iframe>*/}
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
                                        <option value='Até 5k'>
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
            </div>

            <div className='text-center w-full grid px-6'>
                <h2 className='text-white mt-8 text-xl md:text-2xl w-fit px-2 mx-auto'>
                    Veja um pouco dos resultados de alguns agentes
                </h2>

                <div className='grid gap-8 sm:grid-cols-4 mx-auto w-full max-w-6xl my-8 px-6'>
                    <VTurb player='661d732f6828fe00083e5f3d'
                           video='99583553-0c7c-40d5-b819-534dcd7867b9'
                           vertical
                           iframe
                    />
                    <VTurb player='661d7314de47080007edc48d'
                           video='99583553-0c7c-40d5-b819-534dcd7867b9'
                           vertical
                           iframe
                    />
                    <VTurb player='661d72ffde47080007edc48a'
                           video='99583553-0c7c-40d5-b819-534dcd7867b9'
                           vertical
                           iframe
                    />
                    <VTurb player='661d72e4163fab00084a35a4'
                           video='99583553-0c7c-40d5-b819-534dcd7867b9'
                           vertical
                           iframe
                    />
                </div>

                <section className='relative py-12 bg-black md:py-24'>
                    <Blur />
                    <FloatBlocks />

                    <div className='grid max-w-4xl gap-2 mx-auto'>
                        <div className='flex flex-col items-center gap-2 lg:flex-row'>
                            <div className='relative w-full h-96 lg:h-[500px] mb-8 lg:w-6/12'>
                                <BlurImage
                                    src='/eu_luiz.webp'
                                    alt='Luiz'
                                    layout='fill'
                                    className='object-contain'
                                />
                            </div>
                            <div className='text-justify lg:w-6/12'>
                                <h2 className='max-w-6xl mx-auto mb-6 text-lg font-bold text-white md:text-3xl'>
                                    QUEM É
                                    <span className='px-2 mx-2 text-black bg-gradient'>
                                        LUIZ GREGATTI
                                    </span>
                                </h2>
                                <p className='text-white text-md'>
                                    Empresário, palestrante e viajante
                                    profissional, já conheceu mais de 40
                                    países, possui mais de 32 mil alunos e
                                    clientes em diversos programas de
                                    acompanhamento que juntos (os alunos)
                                    colocaram no bolso mais de
                                    R$41.000.000,00 entre lucro e economia
                                    de viagens. (milhões de reais).
                                    <br />
                                    <br />
                                    Nos últimos anos Luiz acumulou mais de
                                    60 milhões de milhas e montou o ÚNICO
                                    PROGRAMA DE ACOMPANHAMENTO DO BRASIL QUE
                                    ENSINA OS SEGREDOS DOS VIAJANTES
                                    PROFISSIONAIS E AGÊNCIAS usam para
                                    economizar até 90% em suas passagens e
                                    hospedagens.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
