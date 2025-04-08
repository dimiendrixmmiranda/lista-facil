'use client';
import ForcarAutenticacao from "@/components/autenticacao/forcarAutenticacao";
import Formulario from "@/components/Formulario";
import FormularioAlterarProduto from "@/components/formularioAlterarProduto/FormularioAlterarProduto";
import ListaDeProdutos from "@/components/ListaDeProdutos";
import Template from "@/components/template/Template";
import useListaDeProdutos from "@/hooks/useListaDeProdutos";
import Produto from "@/interfaces/Produto";
import CalcularPrecoFinalProduto from "@/utils/calcularPrecoFinalProduto";
import criarId from "@/utils/criarId";
import { useState } from "react";

export default function Page() {
    const [produto, setProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [categoria, setCategoria] = useState('');

    const [listaDeProdutos, setListaDeProdutos] = useListaDeProdutos();
    const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

    function criarProduto(e: React.FormEvent, produto: string, quantidade: string, categoria: string) {
        e.preventDefault();

        if (!produto || !quantidade || !categoria) {
            alert("Preencha todos os campos!");
            return;
        }

        const novoProduto = {
            id: criarId(),
            produto,
            quantidade,
            categoria,
            concluido: false,
            preco: 0
        };

        // **Corrigido:** Use setListaDeProdutos para atualizar o estado
        setListaDeProdutos(prevState => [...prevState, novoProduto]);

        // O useEffect no hook useListaDeProdutos cuidará de atualizar o localStorage
        setProduto('');
        setQuantidade('');
        setCategoria('');
    }


    function excluirProduto(id: number) {
        const novaLista = listaDeProdutos.filter(p => p.id !== id);
        setListaDeProdutos(novaLista);
    }

    function concluirProduto(id: number) {
        const novaLista = listaDeProdutos.map(p =>
            p.id === id ? { ...p, concluido: !p.concluido } : p
        );
        setListaDeProdutos(novaLista);
    }

    function excluirCategoriaDeProdutos(categoria: string) {
        const novaLista = listaDeProdutos.filter(p => p.categoria !== categoria);
        setListaDeProdutos(novaLista);
    }

    function inserirPreco(id: number, preco: string) {
        const numero = parseFloat(preco.replace('R$', '').replace(',', '.').trim());
        if (isNaN(numero)) return;
        const novaLista = listaDeProdutos.map(p =>
            p.id === id ? { ...p, preco: numero } : p
        );
        setListaDeProdutos(novaLista);
    }

    function alterarProduto(produto: Produto) {
        setProdutoEditando(produto)
    }

    function salvarProdutoAlterado(produtoAlterado: Produto) {
        const novaLista = listaDeProdutos.map(p =>
            p.id === produtoAlterado.id ? produtoAlterado : p
        )
        setListaDeProdutos(novaLista)
        setProdutoEditando(null)
    }

    return (
        <ForcarAutenticacao>
            <Template>
                <div className="text-black bg-[--verde] min-h-[70vh] sm:min-h-[85vh]">
                    <Formulario
                        produto={produto}
                        quantidade={quantidade}
                        categoria={categoria}
                        setProduto={setProduto}
                        setQuantidade={setQuantidade}
                        setCategoria={setCategoria}
                        criarProduto={(e) => criarProduto(e, produto, quantidade, categoria)}
                    />
                    <ListaDeProdutos
                        listaDeProdutos={listaDeProdutos}
                        excluirProduto={excluirProduto}
                        concluirProduto={concluirProduto}
                        excluirCategoriaDeProdutos={excluirCategoriaDeProdutos}
                        inserirPreco={inserirPreco}
                        alterarProduto={alterarProduto}
                    />
                    {produtoEditando && (
                        <FormularioAlterarProduto
                            elementoProduto={produtoEditando}
                            onCancelar={() => setProdutoEditando(null)}
                            onSalvar={salvarProdutoAlterado}
                        />
                    )}
                    {
                        listaDeProdutos.length > 0 ? (
                            <div className="relative pb-4">
                                <div className="flex py-2 flex-col bg-[--vermelho-escuro] text-white max-w-[90%] mx-auto sm:max-w-[400px]">
                                    <p className="uppercase font-bold text-xl text-center">Preço final Geral</p>
                                    <p className="uppercase font-bold text-4xl text-center">
                                        R$
                                        {
                                            listaDeProdutos
                                                .map(p => CalcularPrecoFinalProduto(p.quantidade, p.preco))
                                                .reduce((a, b) => a + b)
                                                .toFixed(2)
                                        }
                                    </p>
                                </div>
                            </div>
                        ) : ('')
                    }
                </div>
            </Template>
        </ForcarAutenticacao>
    );
}