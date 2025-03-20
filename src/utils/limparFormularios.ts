export default function limparVarios(funcoes: ((valor: string) => void)[]) {
    funcoes.forEach(funcao => {
        funcao("")
    })
}