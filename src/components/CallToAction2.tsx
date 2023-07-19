import { useContext, useEffect, useState } from 'react'
import { OfferContext } from '../providers/Offer'

export default function CallToAction2(props: { text?: string }) {
    const { text } = props
    const [isReady, setIsReady] = useState(false)
    const { expired, chance } = useContext(OfferContext)

    useEffect(() => {
        setIsReady(true)
    }, [])

    if (!isReady) {
        return null
    }

    return (
        <>
            {expired && (
                <span className='badge badge-error mx-auto block mb-3'>
                    Oferta expirada
                </span>
            )}
            {!expired && chance && (
                <span className='badge badge-ghost mx-auto block mb-3'>
                    Você tem mais uma chance de fazer um segundo salário
                </span>
            )}
            <a
                href='https://empreendaclub.typeform.com/go-aho'
                className={`btn md:btn-lg ${
                    expired ? 'btn-warning' : 'btn-primary'
                } w-fit flex mx-auto relative`}
            >
                {text ||
                    (expired
                        ? 'RECUPERAR OFERTA'
                        : 'QUERO FAZER DE 10 A 50 MIL POR MÊS')}
                <div className='-rotate-90 ml-4 hidden md:block'>
                    <div
                        className='animate-bounce bg-lime-600 p-2 w-10 h-10 ring-1 ring-green-900/5 shadow-lg rounded-xl flex items-center justify-center'>
                        <svg
                            className='w-6 h-6 text-black'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path d='M19 14l-7 7m0 0l-7-7m7 7V3'></path>
                        </svg>
                    </div>
                </div>
            </a>
            <span className='badge border-none bg-gold-gradient text-black uppercase px-2 h-fit mx-auto block mt-3'>
                Garantia de 1 ano risco ZERO!
            </span>
        </>
    )
}
