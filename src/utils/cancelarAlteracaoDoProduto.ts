export default function cancelarAlteracaoDoProduto(e: React.MouseEvent<HTMLButtonElement>, setVisibleFormularioAlterado: ((valor: boolean) => void)) {
    e.preventDefault()
    setVisibleFormularioAlterado(false)
}