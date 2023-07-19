import { parseCookies } from 'nookies'
import { useContext, useEffect, useState } from 'react'
import { OfferContext } from '../providers/Offer'
import { setCookies } from '../utils/useCookies'
import Blur from './Blur'
import BlurImage from './BlurImage'
import CallToAction2 from './CallToAction2'
import FloatBlocks from './FloatBlocks'
import Footer from './Footer'
import Warranty from './Warranty'
import VTurb from './Player/VTurb'
import Countdown from './CountDown'

interface BlockedProps {
    show?: boolean
}

export default function BlockedPage({ show = true }: BlockedProps) {
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
        if (clientWindowHeight > 17500 && !isCountdownVisible) {
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
                    <VTurb player={'64b7565fe891af000a1d8ac9'} video={'99583553-0c7c-40d5-b819-534dcd7867b9'} iframe />
                </div>

                <h3 className='text-center container mx-auto max-w-2xl my-12 font-semibold'>
                    O ViajaFlux é uma plataforma única para controlar toda sua agência online, possibilitando
                    visualizar:
                </h3>

                <div className='relative h-52 sm:h-96'>
                    <BlurImage src='/circulo.webp' layout={'fill'} className='object-contain' />
                </div>

                <h3 className='text-center container mx-auto max-w-2xl my-12 font-semibold'>
                    Literalmente tudo o que você precisa para ter seu negócio online faturando alto, com lucro e
                    liberdade!
                </h3>

                <div className='mt-8'>{<CallToAction2 />}</div>
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
                                SÃO MAIS DE 400 AGÊNCIAS ESPALHADAS POR BRASIL E MUNDO!
                            </h2>
                        </div>
                    </div>
                    <div className='grid gap-8 sm:grid-cols-3'>
                        <VTurb player='64b751480373240009920668'
                               video='99583553-0c7c-40d5-b819-534dcd7867b9'
                               vertical
                               iframe
                        />
                        <VTurb player='64b75144e891af000a1d8a7b'
                               video='99583553-0c7c-40d5-b819-534dcd7867b9'
                               vertical
                               iframe
                        />
                        <VTurb player='64b7513fd66489000873f167'
                               video='99583553-0c7c-40d5-b819-534dcd7867b9'
                               vertical
                               iframe
                        />
                    </div>
                    <p className='max-w-xl mx-auto my-6 text-center'>
                        Espero que você seja o próximo a me envia vídeos como esses.
                    </p>

                    <div className='mt-8'>{<CallToAction2 />}</div>

                    <p className='max-w-xl text-xl mx-auto mt-12 mb-6 text-center font-bold'>
                        Dê uma olhada nos resultados dos agentes:
                    </p>

                    <div className='grid gap-4 md:grid-cols-3'>
                        <div className='relative hover:z-10 h-[490px] box-red-glow rounded-xl'>
                            <BlurImage
                                src='/testimonials/1.webp'
                                alt='Depoimento 1'
                                layout='fill'
                                className='object-cover rounded-xl shadow-lg'
                            />
                        </div>
                        <div className='relative hover:z-10 h-[490px] box-red-glow rounded-xl'>
                            <BlurImage
                                src='/testimonials/2.webp'
                                alt='Depoimento 2'
                                layout='fill'
                                className='object-cover rounded-xl shadow-lg'
                            />
                        </div>
                        <div className='relative hover:z-10 h-[490px] box-red-glow rounded-xl'>
                            <BlurImage
                                src='/testimonials/3.webp'
                                alt='Depoimento 3'
                                layout='fill'
                                className='object-cover rounded-xl shadow-lg'
                            />
                        </div>
                        <div className='relative hover:z-10 h-[490px] box-red-glow rounded-xl'>
                            <BlurImage
                                src='/testimonials/4.webp'
                                alt='Depoimento 4'
                                layout='fill'
                                className='object-cover rounded-xl shadow-lg'
                            />
                        </div>
                        <div className='relative hover:z-10 h-[490px] box-red-glow rounded-xl'>
                            <BlurImage
                                src='/testimonials/5.webp'
                                alt='Depoimento 5'
                                layout='fill'
                                className='object-cover rounded-xl shadow-lg'
                            />
                        </div>
                        <div className='relative hover:z-10 h-[490px] box-red-glow rounded-xl'>
                            <BlurImage
                                src='/testimonials/6.webp'
                                alt='Depoimento 6'
                                layout='fill'
                                className='object-cover rounded-xl shadow-lg'
                            />
                        </div>
                    </div>
                </div>
                {<CallToAction2 />}
            </section>


            <section className='relative mx-auto py-12 px-6 bg-[url(/bg-2.webp)] bg-cover bg-fixed'>
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
                {<CallToAction2 />}

                <div className='w-full border-b-4 my-10 border-dashed border-black'></div>

                <h1 className='md:text-center uppercase my-6 rounded-md text-xl md:text-3xl md:leading-snug font-bold text-center w-full inline-grid sm:block'
                >
                    Para quem é a <span
                    className='text-white bg-gradient font-bold rounded-lg px-4'>AGÊNCIA HOME OFFICE?</span>
                </h1>

                <h3 className='font-semibold text-center mt-6'>⚠️ A AHO não é um cursinho de agência, é um modelo de
                    negócio validado. ⚠️</h3>

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
                        <div className='font-bold'>Preciso ter muito fluxo de caixa? Quanto mais ou menos preciso para
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

                {<CallToAction2 />}
            </section>
            <section className='relative w-full bg-zinc-900 px-6 py-12'>
                <Blur direction='right' />
                <FloatBlocks />
                <div className='container mx-auto max-w-3xl'>

                    <h1 className=' text-white md:text-center uppercase my-6 rounded-md text-xl md:text-3xl md:leading-snug font-bold text-center w-full'
                    >
                        Perdeu as aulas da semana <br /><span
                        className='text-white bg-gradient font-bold rounded-lg px-4 w-fit'>&quot;A SUA AGÊNCIA HOME OFFICE&quot;</span>?
                    </h1>

                    <span
                        className='text-white font-semibold text-center w-full block'>Assista aqui antes que saia do AR! 👇</span>

                    <div className='grid md:grid-cols-2 mt-8 text-center gap-4'>
                        <a target='_blank' rel='noreferrer' href={'https://youtube.com/live/sibPsOs2Gek?feature=share'}
                           className='flex justify-center flex-col items-center duration-300 transition-all hover:scale-105'>
                            <div className='relative w-[380px] h-[200px] bg-gray-800'>
                                <BlurImage
                                    layout={'fill'}
                                    src='/1.png'
                                    alt='Luiz'
                                    className='object-contain'
                                />
                            </div>
                            <p className='max-w-[300px] mx-auto text-gray-500 mt-2 text-sm'>
                                AULA 01 - A metodologia AHO, que NÃO depende de Milhas
                                e entrega os seus Primeiros Clientes Grátis!
                            </p>
                        </a>

                        <a target='_blank' rel='noreferrer' href={'https://youtube.com/live/HuBKqgEkHdg?feature=share'}
                           className='flex justify-center flex-col items-center duration-300 transition-all hover:scale-105'>
                            <div className='relative w-[380px] h-[200px] bg-gray-800'>
                                <BlurImage
                                    layout={'fill'}
                                    src='/2.png'
                                    alt='Luiz'
                                    className='object-contain'
                                />
                            </div>
                            <p className='max-w-[300px] mx-auto text-gray-500 mt-2 text-sm'>
                                AULA 2 - A DESCOBERTA: Como criar a sua Agência Home
                                Office &quot;sem investir&quot; o seu DINHEIRO!
                            </p>
                        </a>
                    </div>

                </div>
            </section>

            <section className='relative mx-auto py-12 sm:py-24 px-6 bg-[url(/bg.webp)] bg-cover'>
                <Blur direction='right' />
                <div className='container mx-auto max-w-3xl'>
                    <div className='grid gap-8 md:mb-12'>
                        <h2 className='font-bold text-center text-2xl md:text-4xl mx-auto mb-8 md:mb-8 uppercase'>
                            O que o modelo de negócio da A.H.O me entrega?
                        </h2>

                        <div className='relative w-full h-64 md:h-[500px] mb-8'>
                            <BlurImage
                                src='/mockup.webp'
                                alt='Mockup'
                                layout='fill'
                                className='object-contain'
                            />
                        </div>

                    </div>
                </div>

                <Blur direction='right' />
                <Blur />
                <FloatBlocks />
                <div className='container mx-auto mb-12'>
                    <h2 className='font-bold text-center text-2xl md:text-4xl mx-auto mb-8 md:mb-8 max-w-4xl'>
                        E TODO O CONHECIMENTO DIVIDIDO NESSES MÓDULOS AQUI 👇
                    </h2>

                    <div className='flex flex-wrap justify-center gap-4 max-w-5xl mx-auto'>
                        <div
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-red-glow hover:z-10'>
                            <figure className='relative h-[590px]'>
                                <BlurImage
                                    src='/modules/01.webp'
                                    alt='Módulo 1'
                                    layout='fill'
                                    className='object-cover'
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
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-red-glow hover:z-10'>
                            <figure className='relative h-[590px]'>
                                <BlurImage
                                    src='/modules/02.webp'
                                    alt='Módulo 2'
                                    layout='fill'
                                    className='object-cover'
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
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-red-glow hover:z-10'>
                            <figure className='relative h-[590px]'>
                                <BlurImage
                                    src='/modules/03.webp'
                                    alt='Módulo 3'
                                    layout='fill'
                                    className='object-cover'
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
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-red-glow hover:z-10'>
                            <figure className='relative h-[590px]'>
                                <BlurImage
                                    src='/modules/04.webp'
                                    alt='Módulo 4'
                                    layout='fill'
                                    className='object-cover'
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
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-red-glow hover:z-10'>
                            <figure className='relative h-[590px]'>
                                <BlurImage
                                    src='/modules/05.webp'
                                    alt='Módulo 5'
                                    layout='fill'
                                    className='object-cover'
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
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-red-glow hover:z-10'>
                            <figure className='relative h-[590px]'>
                                <BlurImage
                                    src='/modules/06.webp'
                                    alt='Módulo 6'
                                    layout='fill'
                                    className='object-cover'
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
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-red-glow hover:z-10'>
                            <figure className='relative h-[590px]'>
                                <BlurImage
                                    src='/modules/07.webp'
                                    alt='Módulo 7'
                                    layout='fill'
                                    className='object-cover'
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
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-red-glow hover:z-10'>
                            <figure className='relative h-[590px]'>
                                <BlurImage
                                    src='/modules/08.webp'
                                    alt='Módulo 8'
                                    layout='fill'
                                    className='object-cover'
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
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-red-glow hover:z-10'>
                            <figure className='relative h-[590px]'>
                                <BlurImage
                                    src='/modules/09.webp'
                                    alt='Módulo 9'
                                    layout='fill'
                                    className='object-cover'
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
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-red-glow hover:z-10'>
                            <figure className='relative h-[590px]'>
                                <BlurImage
                                    src='/modules/10.webp'
                                    alt='Módulo 10'
                                    layout='fill'
                                    className='object-cover'
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
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-red-glow hover:z-10'>
                            <figure className='relative h-[590px]'>
                                <BlurImage
                                    src='/modules/11.webp'
                                    alt='Módulo 11'
                                    layout='fill'
                                    className='object-cover'
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
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-red-glow hover:z-10'>
                            <figure className='relative h-[590px]'>
                                <BlurImage
                                    src='/modules/12.webp'
                                    alt='Módulo 12'
                                    layout='fill'
                                    className='object-cover'
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
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-red-glow hover:z-10'>
                            <figure className='relative h-[590px]'>
                                <BlurImage
                                    src='/modules/13.webp'
                                    alt='Módulo 13'
                                    layout='fill'
                                    className='object-cover'
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

                        <div
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-red-glow hover:z-10'>
                            <figure className='relative h-[590px]'>
                                <BlurImage
                                    src='/modules/14.webp'
                                    alt='Módulo 14'
                                    layout='fill'
                                    className='object-cover'
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

                        <div
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-red-glow hover:z-10'>
                            <figure className='relative h-[590px]'>
                                <BlurImage
                                    src='/modules/15.webp'
                                    alt='Módulo 15'
                                    layout='fill'
                                    className='object-cover'
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

                        <div
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-red-glow hover:z-10'>
                            <figure className='relative h-[590px]'>
                                <BlurImage
                                    src='/modules/16.webp'
                                    alt='Módulo 16'
                                    layout='fill'
                                    className='object-cover'
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

                        <div
                            className='w-full sm:w-[40%] md:w-[30%] card card-compact bg-base-100 shadow-xl hover:scale-105 transition-all duration-500 hover:box-red-glow hover:z-10'>
                            <figure className='relative h-[590px]'>
                                <BlurImage
                                    src='/modules/17.webp'
                                    alt='Módulo 17'
                                    layout='fill'
                                    className='object-cover'
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
                {<CallToAction2 />}
            </section>

            <section className='relative w-full bg-gradient px-6 py-12'>
                <div className='container mx-auto max-w-3xl'>
                    <h2 className='font-bold text-center text-2xl md:text-4xl mx-auto mb-8 md:mb-8 text-white'>
                        VOCÊ NÃO VAI PAGAR + DE R$100.000 PARA ABRIR SUA AGÊNCIA!
                    </h2>
                    <div className='relative w-full md:h-[32vh] h-56 z-0'>
                        <BlurImage
                            src='/mockup2.webp'
                            alt='Mockup'
                            layout='fill'
                            className='object-contain'
                        />
                    </div>

                    <h3 className='text-white font-bold text-center mt-8 mb-4'>
                        ENTENDA A DIFERENÇA DE UM NEGÓCIO FÍSICO PARA UM DIGITAL 👇
                    </h3>

                    <div className='flex flex-col md:flex-row'>
                        <div
                            className='bg-base-100 w-full relative overflow-x-auto border-dashed border rounded-xl p-8 border-primary box-glow md:hover:scale-105 transition-all duration-500 flex flex-col justify-center items-center'>
                            <span className='text-4xl'>✅</span>
                            <span className='font-bold mb-4'>NEGÓCIO DIGITAL (A.H.O)</span>
                            <ul className='grid gap-4 text-xs'>
                                <li>✅ Retorno do investimento das primeiras semanas e escala devendas a nível nacional e
                                    internacional.
                                </li>
                                <li>
                                    ✅ Você pode emitir com milhas e técnicas de emissão desconhecidas por 99,9% das
                                    agências do Brasil.
                                </li>
                                <li>
                                    ✅ Você possui seu banco de milhas próprio, assim não dependendo do seu acúmulo.
                                </li>
                                <li>
                                    ✅ Você pode vender Gestão de Milhas para seus clientes, e ter 100% de lucro do
                                    serviço (isso aqui é o OURO em pó)
                                </li>
                            </ul>
                        </div>
                        <div className='divider md:divider-horizontal text-white h-10 md:h-auto md:w-16'>
                            <div className='relative w-24 '>
                                <BlurImage
                                    src='/vs.png'
                                    alt='Mockup'
                                    width={100}
                                    height={100}
                                    className='object-contain'
                                />
                            </div>
                        </div>
                        <div
                            className='bg-base-100 w-full relative overflow-x-auto border-dashed border rounded-xl p-8 border-error box-red-glow md:hover:scale-105 transition-all duration-500 flex flex-col justify-center items-center'>
                            <span className='text-4xl'>❌</span>
                            <span className='font-bold mb-4'>NEGÓCIO FÍSICO</span>
                            <ul className='grid gap-4 text-xs'>
                                <li>❌ Você não precisa de alto investimento (+R$100.000 ou mais) para iniciar e não
                                    precisa esperar 25 meses para ter seu retorno de volta!
                                </li>
                                <li>
                                    ❌ Você não precisa de ponto físico.
                                </li>
                                <li>
                                    ❌ Você não precisa de funcionários pra começar.
                                </li>
                                <li>
                                    ❌ Você não precisa de um fluxo de caixa de 5 meses para manter o negócio, pois nas
                                    primeiras semanas já pode fazer vendas e por dinheiro no bolso.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className='relative mx-auto py-12 px-6 bg-black text-white'>
                <h2 className='font-bold text-center text-2xl md:text-4xl mx-auto text-white'>
                    A MINHA PROPOSTA PRA VOCÊ É PRATICAMENTE INDECENTE...
                </h2>
            </section>
            <section
                className='relative mx-auto py-6 px-6 bg-[url(/bg-2.webp)] bg-cover bg-fixed bg-no-repeat'>
                <div className='container max-w-4xl px-0 mx-auto'>

                    <h1 className='md:text-center uppercase my-6 rounded-md text-xl md:text-3xl md:leading-snug font-bold text-center w-full inline-grid sm:block'
                    >
                        Você entra na AHO hoje <span
                        className='text-white bg-gradient font-bold rounded-lg px-4'>financiado</span>{' '}
                        pelos seus primeiros clientes!
                    </h1>

                    <div className='grid gap-3'>
                        <p>
                            Nós temos uma entrega de 20 a 30 leads para que você possa fazer suas primeiras vendas, mais
                            sua rede de contato, mais estratégias de tráfego pago, mais funil de indicação, mais várias
                            estratégias de vendas…
                        </p>
                        <p>
                            Mas a lógica é simples, fazendo 1 só venda de Gestão de Milhas para seu Cliente (ticket
                            médio de R$1.000) ou até mesmo 2 ou 3 passagens aéreas (lucro médio de R$800) no primeiro
                            mês já pagou o valor mensal da AHO.
                        </p>
                        <p>
                            E você vai fazendo todos os meses os lucros que você conquista na AHO pagar ela própria!
                        </p>
                        <p className='bg-gradient text-white w-fit px-2 rounded-md font-semibold'>Luiz, e se isso o que
                            você está propondo não funcionar?!</p>
                        <p>
                            Você tem 1 ano, 365 dias, para executar todos os funis, participar das aulas semanais ao
                            vivo, acessar o ViajaFlux, tirar dúvidas com seu Gerente de conta e tutor, tudo! E se mesmo
                            assim, você me mostrar que fez tudo isso e não teve nem o valor que investiu na AHO de lucro
                            eu devolvo seu dinheiro e dou mais R$1.000 do meu bolso, como pedido de desculpa!
                        </p>
                    </div>

                    <div className='font-bold text-center my-8'>
                        Não existe uma só chance de você <span
                        className='text-white rounded-md px-1 bg-gradient'>NÃO</span> ter
                        resultado.
                    </div>


                    <h2 className='text-black font-bold text-2xl md:text-4xl mb-4 text-center'>
                        Se fossemos somar:
                    </h2>

                    <div className='grid gap-2'>
                        <div
                            className='relative rounded-box shadow-md p-4 bg-gradient sm:text-lg text-sm text-white flex justify-between'>
                            Agência Home Office
                            <span>R$ 15.000</span>
                            <span className='absolute right-8 top-3 text-4xl animate-pulse'>❌</span>
                        </div>
                        <div
                            className='relative rounded-box shadow-md p-4 bg-gradient sm:text-lg text-sm text-white flex justify-between'>
                            Banco de Milhas
                            <span>R$ 997</span>
                            <span className='absolute right-8 top-3 text-4xl animate-pulse'>❌</span>
                        </div>
                        <div
                            className='relative rounded-box shadow-md p-4 bg-gradient sm:text-lg text-sm text-white flex justify-between'>
                            ViajaFlux
                            <span>R$ 2.000</span>
                            <span className='absolute right-8 top-3 text-4xl animate-pulse'>❌</span>
                        </div>
                        <div
                            className='relative rounded-box shadow-md p-4 bg-gradient sm:text-lg text-sm text-white flex justify-between'>
                            5 Fornecedores com acordos comerciais
                            <span>R$ 5.000</span>
                            <span className='absolute right-8 top-3 text-4xl animate-pulse'>❌</span>
                        </div>
                        <div
                            className='relative rounded-box shadow-md p-4 bg-gradient sm:text-lg text-sm text-white flex justify-between'>
                            Site próprio com e-mail profissional
                            <span>R$ 1.000</span>
                            <span className='absolute right-8 top-3 text-4xl animate-pulse'>❌</span>
                        </div>
                        <div
                            className='relative rounded-box shadow-md p-4 bg-gradient sm:text-lg text-sm text-white flex justify-between'>
                            Os primeiros clientes grátis
                            <span>R$ 2.000</span>
                            <span className='absolute right-8 top-3 text-4xl animate-pulse'>❌</span>
                        </div>
                        <div
                            className='relative rounded-box shadow-md p-4 bg-gradient sm:text-lg text-sm text-white flex justify-between'>
                            Aulas AO VIVO de Tráfego, Vendas, Turismo, Emissões
                            <span>R$ 10.000</span>
                            <span className='absolute right-8 top-3 text-4xl animate-pulse'>❌</span>
                        </div>
                        <div
                            className='relative rounded-box shadow-md p-4 bg-gradient sm:text-lg text-sm text-white flex justify-between'>
                            Link de pagamento com as melhores taxas do mercado
                            <span>R$ 1.000</span>
                            <span className='absolute right-8 top-3 text-4xl animate-pulse'>❌</span>
                        </div>
                    </div>

                    <div className='text-center font-bold text-xl md:text-2xl my-8 relative w-fit mx-auto'>
                        <span className='absolute right-5 -top-1 text-4xl animate-pulse'>❌</span>
                        TOTAL DE R$ 36.997
                    </div>

                    <div className='text-center font-bold text-xl md:text-2xl my-8'>
                        <span
                            className='text-white bg-gradient rounded-md px-2'>Preço de Lançamento em Janeiro de 2024</span>
                    </div>

                    <div
                        className='text-center font-bold text-2xl md:text-3xl my-8 flex flex-col relative w-fit mx-auto'>
                        <span className='absolute right-5 -top-1 text-4xl animate-pulse'>❌</span>
                        Por 12x R$ 1.500
                        <span
                            className='text-xl bg-warning w-fit mx-auto rounded-md mt-2 px-4'>ou R$ 15.000 à vista!</span>
                    </div>

                    <div className='text-center font-bold text-xl md:text-2xl my-8 max-w-md mx-auto'>
                        Os <span className='bg-warning rounded-md px-2'>20 primeiros</span>
                        {' '} que entrarem neste Pré-lançamento, terão acesso a tudo isso por:
                    </div>

                    <div className='text-center font-bold text-2xl md:text-3xl my-8 flex flex-col'>
                        Só 12x R$ 399,70
                        <span
                            className='text-xl bg-primary w-fit mx-auto rounded-md mt-2 px-4'>ou R$ 3.997 à vista!</span>
                    </div>

                    <div className='w-fit rounded-lg mx-auto bg-gradient mt-12 text-white py-2 px-6'>
                        {/* gerar cronometro de 10 minutos retrocedendo o tempo */}
                        <div className='flex flex-col gap-8 text-center'>
                            <h2 className='font-bold text-sm md:text-2xl'>
                                {expired
                                    ? 'Oferta encerrada.'
                                    : 'Atenção! Oferta por tempo limitado'}
                            </h2>
                        </div>
                    </div>

                    <div className='flex justify-center my-4'>
                        <Countdown />
                    </div>

                    {<CallToAction2 />}

                </div>
            </section>
            <section className='bg-black pt-16 pb-12'>
                <div className='container mx-auto'>
                    <div className='card-body justify-between gap-4 items-center w-full pb-0'>
                        <div className='flex gap-4 text-center'>
                            <div>
                                <h2 className='text-2xl text-white'>
                                    Ficou com qualquer dúvida?
                                </h2>
                                <p className='text-white'>
                                    Pode acionar meu time de especialistas!
                                </p>
                            </div>
                        </div>

                        <a
                            target='_blank'
                            href='https://empreendaclub.typeform.com/go-aho'
                            rel='noreferrer'
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
                        </a>
                    </div>
                </div>
                <Footer />
            </section>
        </>
    ) : (
        <></>
    )
}
