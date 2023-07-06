import { useContext, useEffect, useState } from 'react'
import { OfferContext } from '../../providers/Offer'
import { setCookies } from '../../utils/useCookies'

export default function RecoveryOffer() {
    const [isReady, setIsReady] = useState(false)
    const { setTargetDate, setChance, setExpired } = useContext(OfferContext)

    function newChance() {
        const target = new Date().setMinutes(
            new Date().getMinutes() +
                parseInt(process.env.NEXT_PUBLIC_TIME_2 ?? '0')
        )
        setTargetDate(target.toString())
        setChance('true')
        setExpired(false)
        setCookies('@AHO:Countdown', target, 60 * 60 * 24 * 7)
        setCookies('@AHO:Chance', 'true', 60 * 60 * 24 * 7)

        // va.track('Active2Chance')
        // fb('Active2Chance', 'rcm')
        // TagManager.dataLayer({
        //     dataLayer: {
        //         event: 'Active2Chance',
        //         page: 'click',
        //     },
        // })
    }

    useEffect(() => {
        setIsReady(true)
    }, [])

    if (!isReady) {
        return null
    }

    return (
        <>
            <label htmlFor="modalChance"></label>
            <input
                aria-labelledby="open modal"
                type="checkbox"
                id="modalChance"
                className="modal-toggle"
            />
            <label
                htmlFor="modalChance"
                className="modal modal-bottom sm:modal-middle cursor-pointer box-glow"
            >
                <label className="modal-box relative" htmlFor="">
                    <label
                        htmlFor="modalChance"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>

                    <h3 className="font-bold text-2xl text-error">
                        Chance única! Recuperar oferta
                    </h3>

                    <div className="my-4">
                        <p>
                            A oferta expirou, mas você pode aproveitar essa
                            chance única de fazer um segundo salário.
                        </p>
                        <p className="text-warning text-center mt-8">
                            Ganhe mais {process.env.NEXT_PUBLIC_TIME_2 ?? '0'}{' '}
                            minutos de oferta
                        </p>
                    </div>
                    {/* Button to newChance() */}

                    <label
                        htmlFor="modalChance"
                        className="btn btn-primary btn-block"
                        onClick={newChance}
                    >
                        Recuperar oferta <span className="ml-2">→</span>
                    </label>
                </label>
            </label>
        </>
    )
}
