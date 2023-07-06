import Blur from './Blur'
import Panda from './Player/Panda'

interface IVsl {
    showButton?: boolean
    float?: boolean
}

export default function Obrigado({ showButton, float }: IVsl): JSX.Element {
    const player = process.env.NEXT_PUBLIC_PLAYER_ID
    const video = 'fbd1d713-c194-44f3-906f-3a863dd0a4e6'

    return (
        <>
            <div className="flex w-full bg-error mx-auto items-center justify-center gap-1">
                <span className="mr-2">⚠️</span>
                <h2 className="uppercase font-bold animate-pulse p-2 bg-error text-white text-center text-xs md:text-lg leading-normal max-w-xs rounded-lg">
                    Não feche essa tela!
                </h2>
                <span className="ml-2">⚠️</span>
            </div>
            <section className="flex justify-center bg-center bg-[url(/bg.webp)] bg-cover pb-12">
                <Blur />
                <div className="container px-6 md:mt-6">
                    <p className="uppercase text-2xl md:text-3xl max-w-3xl mx-auto text-center text-white font-bold mt-4">
                        Você acabou de{' '}
                        <span className="bg-primary text-black">
                            ganhar 2 presentes
                        </span>{' '}
                        no valor de R$ 3.000,00 🎁
                    </p>

                    <p className="block text-base text-center mx-auto text-white mt-4 md:mt-8">
                        Assista a AULA ZERO abaixo até o final 👇🏼
                    </p>

                    <div className="my-6 md:my-12 w-full max-w-5xl flex mx-auto relative">
                        <div
                            id="overlay"
                            className="absolute w-full h-0 pb-[56.25%] rounded-xl overflow-hidden box-glow"
                        ></div>

                        <div
                            className="w-full flex justify-center z-20"
                            id="vsl"
                        >
                            {player && video && (
                                <Panda player={player} video={video} />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
