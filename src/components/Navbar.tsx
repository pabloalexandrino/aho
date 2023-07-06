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
                        src="/logo.svg"
                        alt="Logo"
                        width={260}
                        height={60}
                        layout="intrinsic"
                        objectFit="contain"
                    />
                </div>
            </div>
        </>
    )
}
