import { date } from 'yup'

export default function Footer() {
    return (
        <footer className="max-w-4xl px-6 py-8 pb-12 mx-auto text-white footer">
            <div className="container mx-auto">
                <p className="text-[9px] md:text-[12px] leading-normal text-center mt-6 opacity-30">
                    Fly Educacional LTDA. CNPJ: 46.333.828/0001-62<br />
                    Todos os direitos reservados - Agência Home Office® - { new Date().getFullYear() }<br /><br />
                    Nenhuma informação contida neste deve ser interpretada como
                    uma afirmação da obtenção de resultados. Qualquer referência
                    ao desempenho passado ou potencial de uma estratégia
                    abordada no conteúdo não é, e não deve ser interpretada como
                    uma recomendação ou como garantia de qualquer resultado
                    específico. Os resultados podem variar de pessoa para
                    pessoa.
                </p>
            </div>
        </footer>
    )
}
