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
            quality={65}
            // objectFit="contain"
            className={cn(
                `duration-100 ease-in-out ${className}`,
                isLoading
                    ? 'blur-2xl'
                    : 'blur-0',
            )}
            onLoadingComplete={() => setLoading(false)}
            alt={props.alt}
            priority={true}
        />
    )
}
