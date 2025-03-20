import Produto from "./Produto"

export default interface ListaDeProdutos {
	categoria: string
	listaDeProdutos: Produto[]
	id: number
}