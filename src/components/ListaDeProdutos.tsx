'use client';

import Produto from "@/interfaces/Produto";
import ProdutoLI from "./produtoLI/ProdutoLI";
import { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";

interface ListaDeProdutosProps {
    listaDeProdutos: Produto[]
}

export default function ListaDeProdutos({ listaDeProdutos }: ListaDeProdutosProps) {
    const [produtos, setProdutos] = useState<Produto[]>([])

    useEffect(() => {
        setProdutos(listaDeProdutos)
    }, [listaDeProdutos])

    function excluirProduto(id: number) {
        const novaLista = produtos.filter(p => p.id != id)
        setProdutos(novaLista)
        localStorage.setItem("produtos", JSON.stringify(novaLista))
    }

    function concluirProduto(id: number) {
        const novaLista = produtos.map(p =>
            p.id === id ? { ...p, concluido: !p.concluido } : p
        )
        setProdutos(novaLista);
        localStorage.setItem("produtos", JSON.stringify(novaLista));
    }

    function excluirCategoriaDeProdutos(categoria: string) {
        const novaLista = produtos.filter(p => p.categoria != categoria)
        setProdutos(novaLista)
        localStorage.setItem("produtos", JSON.stringify(novaLista))
    }

    function inserirPreco(id: number, preco: string) {
        if (!preco) return

        const precoFormatado = preco
            .replace('R$', '')
            .replace(',', '.')
            .trim()

        const numero = parseFloat(precoFormatado)
        if (isNaN(numero)) return

        const novaLista = produtos.map((p) =>
            p.id === id ? { ...p, preco: numero } : p
        )
        setProdutos(novaLista)
        localStorage.setItem("produtos", JSON.stringify(novaLista))
    }


    const categoriasUnicas = [...new Set(produtos.map(p => p.categoria))]

    return (
        <ul className="flex flex-col gap-8 p-4">
            {
                categoriasUnicas.length > 0 ? (
                    categoriasUnicas.map(categoria => (
                        <li key={categoria} className="flex flex-col bg-[--vermelho-escuro] p-2 max-w-[400px] w-full mx-auto">
                            <div className="flex justify-between">
                                <h2 className="text-xl font-bold capitalize py-2 text-white">{categoria.split('-').join(' ')}</h2>
                                <button className="text-3xl text-white" onClick={() => excluirCategoriaDeProdutos(categoria)}>
                                    <TiDelete />
                                </button>
                            </div>
                            <ul>
                                {
                                    produtos
                                        .filter(p => p.categoria === categoria)
                                        .map(produto => (
                                            <ProdutoLI
                                                key={produto.id}
                                                produto={produto}
                                                excluirProduto={excluirProduto}
                                                concluirProduto={concluirProduto}
                                                inserirPreco={inserirPreco} />
                                        ))
                                }
                            </ul>
                        </li>
                    ))
                ) : (
                    <div className="bg-[--vermelho-escuro] uppercase font-bold text-center text-xl py-4 text-white max-w-[400px] w-full mx-auto">Sem Produtos Na Lista</div>
                )
            }
        </ul>
    )
}