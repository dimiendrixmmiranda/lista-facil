import handleChangeQuantidade from "@/hooks/handleChangeQuantidade"
import { useState } from "react"

interface FormularioAlterarProdutoProps {
    produto: string,
    setProduto: (valor: string) => void
    quantidade: string
    setQuantidade: (valor: string) => void
    categoria: string
    setCategoria: (valor: string) => void
    criarProduto: (
        e: React.MouseEvent<HTMLButtonElement>,
        produto: string,
        quantidade: string,
        categoria: string
    ) => void
}

export default function Formulario({ produto, quantidade, categoria, setProduto, setQuantidade, setCategoria, criarProduto }: FormularioAlterarProdutoProps) {
    const [erroQuantidade, setErroQuantidade] = useState("")

    return (
        <div className="p-4">
            <form className="bg-[--vermelho-escuro] p-4 flex flex-col gap-2 text-black max-w-[400px] mx-auto">
                <fieldset className="flex flex-col">
                    <label htmlFor="nome" className="uppercase font-bold text-white">Produto:</label>
                    <input
                        type="text"
                        name="nome"
                        id="nome"
                        className="h-[30px] p-2 rounded-md"
                        value={produto}
                        autoComplete="off"
                        onChange={(e) => setProduto(e.target.value)}
                    />
                </fieldset>
                <fieldset className="flex flex-col">
                    <label htmlFor="quantidade" className="uppercase font-bold text-white">
                        QTDE
                    </label>
                    <input
                        type="text"
                        name="quantidade"
                        id="quantidade"
                        className={`h-[30px] p-2 rounded-md ${erroQuantidade ? 'border-red-500' : ''}`}
                        value={quantidade}
                        autoComplete="off"
                        onChange={(e) => handleChangeQuantidade(e, setQuantidade, setErroQuantidade)} // Use a nova função de manipulação
                    />
                    {erroQuantidade && <p className="text-white text-sm mt-2 leading-4">{erroQuantidade}</p>}
                </fieldset>

                <fieldset className="flex flex-col">
                    <label htmlFor="categoria" className="uppercase font-bold text-white">Categoria</label>
                    <select
                        name="categoria"
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="h-[30px] px-2 rounded-md"
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
                    className="bg-black py-1 text-xl font-bold uppercase mt-2 text-white"
                    onClick={(e) => criarProduto(e, produto, quantidade, categoria)}
                    style={{ textShadow: '1px 1px 2px black' }}
                >
                    Adicionar Produto
                </button>
            </form>
        </div>
    )
}