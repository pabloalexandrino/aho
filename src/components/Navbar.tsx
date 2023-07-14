import { ToastContainer } from 'react-toastify'
import BlurImage from './BlurImage'
import Checkout from './Modals/Checkout'
import Lead from './Modals/Lead'
import RecoveryOffer from './Modals/RecoveryOffer'

interface INavbar {
    className?: string
    leadRedirect?: string
}
export default function Navbar({ className, leadRedirect }: INavbar) {
    return (
        <>
            {/*<OpenModal />*/}
            <Checkout />
            <RecoveryOffer />
            <ToastContainer />
            <Lead redirectTo={leadRedirect} />

            <div className={'navbar ' + className}>
                <div className="w-full flex justify-center md:justify-start">
                    <BlurImage
                        src="/logo-alt.webp"
                        alt="Logo"
                        width={260}
                        height={60}
                        layout="intrinsic"
                        objectFit="contain"
                    />
                </div>
            </div>

            <div className='grid gap-2 mt-4 text-center leading-tight sm:leading-4 text-[11px] sm:text-base'>
                <div
                    className='relative rotate-1 z-10 h-8 sm:h-12 w-full bg-warning border-y-4 border-yellow-300 text-black font-black flex items-center justify-center'>
                    <BlurImage src={'/listras.svg'} width={200} height={130} alt={'Listras'} />
                    <div className='hidden sm:block'>
                        <BlurImage src={'/alert.svg'} width={100} height={30} alt={'Alerta'} />
                    </div>
                    ENTENDA NESSE VÍDEO COMO ENTRAR NA AHO
                    <div className='hidden sm:block'>
                        <BlurImage src={'/alert.svg'} width={100} height={30} alt={'Alerta'} />
                    </div>
                    <BlurImage src={'/listras.svg'} width={200} height={130} alt={'Listras'} />
                </div>

                <div
                    className='relative -rotate-2 h-8 sm:h-12 w-full bg-warning border-y-4 border-yellow-300 text-black font-black flex items-center justify-center'>
                    <BlurImage src={'/listras.svg'} width={200} height={130} alt={'Listras'} />
                    <div className='hidden sm:block'>
                        <BlurImage src={'/alert.svg'} width={100} height={30} alt={'Alerta'} className='hidden' />
                    </div>
                    SEM TIRAR DINHEIRO DO BOLSO
                    <div className='hidden sm:block'>
                        <BlurImage src={'/alert.svg'} width={100} height={30} alt={'Alerta'}
                                   className='hidden md:block' />
                    </div>
                    <BlurImage src={'/listras.svg'} width={200} height={130} alt={'Listras'} />
                </div>
            </div>
        </>
    )
}
