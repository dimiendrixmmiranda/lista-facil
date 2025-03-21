interface FormularioAlterarProdutoProps{
    produto: string,
    setProduto: (valor: string) => void
    quantidade: string
    setQuantidade: (valor: string) => void
    categoria: string
    setCategoria: (valor: string) => void
    criarProduto: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Formulario({produto, quantidade, categoria, setProduto, setQuantidade, setCategoria, criarProduto}:FormularioAlterarProdutoProps) {
    return (
        <div>
            <form className="bg-orange-400 p-2 rounded-lg flex flex-col gap-2 text-black">
                <fieldset className="flex flex-col">
                    <label htmlFor="nome">Produto:</label>
                    <input
                        type="text"
                        name="nome"
                        id="nome"
                        className="h-[30px] p-2"
                        value={produto}
                        onChange={(e) => setProduto(e.target.value)}
                    />
                </fieldset>
                <fieldset className="flex flex-col">
                    <label htmlFor="quantidade">QTDE</label>
                    <input
                        type="text"
                        name="quantidade"
                        id="quantidade"
                        className="h-[30px] p-2"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                    />
                </fieldset>
                <fieldset className="flex flex-col">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        name="categoria"
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
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
                <button
                    className="bg-green-500 py-1 text-xl font-bold uppercase mt-2"
                    onClick={(e) => criarProduto(e)}
                >
                    Adicionar Produto
                </button>
            </form>
        </div>
    )
}