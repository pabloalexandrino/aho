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
        pagina,
        eventId,
        value,
    } = useContext(OfferContext)
    // const [checked, setChecked] = useState(false)

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

    function redirectToCheckout() {
        if (process.env.NODE_ENV === 'production') {
            fb('Lead', 'Lead' + eventId, nameLead, emailLead, whatsappLead)
        }
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
                list: '53'
            }

            await fetch('/api/addToList', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            //CLINT
            const clint_api = pagina === 'aho-alunos' ? process.env.NEXT_PUBLIC_CLINT_ALUNOS : process.env.NEXT_PUBLIC_CLINT_TRAFEGO
            await fetch(
                clint_api + '?' +
                new URLSearchParams(data),
            )

            setLoading(false)
            redirectToCheckout()
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
                    {/* <span className="text-xs leading-tight block mt-2 opacity-30">
                        Prometemos não utilizar suas informações de contato para
                        enviar qualquer tipo de SPAM.
                    </span> */}
                </label>
            </label>
        </>
    )
}
