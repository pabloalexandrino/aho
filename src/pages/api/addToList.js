const SibApiV3Sdk = require('sib-api-v3-sdk')
const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKey = defaultClient.authentications['api-key']

apiKey.apiKey = process.env.SENDINBLUE_API_KEY

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, whatsapp, pagina, list } = req.body
        const apiInstance = new SibApiV3Sdk.ContactsApi()
        const contact = new SibApiV3Sdk.AddContactToList()
        const identifier = '55' + whatsapp.replace(/[-()\s]/g, '')

        try {
            const data = await apiInstance.getContactInfo(identifier)
            console.log('API called successfully. Returned data: ' + JSON.stringify(data))
            contact.emails = [data.email]

            try {
                await apiInstance.addContactToList(list, contact)
                console.log('API called successfully. Returned data: ' + JSON.stringify(data))
                res.status(200).json({ message: 'Contato confirmado com sucesso!' })
            } catch (error) {
                console.log('erro 11')
                console.error(error)
                if (error.status === 400) {
                    res.status(200).json({ message: 'Contato já cadastrado!' })
                } else {
                    res.status(500).json({ message: 'Erro ao adicionar contato.' })
                }
            }
        } catch (error) {
            console.log('erro 33')
            console.error(error)
            if (error.status === 404) {
                try {
                    const utm = req.cookies['@AHO:UTM'] || ''

                    let utmObj = {}
                    try {
                        if (utm) {
                            utmObj = JSON.parse(decodeURIComponent(utm))
                        }
                    } catch (error) {
                        console.error(error)
                    }

                    const utm_source = utmObj.utm_source || ''
                    const utm_medium = utmObj.utm_medium || ''
                    const utm_campaign = utmObj.utm_campaign || ''
                    const utm_term = utmObj.utm_term || ''
                    const utm_content = utmObj.utm_content || ''

                    const apiInstance = new SibApiV3Sdk.ContactsApi()
                    const createContact = new SibApiV3Sdk.CreateContact()

                    const date = new Date()
                        .toLocaleString('pt-BR', {
                            timeZone: 'America/Sao_Paulo',
                        })
                        .slice(0, 10)

                    const dateArray = date.split('/')
                    const dateParsed =
                        dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0]

                    createContact.updateEnabled = true
                    createContact.email = email
                    createContact.listIds = [list]
                    createContact.attributes = {
                        NOME: name,
                        WHATSAPP: '55' + whatsapp.replace(/[-()\s]/g, ''),
                        SMS: '55' + whatsapp.replace(/[-()\s]/g, ''),
                        PAGINA: pagina,
                        DATA_LEAD: dateParsed,
                        HORA_LEAD: new Date()
                            .toLocaleString('pt-BR', {
                                hour12: false,
                                timeZone: 'America/Sao_Paulo',
                            })
                            .slice(12, 14),
                        UTM_SOURCE: utm_source,
                        UTM_MEDIUM: utm_medium,
                        UTM_CAMPAIGN: utm_campaign,
                        UTM_TERM: utm_term,
                        UTM_CONTENT: utm_content,
                    }
                    const data = await apiInstance.createContact(createContact)
                    // console.log('API called successfully. Returned data: ' + JSON.stringify(data))
                    res.status(200).json({ message: 'Contato adicionado com sucesso!' })
                } catch (error) {
                    // console.error(error)
                    if (error.status === 400) {
                        res.status(200).json({ message: 'Contato já cadastrado!' })
                    } else {
                        res.status(500).json({ message: 'Erro ao adicionar contato.' })
                    }
                }
            } else {
                res.status(500).json({ message: 'Erro ao adicionar contato.' })
            }
        }
    }
}
