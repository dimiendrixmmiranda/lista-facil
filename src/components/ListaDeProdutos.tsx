import Produto from "@/interfaces/Produto";

interface ListaDeProdutosProps{
    listaDeProdutos: Produto[]
}

export default function ListaDeProdutos({listaDeProdutos}: ListaDeProdutosProps){
    return (
        <ul>
            {
                listaDeProdutos.length > 0 ? (
                    listaDeProdutos.map(produto => {
                        return (
                            <li key={produto.id} className="flex">
                                <p>{produto.produto}</p>
                                <p>{produto.quantidade}</p>
                            </li>
                        )
                    })
                ):(
                    <div>Sem Produtos Na Lista</div>
                )
            }
        </ul>
    )
}