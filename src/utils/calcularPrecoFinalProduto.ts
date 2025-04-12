export default function CalcularPrecoFinalProduto(quantidade: string, preco: number) {
    const qtd = parseFloat(quantidade.split(/g|un|kg/)[0].replace(',', '.'))
    const total = qtd * preco
    return total
}