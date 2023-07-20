import Blur from './Blur'
import VTurb from './Player/VTurb'

export default function Obrigado(): JSX.Element {
    return (
        <div className='bg-black'>
            <div className='flex w-full bg-error mx-auto items-center justify-center gap-1'>
                <span className='mr-2'>⚠️</span>
                <h2 className='uppercase font-bold animate-pulse p-2 bg-error text-white text-center text-xs md:text-lg leading-normal max-w-xs rounded-lg'>
                    Não feche essa tela!
                </h2>
                <span className='ml-2'>⚠️</span>
            </div>

            <h2 className='mt-12 font-bold uppercase text-white text-center text-2xl md:text-3xl max-w-3xl mx-auto'>
                SEJA MUITO BEM VINDO A A.H.O! TEM 1 PRESENTE PARA VOCÊ NESSE VÍDEO.
            </h2>
            <p className='text-center my-3 max-w-xl mx-auto mb-8 sm:mb-0 sm:text-xl text-white'>
                <strong className='text-black bg-primary px-3 rounded-md'>
                    Assista-o até o final!
                </strong>
            </p>

            <section className='flex justify-center pb-12 bg-black'>
                <Blur />
                <div className='container px-6'>
                    <div className='mb-6 md:my-12 w-full max-w-5xl flex mx-auto relative'>
                        <div
                            id='overlay'
                            className='absolute w-full h-0 pb-[56.25%] rounded-xl overflow-hidden box-red-glow'
                        ></div>

                        <div
                            className='w-full flex justify-center z-20'
                            id='vsl'
                        >
                            <VTurb player={'64b92bc7e891af000a1d977a'}
                                   video={'99583553-0c7c-40d5-b819-534dcd7867b9'} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
