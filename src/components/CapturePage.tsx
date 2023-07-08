import BlurImage from './BlurImage'
import LeadForm from './LeadForm'
import Lead from './Modals/Lead'

interface CapturePageProps {
    form?: boolean
}
export default function CapturePage({ form }: CapturePageProps) {
    return (
        <>
            <div
                className='grid md:grid-cols-2 h-full bg-black mx-auto bg-contain w-full bg-[url(/../luiz.webp)] bg-no-repeat bg-right-top'>
                <div className='text-white px-6 md:px-24 mt-10 md:max-w-3xl xl:max-w-4xl sm:col-span-2 col-span-1'>
                    <div className='relative w-40 h-16 md:w-[348px] md:h-[138px]'>
                        <BlurImage src={'/logo.webp'} layout={'fill'} className='object-contain' />
                    </div>
                    <h1 className='uppercase mb-4 md:mb-8 rounded-md text-xl md:text-3xl md:leading-snug text-justify inline-block my-8 mt-32 md:mt-8'
                    >
                        Lucre de <span className='bg-gradient font-bold rounded-lg px-4'>10 a 50 mil reais</span>
                        {' '}por mês (ou mais) com sua agência de viagens home office!
                    </h1>
                    <h3 className='text-sm md:text-xl'>
                        O modelo de negócio que não depende de milhas e entrega seus primeiros clientes de graça!
                    </h3>

                    <div className='flex gap-6 mt-10 flex-col sm:flex-row text-xs'>
                        <div className='flex items-center gap-2'>
                            <BlurImage src={'/calendar.webp'} width={20} height={20} />
                            <span className='opacity-50'>17 e 19 de Julho</span>
                        </div>

                        <div className='flex items-center gap-2'>
                            <BlurImage src={'/ticket.webp'} width={20} height={20} />
                            <span className='opacity-50'>Evento online e gratuito</span>
                        </div>
                    </div>

                    <div className='card card-compact w-full h-fit rounded-lg my-4 md:my-2'>
                        {!form ? (
                            <Lead />
                        ) : (
                            <LeadForm />
                        )}
                    </div>
                </div>
                <div></div>
                <div className='flex justify-center flex-col items-center my-8 md:my-24 col-span-2'>
                    <h3 className='text-center text-white text-3xl font-bold'>
                        O que você irá aprender<br />nessa jornada
                    </h3>
                    <div className='grid md:grid-cols-2 mt-8 text-center gap-4'>
                        <div className='text-center'>
                            <div className='relative w-[380px] h-[200px] bg-base-300'>
                                <BlurImage
                                    layout={'fill'}
                                    src='/luiz.webp'
                                    alt='Luiz'
                                    className='object-contain'
                                />
                            </div>
                            <h4 className='text-white text-lg mt-4'>17/07 às 19:30h</h4>
                            <p className='max-w-[300px] mx-auto'>
                                AULA 01 - A metodologia AHO, que NÃO depende de Milhas
                                e entrega os seus Primeiros Clientes Grátis!
                            </p>
                        </div>

                        <div className='text-center'>
                            <div className='relative w-[380px] h-[200px] bg-base-300'>
                                <BlurImage
                                    layout={'fill'}
                                    src='/luiz.webp'
                                    alt='Luiz'
                                    className='object-contain'
                                />
                            </div>
                            <h4 className='text-white text-lg mt-4'>19/07 às 19:30h</h4>
                            <p className='max-w-[300px] mx-auto'>
                                AULA 2- A DESCOBERTA: Como criar a sua Agência Home
                                Office &quot;sem investir&quot; o seu DINHEIRO!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
