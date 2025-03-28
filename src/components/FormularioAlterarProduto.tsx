interface FormularioAlterarProdutoProps{
    produtoAlterado: string,
    setProdutoAlterado: (valor: string) => void
    quantidadeAlterado: string
    setQuantidadeAlterado: (valor: string) => void
    categoriaAlterado: string
    setCategoriaAlterado: (valor: string) => void
    precoAlterado: string
    setPrecoAlterado: (valor: string) => void
    itemPegoAlterado: boolean
    setItemPegoAlterado: (valor: boolean) => void
    salvarAlteracaoDoProduto: (evento: React.MouseEvent<HTMLButtonElement>) => void
    setVisibleFormularioAlterado: (valor: boolean) => void,
    cancelarAlteracaoDoProduto: (event: React.MouseEvent<HTMLButtonElement>, setVisibleFormularioAlterado: (valor: boolean) => void) => void
}

export default function FormularioAlterarProduto({ produtoAlterado, quantidadeAlterado, categoriaAlterado, precoAlterado, itemPegoAlterado, setProdutoAlterado, setQuantidadeAlterado, setCategoriaAlterado, setPrecoAlterado, setItemPegoAlterado, salvarAlteracaoDoProduto, setVisibleFormularioAlterado, cancelarAlteracaoDoProduto}: FormularioAlterarProdutoProps) {
    return (
        <div className="absolute top-[50%] left-[50%] w-full max-w-[300px]" style={{ transform: 'translate(-50%, -50%)' }}>
            <form className="bg-orange-400 p-2 rounded-lg flex flex-col gap-2 text-black">
                <fieldset className="flex flex-col">
                    <label htmlFor="nomeAlterado">Produto:</label>
                    <input
                        type="text"
                        name="nomeAlterado"
                        id="nomeAlterado"
                        className="h-[30px] p-2"
                        value={produtoAlterado}
                        onChange={(e) => setProdutoAlterado(e.target.value)}
                    />
                </fieldset>
                <fieldset className="flex flex-col">
                    <label htmlFor="quantidadeAlterado">QTDE</label>
                    <input
                        type="text"
                        name="quantidadeAlterado"
                        id="quantidadeAlterado"
                        className="h-[30px] p-2"
                        value={quantidadeAlterado}
                        onChange={(e) => setQuantidadeAlterado(e.target.value)}
                    />
                </fieldset>
                <fieldset className="flex flex-col">
                    <label htmlFor="categoriaAlterado">Categoria</label>
                    <select
                        name="categoriaAlterado"
                        id="categoriaAlterado"
                        value={categoriaAlterado}
                        onChange={(e) => setCategoriaAlterado(e.target.value)}
                        className="h-[30px] px-2"
                    >
                        <option value="">Selecione</option>
                        <option value="geral">Geral</option>
                        <option value="hortifruti">Hortifruti</option>
                        <option value="bebidas">Bebidas</option>
                        <option value="carnes">Carnes</option>
                        <option value="frios">Frios</option>
                        <option value="congelados">Congelados</option>
                        <option value="produtos-de-limpeza">Produtos de Limpeza</option>
                        <option value="higiene-pessoal">Higiene Pessoal</option>
                        <option value="petshop">Petshop</option>
                        <option value="outros">Outros</option>
                    </select>
                </fieldset>

                <fieldset className="flex flex-col">
                    <label htmlFor="precoAlterado">Preco</label>
                    <input type="text" name="precoAlterado" id="precoAlterado" value={precoAlterado}
                        onChange={(e) => setPrecoAlterado(e.target.value)} />
                </fieldset>

                <fieldset className="flex">
                    <label htmlFor="itemPegoAlterado">Item ja foi pego?</label>
                    <input type="checkbox" name="itemPegoAlterado" id="itemPegoAlterado" checked={itemPegoAlterado} onChange={(e) => setItemPegoAlterado(e.target.checked)} />
                </fieldset>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        className="bg-green-500 py-1 text-xl font-bold uppercase mt-2"
                        onClick={(e) => salvarAlteracaoDoProduto(e)}
                    >
                        Alterar
                    </button>
                    <button
                        className="bg-green-500 py-1 text-xl font-bold uppercase mt-2"
                        onClick={(e) => cancelarAlteracaoDoProduto(e, setVisibleFormularioAlterado)}
                    >
                        Cancelar
                    </button>

                </div>
            </form>
        </div>
    )
}