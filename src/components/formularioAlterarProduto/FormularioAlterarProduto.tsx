'use client'
import { useState } from "react";
import Produto from "@/interfaces/Produto";

interface FormularioAlterarProdutoProps {
    elementoProduto: Produto
    onCancelar: () => void
    onSalvar: (produto: Produto) => void
}

export default function FormularioAlterarProduto({ elementoProduto, onCancelar, onSalvar }: FormularioAlterarProdutoProps) {
    const [produto, setProduto] = useState(elementoProduto.produto);
    const [quantidade, setQuantidade] = useState(elementoProduto.quantidade);
    const [categoria, setCategoria] = useState(elementoProduto.categoria);

    return (
        <div className="bg-black/80 fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
            <form
                className="bg-[--vermelho-escuro] p-4 flex flex-col gap-4 text-white w-[90%] max-w-[400px] rounded-md shadow"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSalvar({ ...elementoProduto, produto, quantidade, categoria });
                }}
            >
                <h2 className="text-xl font-bold">Editar Produto</h2>

                <label className="flex flex-col gap-1">
                    Nome:
                    <input
                        className="text-black p-2 rounded"
                        value={produto}
                        onChange={(e) => setProduto(e.target.value)}
                    />
                </label>

                <label className="flex flex-col gap-1">
                    Quantidade:
                    <input
                        className="text-black p-2 rounded"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                    />
                </label>

                <label className="flex flex-col gap-1">
                    Categoria:
                    <select
                        className="text-black p-2 rounded"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
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
                </label>

                <div className="flex justify-between mt-4">
                    <button type="submit" className="bg-green-600 px-4 py-2 rounded font-bold">Salvar</button>
                    <button type="button" className="bg-red-600 px-4 py-2 rounded font-bold" onClick={onCancelar}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}
