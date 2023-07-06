import Link from 'next/link'
import BlurImage from '../BlurImage'

export default function AccessInstagram() {
    const handleCloseModal = () => {
        return document
            .getElementById('modal-access')
            ?.classList.remove('modal-open')
    }
    return (
        <>
            <div
                className="modal modal-bottom sm:modal-middle"
                id="modal-access"
            >
                <div className="h-screen w-screen relative flex items-center justify-center">
                    <div className="h-[448px] rounded-xl w-[700px] bg-white grid grid-cols-12 gap-4 relative">
                        <label
                            onClick={handleCloseModal}
                            className="btn border-transparent text-xl text-[#CCCCCC] bg-inherit btn-circle absolute right-3 top-3"
                        >
                            ✕
                        </label>
                        <div className="relative col-span-5 flex justify-center items-center">
                            <div className="w-full h-full relative">
                                <BlurImage
                                    src="/image-modal-instagram.webp"
                                    layout="fill"
                                    quality={100}
                                    className="rounded-xl object-contain"
                                    alt="Instagram"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-center flex-col col-span-7 mx-8">
                            <h1 className="text-black font-bold text-2xl">
                                Antes de ir, nos siga no{' '}
                            </h1>
                            <h2 className="text-[#FF316A] font-bold text-6xl">
                                Instagram
                            </h2>
                            <h3 className="text-[#808080] text-2xl text-center">
                                Para ter acesso a cupons e promoções exclusivas
                            </h3>
                            <span className="text-[#808080]">
                                @luiz.gregatti
                            </span>
                            <Link
                                href={
                                    'https://www.instagram.com/luiz.gregatti/'
                                }
                            >
                                <a
                                    target="_blank"
                                    className="btn btn-circle bg-[#FF316A] w-44 h-9 mt-12 text-center border-0 text-white"
                                >
                                    Seguir
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
