import { InputMask } from '@react-input/mask'
import { SetStateAction, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'
import { OfferContext } from '../../providers/Offer'
import fb from '../../utils/fb'

interface ILead {
    redirectTo?: string | undefined
}

export default function Lead({ redirectTo }: ILead) {
    const [nameLead, setNameLead] = useState('')
    const [emailLead, setEmailLead] = useState('')
    const [whatsappLead, setWhatsappLead] = useState('')
    const [loading, setLoading] = useState(false)

    const {
        eventId,
        pagina,
        value,
    } = useContext(OfferContext)

    const schema = yup.object().shape({
        nameLead: yup.string().required('Por favor, informe o seu nome.'),
        emailLead: yup
            .string()
            .email('Por favor, informe um e-mail válido.')
            .required('Por favor, informe o seu e-mail.'),
        whatsappLead: yup
            .string()
            .required('Por favor, informe o seu número de telefone.')
            .matches(
                /^\(\d{2}\) \d{5}-\d{4}$/,
                'Por favor, informe um número de telefone válido (exemplo: (99) 99999-9999).',
            ),
    })

    function handleInputChangeLead(event: {
        target: { value: SetStateAction<string> }
    }) {
        setWhatsappLead(event.target.value)
    }

    function sendPixel() {
        // if (process.env.NODE_ENV === 'production') {
            fb('Lead', 'Lead' + eventId, nameLead, emailLead, whatsappLead)
                .then((r) => r)
        // }
        window.location.href = pagina === 'aho-trafego' ? process.env.NEXT_PUBLIC_WHATSAPP_TRAFEGO! : process.env.NEXT_PUBLIC_WHATSAPP_ALUNOS!
    }

    const handleSubmitLead = async (event: { preventDefault: () => void }) => {
        event.preventDefault()

        setLoading(true)

        try {
            // Validação dos dados do formulário
            await schema.validate(
                { nameLead, emailLead, whatsappLead },
                { abortEarly: false },
            )

            const data = {
                name: nameLead,
                email: emailLead,
                whatsapp: whatsappLead,
                pagina,
                valor: value.toString(),
            }

            await fetch('/api/addToList', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, list: 53 }),
            })

            //CLINT
            const clint_api = pagina === 'aho-alunos' ? process.env.NEXT_PUBLIC_CLINT_ALUNOS : process.env.NEXT_PUBLIC_CLINT_TRAFEGO
            await fetch(
                clint_api + '?' +
                new URLSearchParams(data),
            )

            setLoading(false)
            sendPixel()
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const validationErrors = error.inner.map(
                    (error) => error.message,
                )
                validationErrors.forEach((message) => {
                    toast.error(message)
                })
                setLoading(false)
            }
        }
    }

    return (
        <>
            {/*<label htmlFor={'lead'}*/}
            {/*       className='btn rounded-md btn-lg btn-block btn-success border-8 border-green-700 mt-3'>*/}
            {/*    <svg className='absolute left-6' width='23' height='27' viewBox='0 0 23 27'*/}
            {/*         fill='none'*/}
            {/*         xmlns='http://www.w3.org/2000/svg'>*/}
            {/*        <path*/}
            {/*            d='M19.188 8.21774C18.7509 8.21636 18.3172 8.29375 17.9074 8.44595C17.5391 7.68779 16.9198 7.08045 16.1546 6.72678C15.3895 6.37311 14.5257 6.29504 13.7096 6.50571V3.65227C13.7096 2.6837 13.3248 1.75468 12.6398 1.06969C11.9549 0.384797 11.0259 0 10.0572 0C9.08854 0 8.15961 0.384797 7.47463 1.06969C6.78973 1.75468 6.40493 2.6837 6.40493 3.65227V11.28C5.8074 10.5948 4.97581 10.1571 4.07276 10.0525C3.16971 9.94782 2.26004 10.1837 1.52165 10.7141C0.783272 11.2444 0.269232 12.0311 0.0799716 12.9203C-0.109203 13.8095 0.0399893 14.7373 0.498393 15.5223L1.03255 16.4628C4.93367 23.3383 6.71535 26.4793 12.3399 26.4793C15.1239 26.4762 17.7929 25.369 19.7615 23.4004C21.73 21.4318 22.8373 18.7628 22.8403 15.9789V11.87C22.8403 10.9013 22.4555 9.97242 21.7705 9.28743C21.0856 8.60254 20.1566 8.21774 19.188 8.21774ZM20.1011 15.9789C20.0987 18.0365 19.2801 20.0092 17.8252 21.4642C16.3702 22.9192 14.3976 23.7376 12.3399 23.74C8.45928 23.74 7.37617 22.0908 3.4146 15.1057L2.87924 14.1607C2.87872 14.1581 2.87872 14.1553 2.87924 14.1527C2.75817 13.9429 2.72541 13.6936 2.78809 13.4597C2.85086 13.2258 3.00392 13.0263 3.21373 12.9052C3.42346 12.7841 3.67274 12.7513 3.90671 12.8141C4.14069 12.8768 4.34009 13.0298 4.46117 13.2396C4.46804 13.2533 4.47604 13.2659 4.48404 13.2796L6.61603 16.7036C6.77417 16.9543 7.00934 17.147 7.28631 17.2526C7.56328 17.3583 7.86699 17.3713 8.15196 17.2896C8.43693 17.2079 8.68767 17.036 8.86661 16.7996C9.04547 16.5633 9.14289 16.2753 9.1441 15.9789V3.65227C9.1441 3.41013 9.24032 3.17787 9.4116 3.00667C9.58281 2.83547 9.81506 2.73925 10.0572 2.73925C10.2993 2.73925 10.5316 2.83547 10.7029 3.00667C10.8741 3.17787 10.9703 3.41013 10.9703 3.65227V11.4135C10.9703 11.7767 11.1146 12.125 11.3715 12.3819C11.6283 12.6388 11.9766 12.7831 12.3399 12.7831C12.7032 12.7831 13.0515 12.6388 13.3083 12.3819C13.5652 12.125 13.7096 11.7767 13.7096 11.4135V10.0439C13.7096 9.80173 13.8057 9.56947 13.977 9.39818C14.1482 9.22698 14.3804 9.13076 14.6226 9.13076C14.8647 9.13076 15.097 9.22698 15.2683 9.39818C15.4395 9.56947 15.5357 9.80173 15.5357 10.0439V12.3265C15.5357 12.6898 15.68 13.0382 15.9368 13.295C16.1937 13.5519 16.542 13.6961 16.9053 13.6961C17.2685 13.6961 17.6169 13.5519 17.8737 13.295C18.1307 13.0382 18.2749 12.6898 18.2749 12.3265V11.87C18.2749 11.6279 18.3711 11.3956 18.5424 11.2244C18.7136 11.0531 18.9458 10.9569 19.188 10.9569C19.4301 10.9569 19.6624 11.0531 19.8337 11.2244C20.0049 11.3956 20.1011 11.6279 20.1011 11.87V15.9789Z'*/}
            {/*            fill='#02110C' />*/}
            {/*    </svg>*/}

            {/*    Fazer inscrição gratuitamente*/}
            {/*</label>*/}

            <input type='checkbox' id='lead' className='modal-toggle' />
            <label
                htmlFor='lead'
                className='modal modal-bottom sm:modal-middle'
            >
                <label htmlFor='' className='modal-box relative box-red-glow'>
                    <label
                        htmlFor='lead'
                        className='btn btn-ghost btn-circle absolute right-3 top-3'
                    >
                        ✕
                    </label>
                    <h3 className='font-bold text-2xl text-error'>
                        Inscrição
                    </h3>
                    <p className={'text-xs'}>Após o cadastro, você será redirecionado para o nosso grupo do WhatsApp.
                        Não fique de fora!</p>
                    <form
                        id='formLead'
                        className='py-4 grid gap-2'
                        onSubmit={handleSubmitLead}
                    >
                        <input
                            type='text'
                            name='name_lead'
                            placeholder='Nome Completo'
                            className='input input-bordered input-error w-full bg-white text-black'
                            value={nameLead}
                            onChange={(event) =>
                                setNameLead(event.target.value)
                            }
                        />
                        <input
                            type='email'
                            name='email_lead'
                            placeholder='E-mail'
                            className='input input-bordered input-error w-full bg-white text-black'
                            value={emailLead}
                            onChange={(event) =>
                                setEmailLead(event.target.value)
                            }
                        />

                        <InputMask
                            mask='(__) _____-____'
                            replacement={{ _: /\d/ }}
                            value={whatsappLead}
                            name='whatsapp_lead'
                            onChange={handleInputChangeLead}
                            className='input input-bordered input-error w-full bg-white text-black'
                            placeholder='(XX) 9XXXX-XXXX'
                        />

                        <div className='modal-action flex justify-between'>
                            <button
                                form='formLead'
                                type='submit'
                                className='btn btn-block btn-primary'
                                disabled={loading}
                                // className={`btn btn-block ${
                                //     !checked ? 'btn-primary' : 'btn-disabled'
                                // }`}
                            >
                                {loading && (
                                    <svg
                                        className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                    >
                                        <circle
                                            className='opacity-25'
                                            cx='12'
                                            cy='12'
                                            r='10'
                                            stroke='currentColor'
                                            strokeWidth='4'
                                        ></circle>
                                        <path
                                            className='opacity-75'
                                            fill='currentColor'
                                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                        ></path>
                                    </svg>
                                )}
                                Continuar
                            </button>
                        </div>
                    </form>
                </label>
            </label>
        </>
    )
}
