import BlurImage from './BlurImage'

export default function Chat(props: {
    children: string
    direction?: 'start' | 'end'
    photo?: string
}) {
    return (
        <div className={`chat chat-${props.direction ?? 'start'} text`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    {props.photo ? (
                        <BlurImage
                            src={props.photo}
                            alt="Avatar"
                            className="rounded-full"
                            layout="fill"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    )}
                </div>
            </div>
            <div className={`chat-bubble chat-primary`}>{props.children}</div>
        </div>
    )
}
