interface IPanda {
    player: string | undefined
    video: string | undefined
    vertical?: boolean
}

export default function Panda({ player, video, vertical = false }: IPanda) {
    return (
        <div className="w-full h-auto relative flex">
            <div
                className={`relative ${
                    vertical ? 'pb-[182.6%]' : 'pb-[56.25%]'
                } w-full h-0 rounded-xl overflow-hidden box-glow grid place-items-center`}
            >
                <iframe
                    id={video}
                    src={`https://player-${player}.tv.pandavideo.com.br/embed/?v=${video}`}
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                    allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                    width={`${vertical ? '360' : '720'}`}
                    height={`${vertical ? '720' : '320'}`}
                    title="Panda Video Player"
                ></iframe>
            </div>
        </div>
    )
}
