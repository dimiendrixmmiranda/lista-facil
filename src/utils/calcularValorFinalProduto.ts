export default function calcularValorFinalProduto(qtde: string, preco: string): number {
    const precoFormatado = parseFloat(preco.replace(',', '.'))
    const qtdeFormatado = parseFloat(qtde.replace(',', '.'))
    const operacao = qtdeFormatado * precoFormatado
    return operacao
}