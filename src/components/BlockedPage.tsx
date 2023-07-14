import { parseCookies } from 'nookies'
import { useContext, useEffect, useState } from 'react'
import { OfferContext } from '../providers/Offer'
import { setCookies } from '../utils/useCookies'
import Blur from './Blur'
import BlurImage from './BlurImage'
import CallToAction from './CallToAction'
import Countdown from './CountDown'
import Divider from './Divider'
import FloatBlocks from './FloatBlocks'
import Footer from './Footer'
import MockupIphone from './MockupIphone'
import Money from './Money'
import Panda from './Player/Panda'
import Warranty from './Warranty'
import VTurb from './Player/VTurb'

interface BlockedProps {
    show?: boolean
    offer?: {
        price: string
        installment: string
        discount: string
    }
}

export default function BlockedPage({ show = true, offer }: BlockedProps) {
    const [clientWindowHeight, setClientWindowHeight] = useState(0)
    const [isCountdownVisible, setIsCountdownVisible] = useState(false)
    const { targetDate, setTargetDate, expired } = useContext(OfferContext)
    const { '@AHO:Countdown': CountdownCookies } = parseCookies(undefined)

    const handleScroll = () => {
        setClientWindowHeight(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        if (clientWindowHeight > 15500 && !isCountdownVisible) {
            const target = new Date().setMinutes(
                new Date().getMinutes() +
                parseInt(process.env.NEXT_PUBLIC_TIME_1 ?? '0'),
            )
            if (!CountdownCookies) {
                setIsCountdownVisible(true)
                setTargetDate(target.toString())
                setCookies('@AHO:Countdown', target, 60 * 60 * 24 * 7)
            }
        }
    }, [
        clientWindowHeight,
        isCountdownVisible,
        targetDate,
        CountdownCookies,
        setTargetDate,
    ])

    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        setIsReady(true)
    }, [])

    if (!isReady) {
        return null
    }
    return show ? (
        <>
            <label
                htmlFor='lead'
                className='animate-bounce fixed h-16 w-16 bottom-6 left-6 z-50 cursor-pointer'
            >
                <BlurImage
                    layout='fill'
                    src='/whatsapp.webp'
                    alt='Whatsapp'
                    className='rounded-xl w-full h-full object-contain'
                />
            </label>
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
                    <VTurb player={'64a407bb2e6fd10009827d12'} video={'99583553-0c7c-40d5-b819-534dcd7867b9'} iframe />
                </div>

                <h3 className='text-center container mx-auto max-w-2xl my-12 font-semibold'>
                    O ViajaFlux é uma plataforma única para controlar toda sua agência online, possibilitando
                    visualizar:
                </h3>

                <div className='relative h-52 sm:h-96'>
                    <BlurImage src='/circulo.webp' layout={'fill'} className='object-contain' />
                </div>

                <h3 className='text-center container mx-auto max-w-2xl my-12 font-semibold'>
                    Literalmente tudo o que você precisa para ter seu negócio online faturando alto, com liberdade e
                    lucro!
                </h3>

                <div className='mt-8'>{offer && <CallToAction />}</div>
            </section>

            <section
                className='relative mx-auto py-12 px-6 bg-gradient-to-tl from-rose-600 via-red-900 to-red-950 text-white'>
                <div className='absolute h-72 w-72 -left-16 top-0'>
                    <BlurImage src='/aho.png' layout={'fill'} className='object-contain' />
                </div>
                <div className='container mx-auto max-w-5xl mb-12'>
                    <div className='grid gap-8'>
                        <div>
                            <h2 className='font-bold text-center text-2xl md:text-3xl mx-auto mb-8'>
                                SÃO MAIS DE 800 AGÊNCIAS ESPALHADAS POR BRASIL E MUNDO!
                            </h2>
                        </div>
                    </div>
                    <div className='grid gap-8 sm:grid-cols-3'>
                        <VTurb player='64a4147a01f8d3000957d175'
                               video='99583553-0c7c-40d5-b819-534dcd7867b9'
                               vertical
                               iframe
                        />
                        <VTurb player='64a4141c898cc800097ae2f5'
                               video='99583553-0c7c-40d5-b819-534dcd7867b9'
                               vertical
                               iframe
                        />
                        <VTurb player='64a4142ff6efcf00093d26a6'
                               video='99583553-0c7c-40d5-b819-534dcd7867b9'
                               vertical
                               iframe
                        />
                    </div>
                    <p className='max-w-xl mx-auto my-6 text-center'>
                        Pessoas com condições parecidas ou até <span className='font-bold'>piores</span> que a sua,
                        mudando de realidade com a <span className='font-bold'>missão 20k!</span>
                    </p>

                    <div className='mt-8'>{offer && <CallToAction />}</div>

                    <p className='max-w-xl text-lg mx-auto mt-12 mb-6 text-center font-bold'>
                        Pessoas mudando de<span className='font-black'> realidade com a AHO.</span>
                    </p>

                    <div className='grid gap-4 md:grid-cols-3'>
                        <div className='relative hover:z-10 h-[490px] box-red-glow rounded-xl'>
                            <BlurImage
                                src='/depoimentos/1.webp'
                                alt='Depoimento 1'
                                layout='fill'
                                className='object-cover rounded-xl shadow-lg'
                            />
                        </div>
                        <div className='relative hover:z-10 h-[490px] box-red-glow rounded-xl'>
                            <BlurImage
                                src='/depoimentos/2.webp'
                                alt='Depoimento 2'
                                layout='fill'
                                className='object-cover rounded-xl shadow-lg'
                            />
                        </div>
                        <div className='relative hover:z-10 h-[490px] box-red-glow rounded-xl'>
                            <BlurImage
                                src='/depoimentos/3.webp'
                                alt='Depoimento 3'
                                layout='fill'
                                className='object-cover rounded-xl shadow-lg'
                            />
                        </div>
                        <div className='relative hover:z-10 h-[490px] box-red-glow rounded-xl'>
                            <BlurImage
                                src='/depoimentos/4.webp'
                                alt='Depoimento 4'
                                layout='fill'
                                className='object-cover rounded-xl shadow-lg'
                            />
                        </div>
                        <div className='relative hover:z-10 h-[490px] box-red-glow rounded-xl'>
                            <BlurImage
                                src='/depoimentos/5.webp'
                                alt='Depoimento 5'
                                layout='fill'
                                className='object-cover rounded-xl shadow-lg'
                            />
                        </div>
                        <div className='relative hover:z-10 h-[490px] box-red-glow rounded-xl'>
                            <BlurImage
                                src='/depoimentos/6.webp'
                                alt='Depoimento 6'
                                layout='fill'
                                className='object-cover rounded-xl shadow-lg'
                            />
                        </div>
                    </div>
                </div>
                {offer && <CallToAction />}
            </section>


            <section className='relative mx-auto py-12 sm:py-24 px-6 bg-[url(/bg-2.webp)] bg-cover bg-fixed'>
                <h2 className='font-bold text-black text-center text-2xl md:text-3xl max-w-5xl mx-auto'>
                    <span className='bg-primary'>
                        SOMOS OS ÚNICOS NO BRASIL!
                    </span>
                    <br />
                    <span>GARANTIA CONDICIONAL DE 1 ANO.</span>
                </h2>
                <h3 className=' text-center font-bold animate-pulse bg-warning w-fit text-black mx-auto text-sm sm:text-md md:text-xl leading-normal mb-16'>
                    <span className='mr-2'>⚠️</span>
                    Registrada em cartório [RISCO ZERO]
                </h3>

                <Warranty />

                <div className='grid text-center gap-8 max-w-xl mx-auto mt-12 mb-8 md:mt-32'>
                    <div
                        className='text-xl md:text-2xl w-fit mx-auto p-4 border-error border rounded-xl text-white bg-error animate-pulse'>
                        <span className='text-5xl'>😱</span>
                        <br />
                        Você não entendeu errado. <br />
                        <strong>SEU RISCO AQUI É ZERO</strong>
                    </div>
                </div>
                {offer && <CallToAction />}
            </section>
            <section className='relative w-full bg-zinc-900 px-6 py-12'>
                <Blur direction='right' />
                <FloatBlocks />
                <div className='container mx-auto max-w-5xl'>
                    <div className='grid gap-8 md:grid-cols-2 mb-8'>
                        <div>
                            <h2 className='font-bold text-white text-2xl md:text-4xl max-w-2xl mx-auto mb-8'>
                                <span className='text-primary'>
                                    LUIZ GREGATTI
                                </span>{' '}
                                NOS PRINCIPAIS SITES DO PAÍS!
                            </h2>

                            <p className='text-white/80 lg:text-xl leading-normal mb-8 text-justify'>
                                Empresário, palestrante e viajante profissional,
                                já conheceu mais de 40 países, possuiu mais de
                                20 mil alunos em diversos programas de
                                acompanhamento que juntos (os alunos) faturaram
                                mais de R$41.000.000,00 (milhões de reais).{' '}
                                <br />
                                <br />
                                Nos últimos anos Luiz acumulou mais de 60
                                milhões de milhas e montou o ÚNICO PROGRAMA DE
                                ACOMPANHAMENTO DO BRASIL COM FORMAÇÃO EM RENDA
                                COM MILHAS, CARTÕES E PASSAGENS AÉREAS. <br />
                                <br />
                                Palestrou dividindo palcos com grandes nomes do
                                empreendedorismo Brasileiro, como Flávio
                                Augusto, Pablo Marçal entre outros nomes
                                renomados.
                            </p>
                        </div>

                        <MockupIphone>
                            <div className='h-full bg-black relative w-full'>
                                <div className='relative h-full mb-1'>
                                    <BlurImage
                                        layout='fill'
                                        src='/instagram.webp'
                                        alt='Luiz Gregatti - Instagram'
                                    />
                                </div>
                                <div className='relative h-full mb-1'>
                                    <BlurImage
                                        layout='fill'
                                        src='/istoe.webp'
                                        alt='Luiz Gregatti - Istoé'
                                    />
                                </div>
                                <div className='relative h-full mb-1'>
                                    <BlurImage
                                        layout='fill'
                                        src='/extra.webp'
                                        alt='Luiz Gregatti - Extra'
                                    />
                                </div>
                                <div className='relative h-full mb-1'>
                                    <BlurImage
                                        layout='fill'
                                        src='/folha-vi.webp'
                                        alt='Luiz Gregatti - Folha Vitória'
                                    />
                                </div>
                            </div>
                        </MockupIphone>
                    </div>

                    {offer && <CallToAction />}
                </div>
            </section>

            <section className='relative mx-auto py-12 sm:py-24 px-6 bg-[url(/bg.webp)] bg-cover'>
                <Blur direction='right' />
                <div className='container mx-auto max-w-3xl'>
                    <div className='grid gap-8 md:mb-12'>
                        <div className='grid z-10'>
                            <h2 className='font-bold text-center text-white bg-error py-1 px-2 text-2xl md:text-5xl mx-auto md:mt-8 mb-4'>
                                O RENDA COM MILHAS NÃO É UM &quot;CURSINHO DE
                                MILHAS&quot;
                            </h2>
                            <p className='text-white text-center mb-8 text-lg'>
                                É um ecossistema completo, um programa de
                                acompanhamento com ferramentas, professores e
                                suporte intensivo que vai do{' '}
                                <strong className='text-warning'>
                                    zero até seu segundo salário completo.
                                </strong>
                            </p>

                            <div className='relative w-full h-64 md:h-96 mb-8'>
                                <BlurImage
                                    src='/mockup3.webp'
                                    alt='Mockup'
                                    layout='fill'
                                    className='object-contain'
                                />
                            </div>

                            <ul className='text-light md:text-xl text-white grid gap-4 max-w-3xl mx-auto mb-8'>
                                <li>
                                    ✅{' '}
                                    <span className='font-bold text-warning'>
                                        30 estratégias de fazer dinheiro
                                    </span>{' '}
                                    e voar praticamente de graça
                                </li>
                                <li>
                                    ✅{' '}
                                    <span className='font-bold text-warning'>
                                        Apostila Renda com Milhas
                                    </span>{' '}
                                    (Material de Apoio)
                                </li>
                                <li>
                                    ✅{' '}
                                    <span className='font-bold text-warning'>
                                        Professores a tempo integral
                                    </span>{' '}
                                    para te assessorar
                                </li>
                                <li>
                                    ✅ Garantia de 365 dias ={' '}
                                    <span className='font-bold text-warning'>
                                        1 ano (ÚNICO NO PAÍS - ZERO RISCO)
                                    </span>
                                </li>
                                <li>
                                    ✅ Planilha de controle e organização de
                                    milhas (PLAMILHAS)
                                </li>
                                <li>
                                    ✅{' '}
                                    <span className='font-bold text-warning'>
                                        Plantões tira dúvidas AO VIVO
                                    </span>{' '}
                                    com os Professores
                                </li>
                                <li>
                                    ✅{' '}
                                    <span className='font-bold text-warning'>
                                        Certificado de Formação
                                    </span>{' '}
                                    em Milhas e Cartões com Conclusão
                                </li>
                            </ul>
                        </div>
                    </div>

                    {offer && <CallToAction />}
                </div>
            </section>
            <section
                className='relative mx-auto py-12 sm:py-24 px-6 bg-[url(/bg.webp)] bg-fixed bg-contain bg-no-repeat bg-right'>
                <Blur direction='right' />
                <Blur />
                <FloatBlocks />
                <div className='container mx-auto'>
                    <h2 className='font-bold text-white text-center text-2xl md:text-5xl mx-auto mb-8 md:mb-8'>
                        MÓDULOS QUE VOCÊ TERÁ ACESSO
                    </h2>

                    <div className='flex flex-wrap justify-center gap-4 max-w-5xl mx-auto'>
                        <div
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-glow hover:z-10'>
                            <figure className='relative h-[500px]'>
                                <BlurImage
                                    src='/modulos/1.webp'
                                    alt='Módulo 1'
                                    layout='fill'
                                    className='object-contain'
                                />
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title'>
                                    SEJA BEM VINDO | INTRODUÇÃO
                                </h2>
                                <p className=''>
                                    Introdução e “hacks” de como absorver o
                                    máximo de conteúdo do Programa completo
                                </p>
                            </div>
                        </div>

                        <div
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-glow hover:z-10'>
                            <figure className='relative h-[500px]'>
                                <BlurImage
                                    src='/modulos/2.webp'
                                    alt='Módulo 2'
                                    layout='fill'
                                    className='object-contain'
                                />
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title'>
                                    CONHECENDO O MERCADO | BÁSICO
                                </h2>
                                <p className=''>
                                    Mais de 13 aulas explicando o básico, porém
                                    necessário do mundo das milhas.
                                </p>
                            </div>
                        </div>

                        <div
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-glow hover:z-10'>
                            <figure className='relative h-[500px]'>
                                <BlurImage
                                    src='/modulos/3.webp'
                                    alt='Módulo 3'
                                    layout='fill'
                                    className='object-contain'
                                />
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title'>
                                    OS 3 PASSOS DA METODOLOGIA A.M.V
                                </h2>
                                <p className=''>
                                    A clareza dos 3 passos da nossa metodologia:
                                    Compra, Multiplicação e Venda.
                                </p>
                            </div>
                        </div>

                        <div
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-glow hover:z-10'>
                            <figure className='relative h-[500px]'>
                                <BlurImage
                                    src='/modulos/4.webp'
                                    alt='Módulo 4'
                                    layout='fill'
                                    className='object-contain'
                                />
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title'>
                                    PROGRAMAS DE FIDELIDADE NACIONAIS
                                </h2>
                                <p className=''>
                                    Todos os detalhes dos 9 programas de
                                    fidelidade que mais utilizamos no Brasil.
                                </p>
                            </div>
                        </div>

                        <div
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-glow hover:z-10'>
                            <figure className='relative h-[500px]'>
                                <BlurImage
                                    src='/modulos/5.webp'
                                    alt='Módulo 5'
                                    layout='fill'
                                    className='object-contain'
                                />
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title'>
                                    PROGRAMAS DE FIDELIDADE INTERNACIONAL
                                </h2>
                                <p className=''>
                                    Os programas de fidelidade Internacionais,
                                    ótimos para voar muito barato ou até de
                                    graça.
                                </p>
                            </div>
                        </div>

                        <div
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-glow hover:z-10'>
                            <figure className='relative h-[500px]'>
                                <BlurImage
                                    src='/modulos/6.webp'
                                    alt='Módulo 6'
                                    layout='fill'
                                    className='object-contain'
                                />
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title'>
                                    PROGRAMAS DE FIDELIDADE | BANCOS
                                </h2>
                                <p className=''>
                                    Os melhores programas de fidelidade dos
                                    bancos, como pontuar e ter acesso às
                                    melhores estratégias.
                                </p>
                            </div>
                        </div>

                        <div
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-glow hover:z-10'>
                            <figure className='relative h-[500px]'>
                                <BlurImage
                                    src='/modulos/7.webp'
                                    alt='Módulo 7'
                                    layout='fill'
                                    className='object-contain'
                                />
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title'>
                                    HOTEIS COM ATÉ 50% DE DESCONTO
                                </h2>
                                <p className=''>
                                    Como ter acesso aos melhores programas,
                                    resgatar pontos e ter descontos na sua
                                    hospedagem.
                                </p>
                            </div>
                        </div>

                        <div
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-glow hover:z-10'>
                            <figure className='relative h-[500px]'>
                                <BlurImage
                                    src='/modulos/8.webp'
                                    alt='Módulo 8'
                                    layout='fill'
                                    className='object-contain'
                                />
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title'>TODOS OS APPS</h2>
                                <p className=''>
                                    Os aplicativos que você tem que ter para
                                    pontuar e ter mais lucro com milhas.
                                </p>
                            </div>
                        </div>

                        <div
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-glow hover:z-10'>
                            <figure className='relative h-[500px]'>
                                <BlurImage
                                    src='/modulos/9.webp'
                                    alt='Módulo 9'
                                    layout='fill'
                                    className='object-contain'
                                />
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title'>
                                    CARTÃO DE CRÉDITO | O MAIOR ATIVO DO MUNDO
                                </h2>
                                <p className=''>
                                    Tudo o que você precisa saber sobre cartões
                                    e como escolher o que melhor se encaixa na
                                    sua realidade.
                                </p>
                            </div>
                        </div>

                        <div
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-glow hover:z-10'>
                            <figure className='relative h-[500px]'>
                                <BlurImage
                                    src='/modulos/26.webp'
                                    alt='Módulo 10'
                                    layout='fill'
                                    className='object-contain'
                                />
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title'>
                                    SAQUES AUTOMÁTICOS VITALÍCIOS
                                </h2>
                                <p className=''>
                                    Acumulando milhas de graça. Como ter de
                                    volta um dinheiro que já é seu.
                                </p>
                            </div>
                        </div>

                        <div
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-glow hover:z-10'>
                            <figure className='relative h-[500px]'>
                                <BlurImage
                                    src='/modulos/10.webp'
                                    alt='Módulo 10'
                                    layout='fill'
                                    className='object-contain'
                                />
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title'>
                                    RENDA COM MILHAS NA PRÁTICA
                                </h2>
                                <p className=''>
                                    Como criar seu segundo salário mensal
                                </p>
                            </div>
                        </div>

                        <div
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-glow hover:z-10'>
                            <figure className='relative h-[500px]'>
                                <BlurImage
                                    src='/modulos/11.webp'
                                    alt='Módulo 11'
                                    layout='fill'
                                    className='object-contain'
                                />
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title'>
                                    VENDENDO MILHAS DE FORMA LUCRATIVA
                                </h2>
                                <p className=''>
                                    As 5 formas de você vender milhas com o
                                    máximo de lucro .
                                </p>
                            </div>
                        </div>

                        <div
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-glow hover:z-10'>
                            <figure className='relative h-[500px]'>
                                <BlurImage
                                    src='/modulos/25.webp'
                                    alt='Módulo 12'
                                    layout='fill'
                                    className='object-contain'
                                />
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title'>
                                    VIAJANDO PRATICAMENTE DE GRAÇA
                                </h2>
                                <p className=''>
                                    O método que somente donos de agências de
                                    viagens tinham acesso, liberados para você.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className='relative mx-auto py-12 sm:py-24 px-6 bg-[url(/bg-2.webp)] bg-cover bg-fixed bg-no-repeat'>
                <div className='container mx-auto max-w-5xl'>
                    <h2 className='font-bold text-black text-center text-2xl md:text-5xl max-w-3xl mx-auto mb-8 md:mb-16'>
                        ENTRANDO HOJE VOCÊ LEVA:{' '}
                        <span className='bg-primary'>
                            + DE 4 MIL REAIS EM PRESENTES 🎁
                        </span>
                    </h2>

                    <div className='flex flex-col gap-4 mb-12'>
                        <div
                            className='card lg:card-side bg-white text-black shadow-xl box-glow hover:scale-105 transition-all duration-500'>
                            <figure className='relative w-full min-h-52 h-52 md:h-auto md:w-[25%]'>
                                <BlurImage
                                    src='/bonus/1.webp'
                                    alt='Bônus 1'
                                    layout='fill'
                                    className='object-cover'
                                />
                            </figure>
                            <div className='card-body md:max-w-[60%]'>
                                <h2 className='card-title'>
                                    BÔNUS 1: GESTOR PROFISSIONAL DE MILHAS
                                    (GESTOR 5K):
                                </h2>
                                <p className=''>
                                    Como você pode fazer mais de R$5.000 reais
                                    mês, com uma nova profissão, se tornando
                                    gestor de outras contas de milhas,
                                    trabalhando pouco tempo por dia e escalando
                                    seus ganhos.
                                </p>
                            </div>
                        </div>

                        <div
                            className='card lg:card-side bg-white text-black shadow-xl box-glow hover:scale-105 transition-all duration-500'>
                            <figure className='relative w-full min-h-52 h-52 md:h-auto md:w-[25%]'>
                                <BlurImage
                                    src='/bonus/2.webp'
                                    alt='Bônus 2'
                                    layout='fill'
                                    className='object-cover'
                                />
                            </figure>
                            <div className='card-body md:max-w-[60%]'>
                                <h2 className='card-title'>
                                    BÔNUS 2: CONTABILIDADE DE MILHAS NA PRÁTICA:
                                </h2>
                                <p className=''>
                                    Tudo que você precisa saber para declarar
                                    suas milhas no seu imposto de renda, com
                                    isenção e ficar tranquilo com o
                                    &quot;Leão&quot;. Com o maior especialista
                                    do país no assunto.
                                </p>
                            </div>
                        </div>

                        <div
                            className='card lg:card-side bg-white text-black shadow-xl box-glow hover:scale-105 transition-all duration-500'>
                            <figure className='relative w-full min-h-52 h-52 md:h-auto md:w-[25%]'>
                                <BlurImage
                                    src='/bonus/3.webp'
                                    alt='Bônus 3'
                                    layout='fill'
                                    className='object-cover'
                                />
                            </figure>
                            <div className='card-body md:max-w-[60%]'>
                                <h2 className='card-title'>
                                    BÔNUS 3: PLAMILHAS:
                                </h2>
                                <p className=''>
                                    A única ferramenta para você gerenciar suas
                                    milhas e das contas que você administra,
                                    centralizado tudo em um único lugar, podendo
                                    filtrar a quantidade, mês, estratégia e
                                    conta que você acumulou ou vendeu suas
                                    milhas.
                                </p>
                            </div>
                        </div>

                        <div
                            className='card lg:card-side bg-white text-black shadow-xl box-glow hover:scale-105 transition-all duration-500'>
                            <figure className='relative w-full min-h-52 h-52 md:h-auto md:w-[25%]'>
                                <BlurImage
                                    src='/bonus/4.webp'
                                    alt='Bônus 4'
                                    layout='fill'
                                    className='object-cover'
                                />
                            </figure>
                            <div className='card-body md:max-w-[60%]'>
                                <h2 className='card-title'>
                                    BÔNUS 4: OS 3 PILARES PARA CRIAR UM NEGÓCIO
                                    LUCRATIVO:
                                </h2>
                                <p className=''>
                                    Aulas sobre vendas, mkt digital, tráfego
                                    (anúncios) para você já entender como
                                    funciona esse mundo digital que te
                                    possibilita escala de ganhos e liberdade!
                                </p>
                            </div>
                        </div>

                        <div
                            className='card lg:card-side bg-white text-black shadow-xl box-glow hover:scale-105 transition-all duration-500'>
                            <figure className='relative w-full min-h-52 h-52 md:h-auto md:w-[25%]'>
                                <BlurImage
                                    src='/bonus/5.webp'
                                    alt='Bônus 5'
                                    layout='fill'
                                    className='object-cover'
                                />
                            </figure>
                            <div className='card-body md:max-w-[60%]'>
                                <h2 className='card-title'>
                                    BÔNUS 5: BANCO DE MILHAS:
                                </h2>
                                <p className=''>
                                    Aqui você pode vender suas milhas e receber
                                    no mesmo dia por pix na sua conta bancária.
                                    Recebendo antes mesmo de pagar a fatura do
                                    seu cartão de crédito.
                                </p>
                            </div>
                        </div>

                        <div
                            className='card lg:card-side bg-white text-black shadow-xl box-glow hover:scale-105 transition-all duration-500'>
                            <figure className='relative w-full min-h-52 h-52 md:h-auto md:w-[25%]'>
                                <BlurImage
                                    src='/bonus/6.webp'
                                    alt='Bônus 6'
                                    layout='fill'
                                    className='object-cover'
                                />
                            </figure>
                            <div className='card-body md:max-w-[60%]'>
                                <h2 className='card-title'>
                                    BÔNUS 6: CONSULTORES DE CARTÕES BLACKS:
                                </h2>
                                <p className=''>
                                    Contatos dentro dos bancos que facilitam a
                                    aprovação de cartões de créditos blacks, que
                                    geram mais milhas e benefícios como acessos
                                    ilimitados a salas VIPs.
                                </p>
                            </div>
                        </div>
                    </div>
                    {offer && <CallToAction />}
                </div>
            </section>
            <section className='relative w-full bg-black px-6 py-12'>
                <div className='container mx-auto max-w-4xl'>
                    <div className='relative w-full md:h-[56vh] h-56 z-0'>
                        <BlurImage
                            src='/mockup2.webp'
                            alt='Mockup'
                            layout='fill'
                            className='object-contain'
                        />
                    </div>

                    <Money />
                    <Blur direction='right' />
                    <Blur />
                    <FloatBlocks />

                    <div
                        className='bg-base-100 relative overflow-x-auto border-dashed border rounded-xl md:p-8 border-primary box-glow md:hover:scale-105 transition-all duration-500'>
                        <table className='table table-zebra mx-auto text-xs md:text-lg w-full'>
                            <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Valor</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <div className='flex gap-4 items-center w-[50vw] whitespace-pre-wrap md:w-auto'>
                                            <span className='hidden md:block text-2xl'>
                                                ✅
                                            </span>{' '}
                                        Renda com Milhas
                                    </div>
                                </td>
                                <td>R$ 1.497,00</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='flex gap-4 items-center w-[50vw] whitespace-pre-wrap md:w-auto'>
                                            <span className='hidden md:block text-2xl'>
                                                ✅
                                            </span>{' '}
                                        Empreendendo com o seu CPF
                                    </div>
                                </td>
                                <td>R$ 497,00</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='flex gap-4 items-center w-[50vw] whitespace-pre-wrap md:w-auto'>
                                            <span className='hidden md:block text-2xl'>
                                                ✅
                                            </span>{' '}
                                        Os 4 passos para aumentar o seu
                                        Score em 7 dias
                                    </div>
                                </td>
                                <td>R$ 297,00</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='flex gap-4 items-center w-[50vw] whitespace-pre-wrap md:w-auto'>
                                            <span className='hidden md:block text-2xl'>
                                                ✅
                                            </span>{' '}
                                        Contabilidade de milhas na prática
                                    </div>
                                </td>
                                <td>R$ 197,00</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='flex gap-4 items-center w-[50vw] whitespace-pre-wrap md:w-auto'>
                                            <span className='hidden md:block text-2xl'>
                                                ✅
                                            </span>{' '}
                                        &quot;Plamilhas&quot;
                                    </div>
                                </td>
                                <td>R$ 97,00</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='flex gap-4 items-center w-[50vw] whitespace-pre-wrap md:w-auto'>
                                            <span className='hidden md:block text-2xl'>
                                                ✅
                                            </span>{' '}
                                        Consultora Bradesco Black
                                    </div>
                                </td>
                                <td>R$ 347,00</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='flex gap-4 items-center w-[50vw] whitespace-pre-wrap md:w-auto'>
                                            <span className='hidden md:block text-2xl'>
                                                ✅
                                            </span>{' '}
                                        Banco de milhas RCM
                                    </div>
                                </td>
                                <td>R$ 397,00</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='flex gap-4 items-center w-[50vw] whitespace-pre-wrap md:w-auto'>
                                            <span className='hidden md:block text-2xl'>
                                                ✅
                                            </span>{' '}
                                        Como dá os primeiros passos no mundo
                                        dos investimentos
                                    </div>
                                </td>
                                <td>R$ 247,00</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='flex gap-4 items-center w-[50vw] whitespace-pre-wrap md:w-auto'>
                                            <span className='hidden md:block text-2xl'>
                                                ✅
                                            </span>{' '}
                                        Acesso ao nosso corretor parceiro
                                        Porto Seguro
                                    </div>
                                </td>
                                <td>R$ 347,00</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='flex gap-4 items-center w-[50vw] whitespace-pre-wrap md:w-auto'>
                                            <span className='hidden md:block text-2xl'>
                                                ✅
                                            </span>{' '}
                                        O passo a passo para declarar o seu
                                        Imposto de Renda do jeito certo
                                    </div>
                                </td>
                                <td>R$ 97,00</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            {offer && (
                                <>
                                    <tr className='font-bold text-white'>
                                        <td>SUBTOTAL</td>
                                        <td>
                                            <strong>R$ 4.020,00</strong>
                                        </td>
                                    </tr>
                                    <tr className='font-bold text-white'>
                                        <td>DESCONTO</td>
                                        <td>
                                            <strong className='text-primary'>
                                                {offer.discount}
                                            </strong>
                                        </td>
                                    </tr>
                                </>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {offer && (
                        <>
                            <div className='w-fit rounded-lg mx-auto bg-error mt-12 text-white py-2 px-6'>
                                {/* gerar cronometro de 10 minutos retrocedendo o tempo */}
                                <div className='flex flex-col gap-8 text-center'>
                                    <h2 className='font-bold text-sm md:text-2xl'>
                                        {expired
                                            ? 'Oferta encerrada.'
                                            : 'Atenção! Oferta por tempo limitado'}
                                    </h2>
                                </div>
                            </div>

                            <div className='flex justify-center mt-4'>
                                <Countdown />
                            </div>

                            <div
                                className={`grid gap-4 my-8 ${
                                    expired && 'opacity-30 grayscale'
                                }`}
                            >
                                <h3 className='text-center text-primary font-bold text-3xl md:text-5xl'>
                                    {offer.installment}
                                </h3>

                                <h4 className='text-center bg-warning text-black w-fit px-2 mx-auto font-bold text-lg md:text-3xl'>
                                    {offer.price}
                                </h4>
                            </div>
                            {offer && <CallToAction />}
                            {/* <span className="text-center block text-xs opacity-80 mt-1">
                        * Assinatura anual com renovação automática
                    </span> */}
                        </>
                    )}
                </div>
            </section>
            <section
                className='relative mx-auto py-12 sm:py-24 px-6 bg-[url(/bg-2.webp)] bg-cover bg-fixed bg-no-repeat'>
                <div className='container max-w-4xl px-0 mx-auto'>
                    <span className='block font-bold text-center text-xs badge badge-primary'>
                        FAQ
                    </span>
                    <h2 className='text-black font-bold text-2xl md:text-4xl mb-8 md:mb-16'>
                        Perguntas Frequentes
                    </h2>

                    <div className='grid gap-2'>
                        <label
                            tabIndex={0}
                            className='collapse collapse-arrow shadown-md bg-white text-black rounded-box group'
                        >
                            <input type='checkbox' className='peer' />
                            <div className='collapse-title font-bold group-focus:text-primary'>
                                <span className='block text-xs md:text-base leading-1 md:leading-normal'>
                                    EM QUANTO TEMPO VOU RECUPERAR O DINHEIRO
                                    INVESTIDO NO CURSO?
                                </span>
                            </div>
                            <div className='collapse-content'>
                                <p className='text-sm md:text-base'>
                                    Uma das primeiras coisas que vou te ensinar
                                    é como você vai conseguir recuperar o
                                    dinheiro que está investindo no curso em
                                    pouco tempo. Tudo depende de quanto tempo
                                    vai demorar para você aplicar o que aprendeu
                                </p>
                            </div>
                        </label>
                        <label
                            tabIndex={0}
                            className='collapse collapse-arrow shadown-md bg-white text-black rounded-box group'
                        >
                            <input type='checkbox' className='peer' />
                            <div className='collapse-title font-bold group-focus:text-primary'>
                                <span className='block text-xs md:text-base leading-1 md:leading-normal'>
                                    QUAIS RESULTADOS EU TEREI COM O RENDA COM
                                    MILHAS?
                                </span>
                            </div>
                            <div className='collapse-content'>
                                <p className='text-sm md:text-base'>
                                    Mais controle financeiro simples, uma nova
                                    fonte de renda e viagens todo ano
                                    praticamente de graça apenas por saber usar
                                    o seu cartão de crédito de forma
                                    inteligente.
                                </p>
                            </div>
                        </label>
                        <label
                            tabIndex={0}
                            className='collapse collapse-arrow shadown-md bg-white text-black rounded-box group'
                        >
                            <input type='checkbox' className='peer' />
                            <div className='collapse-title font-bold group-focus:text-primary'>
                                <span className='block text-xs md:text-base leading-1 md:leading-normal'>
                                    TEREI ALGUM TIPO DE SUPORTE?
                                </span>
                            </div>
                            <div className='collapse-content'>
                                <p className='text-sm md:text-base'>
                                    Claro! Jamais estará sozinho. Temos a área
                                    de membros do curso e uma comunidade de
                                    alunos onde todos se ajudam, podendo
                                    compartilhar suas dúvidas e resultados.
                                </p>
                            </div>
                        </label>
                        <label
                            tabIndex={0}
                            className='collapse collapse-arrow shadown-md bg-white text-black rounded-box group'
                        >
                            <input type='checkbox' className='peer' />
                            <div className='collapse-title font-bold group-focus:text-primary'>
                                <span className='block text-xs md:text-base leading-1 md:leading-normal'>
                                    EM QUANTO TEMPO RECEBEREI MEU ACESSO?
                                </span>
                            </div>
                            <div className='collapse-content'>
                                <p className='text-sm md:text-base'>
                                    Pagamentos no cartão: 2 minutos. Pagamento
                                    via boleto: 2 dias.
                                </p>
                            </div>
                        </label>
                        <label
                            tabIndex={0}
                            className='collapse collapse-arrow shadown-md bg-white text-black rounded-box group'
                        >
                            <input type='checkbox' className='peer' />
                            <div className='collapse-title font-bold group-focus:text-primary'>
                                <span className='block text-xs md:text-base leading-1 md:leading-normal'>
                                    ESTOU NEGATIVADO, ISSO ME PREJUDICA?
                                </span>
                            </div>
                            <div className='collapse-content'>
                                <p className='text-sm md:text-base'>
                                    Se você já tem um cartão com um bom limite
                                    não, agora se você não tem cartão ou ele tem
                                    pouco limite, o ideal é você focar em limpar
                                    seu nome e assim será possível aumentar
                                    muito mais o seu limite e conseguir melhores
                                    cartões. Mas no curso tem aulas ensinando
                                    como conseguir cartões com mais facilidade
                                    mesmo sendo negativado.
                                </p>
                            </div>
                        </label>

                        <label
                            tabIndex={0}
                            className='collapse collapse-arrow shadown-md bg-white text-black rounded-box group'
                        >
                            <input type='checkbox' className='peer' />
                            <div className='collapse-title font-bold group-focus:text-primary'>
                                <span className='block text-xs md:text-base leading-1 md:leading-normal'>
                                    EM QUANTO TEMPO JÁ CONSIGO FAZER DINHEIRO?
                                </span>
                            </div>
                            <div className='collapse-content'>
                                <p className='text-sm md:text-base'>
                                    Na primeira semana já é possível você
                                    aplicar algumas das estratégias e começar a
                                    lucrar, como existem vários tipos de
                                    estratégias, algumas aparecem com o tempo e
                                    algumas já é possível aplicar agora mesmo.
                                </p>
                            </div>
                        </label>

                        <label
                            tabIndex={0}
                            className='collapse collapse-arrow shadown-md bg-white text-black rounded-box group'
                        >
                            <input type='checkbox' className='peer' />
                            <div className='collapse-title font-bold group-focus:text-primary'>
                                <span className='block text-xs md:text-base leading-1 md:leading-normal'>
                                    É LEGAL VENDER MILHAS?
                                </span>
                            </div>
                            <div className='collapse-content'>
                                <p className='text-sm md:text-base'>
                                    Sim, você está protegido por LEI, é 100%
                                    legal o comércio dos frutos do cartão de
                                    crédito.
                                </p>
                            </div>
                        </label>

                        <label
                            tabIndex={0}
                            className='collapse collapse-arrow shadown-md bg-white text-black rounded-box group'
                        >
                            <input type='checkbox' className='peer' />
                            <div className='collapse-title font-bold group-focus:text-primary'>
                                <span className='block text-xs md:text-base leading-1 md:leading-normal'>
                                    PRECISO DE COMPUTADOR OU POSSO ACESSAR PELO
                                    CELULAR?
                                </span>
                            </div>
                            <div className='collapse-content'>
                                <p className='text-sm md:text-base'>
                                    Todas as plataformas e sites podem ser
                                    acessados pelo celular. Portanto, não é
                                    necessário usar o seu computador.
                                </p>
                            </div>
                        </label>
                    </div>

                    <span className='hidden md:block'>
                        <Divider />
                    </span>
                    <div className='card-body justify-between gap-4 items-center w-full pb-0'>
                        <div className='flex gap-4 text-center'>
                            <div>
                                <h2 className='text-2xl text-black'>
                                    Ficou com qualquer dúvida?
                                </h2>
                                <p className='text-black'>
                                    Pode acionar meu time de especialistas!
                                </p>
                            </div>
                        </div>

                        <label
                            htmlFor='lead'
                            className='btn btn-warning btn-lg relative'
                        >
                            <span className='absolute flex h-3 w-3 -top-1 -right-1'>
                                <span
                                    className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                                <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                            </span>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-8 h-8 mr-4 hidden md:block'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155'
                                />
                            </svg>
                            Falar com especialista
                        </label>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    ) : (
        <></>
    )
}
