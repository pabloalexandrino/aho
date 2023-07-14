export default function MockupIphone({ children }: { children?: JSX.Element }) {
    return (
        <div className="mockup-phone max-w-full sm:w-auto">
            <div className="camera"></div>
            <div className="display h-full flex">
                <div className="artboard phone-1 md:phone-2 lg:phone-3 bg-gray-400 text-left relative overflow-auto rounded-[36px] translate-y-0">
                    {children}
                </div>
            </div>
        </div>
    )
}
