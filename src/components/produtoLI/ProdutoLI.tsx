import Produto from "@/interfaces/Produto"
import styles from './style.module.css'
import { FaCheck, FaClipboardList, FaTrashAlt } from "react-icons/fa"
import { useState } from "react"
import CalcularPrecoFinalProduto from "@/utils/calcularPrecoFinalProduto"

interface ProdutoLiProps {
    produto: Produto
    excluirProduto: (id: number) => void
    concluirProduto: (id: number) => void
    inserirPreco: (id: number, preco: string) => void
    alterarProduto: (produto: Produto) => void
}

export default function ProdutoLI({ produto, excluirProduto, concluirProduto, inserirPreco, alterarProduto }: ProdutoLiProps) {
    const [preco, setPreco] = useState('R$')
    const [modoEditarPreco, setModoEditarPreco] = useState(false)
    const [precoInserido, setPrecoInserido] = useState(!!produto.preco)

    const handleInserir = () => {
        const precoNumerico = parseFloat(preco.replace('R$', '').replace(',', '.').trim());
        if (!isNaN(precoNumerico)) {
            inserirPreco(produto.id, precoNumerico.toString())
            setPreco('R$')
            setModoEditarPreco(false)
            setPrecoInserido(true)
        }
    }
    return (
        <li key={produto.id} className={`${produto.concluido ? 'bg-green-800' : 'bg-[--cinza]'} ${styles.container}`}>
            <p className="capitalize w-full h-full flex items-center overflow-auto">{produto.produto}</p>
            <p className="capitalize w-full h-full flex items-center justify-center text-center">{produto.quantidade}</p>

            {(modoEditarPreco || !precoInserido) ? (
                <div className="flex flex-col w-full h-full overflow-hidden">
                    <p className="whitespace-nowrap text-xs text-center">Inserir Preço:</p>
                    <input
                        type="text"
                        name="inserirPreco"
                        id="inserirPreco"
                        className="w-full h-[20px] text-black text-sm px-1"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                    />
                    <button
                        className="text-xs uppercase font-bold bg-green-800"
                        onClick={handleInserir}
                    >
                        {produto.preco ? 'Atualizar' : 'Inserir'}
                    </button>
                </div>
            ) : (
                <div className="flex flex-col w-full h-full overflow-hidden">
                    <p className="whitespace-nowrap text-[.6em] text-center">{produto.quantidade} x R${produto.preco.toFixed(2).replace('.', ',')}</p>
                    <p className="text-center font-bold">R${CalcularPrecoFinalProduto(produto.quantidade, produto.preco).toFixed(2)}</p>
                    <button
                        className="text-xs bg-yellow-600"
                        onClick={() => {
                            setModoEditarPreco(true)
                            setPreco(`R$${produto.preco.toString()}`)
                        }}
                        style={{textShadow: '1px 1px 2px black'}}
                    >
                        Alterar Preço
                    </button>
                </div>
            )}

            {/* botões de ação */}
            <div className="grid grid-cols-2 gap-1">
                <div className="flex flex-col gap-1 justify-center items-center">
                    <button className="p-1 bg-red-600 text-white" onClick={() => excluirProduto(produto.id)}><FaTrashAlt /></button>
                    <button className="p-1 bg-yellow-600 text-white" onClick={() => alterarProduto(produto)}><FaClipboardList /></button>
                </div>
                <div className="flex w-full h-full justify-center items-center bg-green-600 text-white">
                    <button onClick={() => concluirProduto(produto.id)}><FaCheck /></button>
                </div>
            </div>
        </li>
    )
}
