import BlurImage from './BlurImage'

//type props above

interface TestimonalProps {
    name: string
    description: string
    src: string
}

export default function Testimonal({
    src,
    name,
    description,
}: TestimonalProps) {
    return (
        <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg mt-20">
            <div className="flex justify-center md:justify-end -mt-16 relative w-20 h-20">
                <BlurImage
                    alt="Profile"
                    layout="fill"
                    className="rounded-full border-2 border-primary"
                    src={`${
                        src ??
                        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80'
                    }`}
                />
            </div>
            <div>
                <h2 className="text-gray-800 text-3xl font-semibold">{name}</h2>
                <p className="mt-2 text-gray-600">
                    {description ??
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!'}
                </p>
            </div>
            {/* <div className="flex justify-end mt-4">
                <a href="#" className="text-xl font-medium text-indigo-500">
                    John Doe
                </a>
            </div> */}
        </div>
    )
}
