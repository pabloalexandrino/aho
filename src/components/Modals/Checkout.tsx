import { InputMask } from '@react-input/mask'
import { SetStateAction, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'
import { OfferContext } from '../../providers/Offer'
import fb from '../../utils/fb'

export default function Checkout() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [loading, setLoading] = useState(false)

    const { checkoutLink, pagina, eventId, value, clint } =
        useContext(OfferContext)
    // const [checked, setChecked] = useState(false)

    const schema = yup.object().shape({
        name: yup.string().required('Por favor, informe o seu nome.'),
        email: yup
            .string()
            .email('Por favor, informe um e-mail válido.')
            .required('Por favor, informe o seu e-mail.'),
        whatsapp: yup
            .string()
            .required('Por favor, informe o seu número de telefone.')
            .matches(
                /^\(\d{2}\) \d{5}-\d{4}$/,
                'Por favor, informe um número de telefone válido (exemplo: (99) 99999-9999).'
            ),
    })

    function handleInputChange(event: {
        target: { value: SetStateAction<string> }
    }) {
        setWhatsapp(event.target.value)
    }

    function redirectToCheckout() {
        //load from env
        const link = checkoutLink

        if (process.env.NODE_ENV === 'production') {
            fb('Lead', 'Lead' + eventId, name, email, whatsapp).then((r) => r)
            fb(
                'InitiateCheckout',
                'InitiateCheckout' + eventId,
                name,
                email,
                whatsapp
            ).then((r) => r)
        }

        if (link) {
            // window.location.href = `${link}?name=${name}&email=${email}&phone_number=${whatsapp}`
            const form = document.createElement('form')
            form.method = 'POST'
            form.action = link

            const nameField = document.createElement('input')
            nameField.type = 'hidden'
            nameField.name = 'name'
            nameField.value = name
            form.appendChild(nameField)

            const emailField = document.createElement('input')
            emailField.type = 'hidden'
            emailField.name = 'email'
            emailField.value = email
            form.appendChild(emailField)

            const phoneField = document.createElement('input')
            phoneField.type = 'hidden'
            phoneField.name = 'phone_number'
            phoneField.value = whatsapp
            form.appendChild(phoneField)

            document.body.appendChild(form)
            form.submit()
        }
    }

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()

        setLoading(true)

        try {
            // Validação dos dados do formulário
            await schema
                .validate({ name, email, whatsapp }, { abortEarly: false })
                .then(async () => {
                    const data = {
                        name,
                        email,
                        whatsapp,
                        pagina,
                        valor: value.toString(),
                    }
                    const url = clint ?? process.env.NEXT_PUBLIC_CLINT_LEAD
                    await fetch(url + '?' + new URLSearchParams(data))

                    //DEVZAP
                    // if (process.env.NEXT_PUBLIC_DEVZAPP_LEAD) {
                    //     await fetch(
                    //         process.env.NEXT_PUBLIC_DEVZAPP_LEAD + '?' +
                    //         new URLSearchParams({ whatsapp }),
                    //     )
                    // }

                    //DISCORD
                    // if (process.env.NEXT_PUBLIC_TELEGRAND_LEAD) {
                    //     await fetch(
                    //         process.env.NEXT_PUBLIC_TELEGRAND_LEAD + '?' +
                    //         new URLSearchParams({ name, email, whatsapp, pagina }),
                    //     )
                    // }

                    //BREVO
                    await fetch('/api/mailingList', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, email, whatsapp, pagina }),
                    })
                    setLoading(false)
                    redirectToCheckout()
                })
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const validationErrors = error.inner.map(
                    (error) => error.message
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
            <label htmlFor="checkout"></label>
            <input type="checkbox" id="checkout" className="modal-toggle" />
            <label
                htmlFor="checkout"
                className="modal modal-bottom sm:modal-middle"
            >
                <label htmlFor="" className="relative modal-box box-glow">
                    <label
                        htmlFor="checkout"
                        className="absolute btn btn-ghost btn-circle right-3 top-3"
                    >
                        ✕
                    </label>
                    <h3 className="text-2xl font-bold text-primary">
                        Inscreva-se
                    </h3>
                    <form
                        id="form"
                        className="grid gap-2 py-4"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome Completo"
                            className="w-full text-black bg-white input input-bordered input-primary"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            className="w-full text-black bg-white input input-bordered input-primary"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        <InputMask
                            mask="(__) _____-____"
                            replacement={{ _: /\d/ }}
                            name="whatsapp"
                            value={whatsapp}
                            onChange={handleInputChange}
                            className="w-full text-black bg-white input input-bordered input-primary"
                            placeholder="(XX) 9XXXX-XXXX"
                        />

                        <div className="flex justify-between modal-action">
                            {/* <div className="form-control w-52">
                                <label className="gap-3 cursor-pointer label">
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={checked}
                                        onChange={handleCheckbox}
                                    />
                                    <span className="label-text">
                                        Concordo receber comunicações
                                    </span>
                                </label>
                            </div> */}
                            <button
                                form="form"
                                type="submit"
                                className="btn btn-block btn-primary"
                                disabled={loading}
                                // className={`btn btn-block ${
                                //     !checked ? 'btn-primary' : 'btn-disabled'
                                // }`}
                            >
                                {loading && (
                                    <svg
                                        className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                )}
                                Continuar
                            </button>
                        </div>
                    </form>
                    {/* <span className="block mt-2 text-xs leading-tight opacity-30">
                        Prometemos não utilizar suas informações de contato para
                        enviar qualquer tipo de SPAM.
                    </span> */}
                </label>
            </label>
        </>
    )
}
