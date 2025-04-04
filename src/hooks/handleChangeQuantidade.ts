export default function handleChangeQuantidade(e: React.ChangeEvent<HTMLInputElement>, setQuantidade:(valor: string) => void, setErroQuantidade: (valor: string) => void) {
    const valorDigitado = e.target.value
    setQuantidade(valorDigitado)
    setErroQuantidade("")
    
    const valorTrimmed = valorDigitado.trim()
    const regex = /^(\d+([.,]\d+)?(kg|g|un))$/gi

    if (valorTrimmed !== "" && !regex.test(valorTrimmed)) {
        setErroQuantidade("Formato inválido. Use: 1kg, 1,5kg, 0,500g, 1un, 10un")
    }
};