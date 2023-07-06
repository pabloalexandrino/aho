interface BlurProps {
    direction?: 'left' | 'right'
}
export default function Blur({ direction }: BlurProps) {
    return !direction || direction === 'left' ? (
        <span className="hidden absolute bg-radial-gradient opacity-[.15] pointer-events-none lg:inline-flex left-[-20%] -top-24 w-[640px] h-[640px]"></span>
    ) : (
        <span className="hidden absolute bg-radial-gradient opacity-[.15] pointer-events-none lg:inline-flex right-[-20%] top-0 w-[640px] h-[640px]"></span>
    )
}
