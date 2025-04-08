'use client';

import Produto from "@/interfaces/Produto";
import ProdutoLI from "./produtoLI/ProdutoLI";
import { TiDelete } from "react-icons/ti";
import CalcularPrecoFinalProduto from "@/utils/calcularPrecoFinalProduto";

interface ListaDeProdutosProps {
    listaDeProdutos: Produto[]
    excluirProduto: (id: number) => void
    concluirProduto: (id: number) => void
    inserirPreco: (id: number, preco: string) => void
    excluirCategoriaDeProdutos: (categoria: string) => void
    alterarProduto: (produto: Produto) => void
}

export default function ListaDeProdutos({
    listaDeProdutos,
    excluirProduto,
    concluirProduto,
    inserirPreco,
    excluirCategoriaDeProdutos,
    alterarProduto
}: ListaDeProdutosProps) {
    const categoriasUnicas = Array.from(new Set(listaDeProdutos.map(p => p.categoria)));

    return (
        <ul className="flex flex-col gap-8 p-4">
            {
                categoriasUnicas.length > 0 ? (
                    categoriasUnicas.map(categoria => (
                        <li key={categoria} className="relative flex flex-col bg-[--vermelho-escuro] p-2 max-w-[400px] w-full mx-auto text-white">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold capitalize py-2">{categoria.split('-').join(' ')}</h2>
                                <button className="text-3xl" onClick={() => excluirCategoriaDeProdutos(categoria)}>
                                    <TiDelete />
                                </button>
                            </div>
                            <ul>
                                {
                                    listaDeProdutos
                                        .filter(p => p.categoria === categoria)
                                        .map(produto => (
                                            <ProdutoLI
                                                key={produto.id}
                                                produto={produto}
                                                excluirProduto={excluirProduto}
                                                concluirProduto={concluirProduto}
                                                inserirPreco={inserirPreco}
                                                alterarProduto={alterarProduto}
                                            />
                                        ))
                                }
                            </ul>
                            <div className="py-1 mt-2">
                                <p className="uppercase font-bold text-xl text-center">
                                    Preço Final: R$
                                    {
                                        listaDeProdutos
                                            .filter(p => p.categoria == categoria)
                                            .map(p => CalcularPrecoFinalProduto(p.quantidade, p.preco))
                                            .reduce((a, b) => a + b)
                                            .toFixed(2)
                                    }
                                </p>
                            </div>
                        </li>
                    ))
                ) : (
                    <div className="bg-[--vermelho-escuro] uppercase font-bold text-center text-xl py-4 text-white max-w-[400px] w-full mx-auto rounded-xl shadow">
                        Sem Produtos Na Lista
                    </div>
                )
            }
        </ul>
    )
}
