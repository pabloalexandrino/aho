import { LegacyRef, useRef } from 'react'
import { useParallax } from 'react-scroll-parallax'
import BlurImage from './BlurImage'

interface IWarranty {
    penSpeed?: number
}

export default function Warranty({ penSpeed }: IWarranty) {
    const target = useRef<HTMLDivElement>(null)

    const warranty = useParallax({
        speed: 1,
        targetElement: target.current!,
    })

    const pen = useParallax({
        speed: penSpeed ?? -200,
        targetElement: target.current!,
    })

    return (
        <div ref={target}>
            <div
                ref={warranty.ref as LegacyRef<HTMLDivElement>}
                className='relative w-full h-96 md:h-screen'
            >
                <BlurImage
                    src='/warranty.webp'
                    layout='fill'
                    alt='Garantia'
                    className='object-contain'
                />
            </div>
            <div
                ref={pen.ref as LegacyRef<HTMLDivElement>}
                className='relative z-0 ml-auto w-[60px] h-[30vh] md:h-[70vh] hidden lg:flex -mt-[40vh] md:-mt-[80vh]'
            >
                <BlurImage
                    src='/pen.webp'
                    layout='fill'
                    alt='Caneta'
                    className='object-contain'
                />
            </div>
        </div>
    )
}
