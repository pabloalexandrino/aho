import Blur from './Blur'
import VTurb from './Player/VTurb'

export default function Obrigado2(): JSX.Element {
    return (
        <div className='bg-black'>
            <div className='flex w-full bg-error mx-auto items-center justify-center gap-1'>
                <span className='mr-2'>⚠️</span>
                <h2 className='uppercase font-bold animate-pulse p-2 bg-error text-white text-center text-xs md:text-lg leading-normal max-w-xs rounded-lg'>
                    Não feche essa tela!
                </h2>
                <span className='ml-2'>⚠️</span>
            </div>

            <div className='max-w-3xl mx-auto px-6 mt-8'>

                <ol className="items-center justify-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
                    <li className="flex items-center text-gray-400 space-x-2.5 rtl:space-x-reverse">
                        <span
                            className='flex items-center justify-center w-10 h-10 rounded-full shrink-0 p-2 ring-gray-900 bg-green-900'>
                            <svg className='fill-green-400' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>
                        </span>
                        <span>
                            <h3 className='font-medium leading-tight'>Primeira Etapa</h3>
                            <p className='text-sm'>Faça seu cadastro</p>
                        </span>
                    </li>
                    <li className='flex items-center text-gray-400 space-x-2.5 rtl:space-x-reverse border rounded-lg p-4 border-amber-400 border-opacity-20'>
                        <span
                            className='flex items-center justify-center w-10 h-10 bg-amber-500 rounded-full shrink-0 p-2'>
                            <svg className='fill-black' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.09,16.09,0,0,0-6.35-12.77L141.27,128l52.38-39.6A16.05,16.05,0,0,0,200,75.64ZM72,40H184V75.64L178.23,80H77.33L72,76Zm56,78L98.67,96h58.4Zm56,98H72V180l48-36v24a8,8,0,0,0,16,0V144.08l48,36.28Z"></path></svg>
                        </span>
                        <span>
                            <h3 className='font-medium leading-tight'>Segunda Etapa</h3>
                            <p className='text-sm'>Assista o vídeo abaixo</p>
                        </span>
                    </li>
                    <li className='flex items-center text-gray-600 space-x-2.5 rtl:space-x-reverse'>
                        <span
                            className='flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full shrink-0 p-2'>
                            <svg className='fill-gray-600' xmlns='http://www.w3.org/2000/svg' width='32' height='32'
                                 fill='#000000' viewBox='0 0 256 256'><path
                                d='M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V208ZM152,88a31.91,31.91,0,0,0-24,10.86A32,32,0,0,0,72,120c0,36.52,50.28,62.08,52.42,63.16a8,8,0,0,0,7.16,0C133.72,182.08,184,156.52,184,120A32,32,0,0,0,152,88Zm-24,78.93c-13.79-7.79-40-26.75-40-46.93a16,16,0,0,1,32,0,8,8,0,0,0,16,0,16,16,0,0,1,32,0C168,140.19,141.79,159.15,128,166.93Z'></path></svg>
                        </span>
                        <span>
                            <h3 className='font-medium leading-tight'>Terceira Etapa</h3>
                            <p className='text-sm'>Agende um horário</p>
                        </span>
                    </li>
                </ol>


            </div>

            <h2 className='mt-12 font-bold uppercase text-white text-center text-2xl md:text-3xl max-w-3xl mx-auto'>
                VOCÊ ESTÁ QUASE LÁ!
            </h2>
            <p className='text-center my-3 max-w-xl mx-auto mb-8 sm:mb-0 sm:text-xl text-white'>
                <span className='text-base'>
                    Assista o vídeo abaixo 👇
                </span>
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
                            <VTurb player={'66a28701cdc831000a4db57f'}
                                   video={'99583553-0c7c-40d5-b819-534dcd7867b9'} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
