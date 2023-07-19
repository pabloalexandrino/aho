import Image, { ImageProps } from 'next/image'
import { HTMLAttributes, useState } from 'react'

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface blurImageProps extends ImageProps {
    classname?: HTMLAttributes<HTMLDivElement> | string
}

export default function BlurImage({ src, className, ...props }: blurImageProps) {
    const [isLoading, setLoading] = useState(true)

    return (
        <Image
            {...props}
            src={src}
            quality={100}
            // objectFit="contain"
            className={cn(
                `duration-300 ease-in-out ${className}`,
                isLoading
                    ? 'grayscale blur-2xl scale-110'
                    : 'grayscale-0 blur-0 scale-100',
            )}
            onLoadingComplete={() => setLoading(false)}
            alt={props.alt}
        />
    )
}
