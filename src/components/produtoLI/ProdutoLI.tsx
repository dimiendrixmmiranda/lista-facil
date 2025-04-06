import Produto from "@/interfaces/Produto"
import styles from './style.module.css'
import { FaCheck, FaClipboardList, FaTrashAlt } from "react-icons/fa"

interface ProdutoLiProps {
    produto: Produto
    excluirProduto: (id: number) => void
    concluirProduto: (id: number) => void
}

export default function ProdutoLI({ produto, excluirProduto, concluirProduto }: ProdutoLiProps) {
    return (
        <li key={produto.id} className={`${produto.concluido ? 'bg-green-800' : 'bg-[--cinza]'} ${styles.container}`}>
            <p className="capitalize w-full h-full flex items-center">{produto.produto}</p>
            <p className="capitalize w-full h-full flex items-center justify-center text-center">{produto.quantidade}</p>
            {/* adicionar preço */}
            <div></div>
            {/* botões de ação */}
            <div className="grid grid-cols-2 gap-1">
                <div className="flex flex-col gap-1 justify-center items-center">
                    <button className="p-1 bg-red-600 text-white" onClick={() => excluirProduto(produto.id)}><FaTrashAlt /></button>
                    <button className="p-1 bg-yellow-600 text-white"><FaClipboardList /></button>
                </div>
                <div className="flex w-full h-full justify-center items-center bg-green-600 text-white">
                    <button onClick={() => concluirProduto(produto.id)}><FaCheck /></button>
                </div>
            </div>
        </li>
    )
}