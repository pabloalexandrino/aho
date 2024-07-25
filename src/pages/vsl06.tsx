import Head from 'next/head'
import { SetStateAction, useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Vsl from '../components/Vsl'
import { OfferContext } from '../providers/Offer'
import fb from '../utils/fb'
import Script from 'next/script'
import VTurb from '../components/Player/VTurb'
import Geo from '../components/Geo'
import { ParallaxProvider } from 'react-scroll-parallax'
import { InputMask } from '@react-input/mask'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BlurImage from '../components/BlurImage'
import Blur from '../components/Blur'
import FloatBlocks from '../components/FloatBlocks'
import Footer from '../components/Footer'
import CallToAction from '../components/CallToAction'
import Warranty from '../components/Warranty'

export default function Vsl05(): JSX.Element {
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
        // instagram,
        // setInstagram,
    } = useContext(OfferContext)

    useEffect(() => {
        setCheckoutLink('/thanks_aho_')
        setClint('https://andrinno.com/api/redirect/queue/76')
        setPagina('vsl06 - AHO')
        setValue(4997)
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
    const [renda, setRenda] = useState('')
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
        renda: yup.string().required('Por favor, informe a valor disposto a investir.'),
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
                pagina: `${renda}, ${pagina}, source:${utmObj.utm_source}, medium:${utmObj.utm_medium}, campaign:${utmObj.utm_campaign}, term:${utmObj.utm_term}, content:${utmObj.utm_content}`,
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

            <ParallaxProvider>
                <Geo text={'SEU NEGÓCIO ONLINE ESTÁ NO TUTORIAL ABAIXO 👇'} />
                <Navbar
                    leadRedirect={checkoutLink}
                    logo={false}
                    className='hidden'
                />
                <div className='min-h-screen md:h-auto bg-gradient-to-tl from-gray-700 via-gray-900 to-black'>
                    <Vsl
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
                    >

                        {/*<iframe src='https://flyeducacional.typeform.com/to/tZP5WTL0'*/}
                        {/*        className='w-full h-[500px]'></iframe>*/}

                        <div className='z-10 max-w-md px-6 mx-auto mt-12 text-center md:max-w-3xl'>
                            <h1 className='px-2 mb-4 text-xl text-white rounded-md contents md:mb-8 md:text-3xl w-fit'>
                                Preencha seus dados abaixo e agende a sua
                                <span className='px-2 mx-2 rounded-lg bg-gradient'>
                                        consultoria estratégica individual
                                        gratuita
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

                                {/*<input*/}
                                {/*    type='text'*/}
                                {/*    name='instagram'*/}
                                {/*    placeholder='@seu.instagram'*/}
                                {/*    className='w-full text-black bg-white input input-bordered input-primary'*/}
                                {/*    value={instagram}*/}
                                {/*    onChange={(event) =>*/}
                                {/*        setInstagram(event.target.value)*/}
                                {/*    }*/}
                                {/*/>*/}

                                <div className='text-sm leading-4 text-white py-4 text-left'>
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

                            <button
                                form='formLead2'
                                type='submit'
                                className='font-bold border-0 rounded-md btn btn-block btn-primary'
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
                    </Vsl>
                </div>

                <section
                    className='relative mx-auto py-12 px-6 bg-gradient-to-tl from-gray-700 via-gray-900 to-black text-white'>
                    <Blur direction='right' />
                    <h2 className='font-bold uppercase text-center text-2xl md:text-3xl max-w-4xl mx-auto'>
                        Como funciona o Viajaflux:
                    </h2>
                    <h3 className='text-center my-6'>
                        O Dashboard Organizacional que coloca ainda mais <span
                        className='text-white bg-gradient rounded-lg px-2'>Dinheiro no seu bolso!</span>
                    </h3>

                    <div className='aspect-video box-red-glow container max-w-3xl mx-auto'>
                        <VTurb player={'64b7565fe891af000a1d8ac9'} video={'99583553-0c7c-40d5-b819-534dcd7867b9'}
                               iframe />
                    </div>

                    <h3 className='text-center container mx-auto max-w-2xl my-12 font-semibold'>
                        O ViajaFlux é uma plataforma única para controlar toda sua agência online, possibilitando
                        visualizar:
                    </h3>

                    <div className='relative h-52 sm:h-96'>
                        <BlurImage src='/circulo.svg' layout={'fill'} className='object-contain'
                                   alt='Ecossistema ViajaFlux' />
                    </div>

                    <h3 className='text-center container mx-auto max-w-2xl my-12 font-semibold'>
                        Literalmente tudo o que você precisa para ter seu negócio online faturando alto, com lucro e
                        liberdade!
                    </h3>

                    <div className='mt-8'>{<CallToAction />}</div>
                </section>


                <div className='relative px-6 py-12 text-center bg-black'>
                    <Blur />
                    <FloatBlocks />
                    <div className='max-w-5xl mx-auto'>
                        <h1 className='px-2 mb-4 text-xl text-white rounded-md contents md:mb-8 md:text-3xl w-fit'>
                            Você pode ser o próximo a receber essas placas
                            no palco!
                        </h1>

                        <div className='grid gap-4 mt-12 md:grid-cols-3'>
                            <div className='relative hover:z-10 h-[400px] box-red-glow rounded-xl'>
                                <BlurImage
                                    src='/placas/1.webp'
                                    alt='Depoimento 1'
                                    layout='fill'
                                    className='object-cover shadow-lg rounded-xl'
                                />
                            </div>
                            <div className='relative hover:z-10 h-[400px] box-red-glow rounded-xl'>
                                <BlurImage
                                    src='/placas/2.webp'
                                    alt='Depoimento 2'
                                    layout='fill'
                                    className='object-cover shadow-lg rounded-xl'
                                />
                            </div>
                            <div className='relative hover:z-10 h-[400px] box-red-glow rounded-xl'>
                                <BlurImage
                                    src='/placas/3.webp'
                                    alt='Depoimento 3'
                                    layout='fill'
                                    className='object-cover shadow-lg rounded-xl'
                                />
                            </div>
                            <div className='relative hover:z-10 h-[400px] box-red-glow rounded-xl'>
                                <BlurImage
                                    src='/placas/4.webp'
                                    alt='Depoimento 4'
                                    layout='fill'
                                    className='object-cover shadow-lg rounded-xl'
                                />
                            </div>
                            <div className='relative hover:z-10 h-[400px] box-red-glow rounded-xl'>
                                <BlurImage
                                    src='/placas/5.webp'
                                    alt='Depoimento 5'
                                    layout='fill'
                                    className='object-cover shadow-lg rounded-xl'
                                />
                            </div>
                            <div className='relative hover:z-10 h-[400px] box-red-glow rounded-xl'>
                                <BlurImage
                                    src='/placas/6.webp'
                                    alt='Depoimento 6'
                                    layout='fill'
                                    className='object-cover shadow-lg rounded-xl'
                                />
                            </div>
                        </div>
                        <a
                            href='#formLead2'
                            className='mt-12 mb-6 font-bold border-0 rounded-md btn btn-block btn-primary animate-pulse'
                        >
                            Fazer inscrição gratuitamente
                        </a>
                    </div>
                </div>

                <div
                    className='relative px-6 py-12 mx-auto text-center bg-gradient-to-tl from-gray-700 via-gray-900 to-black'>
                    <Blur />
                    <FloatBlocks />
                    <div className='max-w-5xl mx-auto'>
                        <h1 className='px-2 mb-4 text-xl text-white rounded-md contents md:mb-8 md:text-3xl w-fit'>
                            Seus próximos
                            <span className='px-2 mx-2 rounded-lg bg-gradient'>
                                    10, 20, 30 mil reais de lucro (ou mais)
                                </span>{' '}
                            estão na nossa consultoria gratuita
                        </h1>
                        <div className='grid gap-8 mt-12 sm:grid-cols-3'>
                            <VTurb
                                player='64b751480373240009920668'
                                video='99583553-0c7c-40d5-b819-534dcd7867b9'
                                vertical
                                iframe
                            />
                            <VTurb
                                player='64b75144e891af000a1d8a7b'
                                video='99583553-0c7c-40d5-b819-534dcd7867b9'
                                vertical
                                iframe
                            />
                            <VTurb
                                player='64b7513fd66489000873f167'
                                video='99583553-0c7c-40d5-b819-534dcd7867b9'
                                vertical
                                iframe
                            />
                        </div>
                        <a
                            href='#formLead2'
                            className='mt-12 mb-6 font-bold border-0 rounded-md btn btn-block btn-primary animate-pulse'
                        >
                            Fazer inscrição gratuitamente
                        </a>
                    </div>
                </div>

                <section className='relative mx-auto py-12 px-6'>
                    <h2 className='font-bold text-black text-center text-2xl md:text-3xl max-w-5xl mx-auto'>
                        SOMOS OS ÚNICOS NO BRASIL!
                    </h2>
                    <span className='block text-center mb-4 font-bold text-lg'>365 DIAS PARA TESTAR</span>
                    <h3 className=' text-center font-semibold animate-pulse bg-warning w-fit text-black mx-auto text-sm sm:text-md md:text-lg leading-normal mb-16'>
                        <span className='mr-2'>⚠️</span>
                        Registrada em cartório [RISCO ZERO]
                        <span className='ml-2'>⚠️</span>
                    </h3>

                    <Warranty />

                    <div className='grid text-center gap-8 max-w-xl mx-auto mt-12 mb-8 md:mt-32'>
                        <div
                            className='text-xl md:text-2xl w-fit mx-auto p-4 border-warning border rounded-xl bg-warning animate-pulse'>
                            <span className='text-5xl'>😱</span>
                            <br />
                            Você não entendeu errado. <br />
                            <strong>SEU RISCO AQUI É ZERO</strong>
                        </div>
                    </div>
                    {<CallToAction />}

                    <div className='w-full border-b-4 my-10 border-dashed border-black'></div>

                    <h1 className='md:text-center uppercase my-6 rounded-md text-xl md:text-3xl md:leading-snug font-bold text-center w-full inline-grid sm:block'
                    >
                        Para quem é a <span
                        className='text-white bg-gradient font-bold rounded-lg px-4'>AGÊNCIA HOME OFFICE?</span>
                    </h1>

                    <h2 className='font-semibold text-center mt-6'>⚠️ A AHO não é um cursinho de agência, é um modelo de
                        negócio validado. ⚠️</h2>

                    <div className='grid gap-3 mt-4 max-w-3xl mx-auto'>
                        <div className='relative hover:z-10 bg-gradient rounded-3xl text-white p-4'>
                            <div className='font-bold'>A A.H.O funciona para mim que já tenho um emprego?</div>
                            <span className='text-sm leading-tight flex'>Sim, 90% das pessoas que entram na AHO, tem emprego formal ou outro negócio. Começam em paralelo e quando a agência toma forma e faturamento você decide sobre a transição de carreira ou tocar os 2 juntos.</span>
                        </div>

                        <div className='relative hover:z-10 bg-gradient rounded-3xl text-white p-4'>
                            <div className='font-bold'>Posso começar na A.H.O mesmo sem ter CNPJ?</div>
                            <span className='text-sm leading-tight flex'>Sim, boa parte de quem entra na AHO, cria o CNPJ depois de entender os conceitos e criar os primeiros resultados ainda sendo CPF. Temos um time contábil parceiro para te ajudar na abertura da sua Empresa.</span>
                        </div>

                        <div className='relative hover:z-10 bg-gradient rounded-3xl text-white p-4'>
                            <div className='font-bold'>Preciso ter muito fluxo de caixa? Quanto mais ou menos preciso
                                para
                                começar?
                            </div>
                            <span className='text-sm leading-tight flex'>Na verdade a proposta que temos é bem diferente. Nas primeiras semanas o nosso intuito é fazer você gerar lucro nas suas primeiras vendas. Lucro esse de 1, 2, 3 mil reais, isso é equivalente a 3, 5, 10x mais o valor que você paga por mês (caso opte em entrar no formato parcelado) para entrar na AHO.</span>
                        </div>
                    </div>

                    <div className='font-semibold text-center my-8'>Costumamos dizer que os seus primeiros clientes são
                        quem <span
                            className='font-bold'>&quot;financiam&quot;</span> o seu
                        negócio
                    </div>

                    {<CallToAction />}
                </section>

                <section className='relative px-8 py-12 bg-black md:py-24'>
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

                    <Footer />
                </section>

            </ParallaxProvider>
        </div>
    )
}
