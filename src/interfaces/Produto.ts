export default interface Produto {
	id: number;
	produto: string;
	quantidade: string;
	categoria: string;
	itemPego: boolean
	preco?: string;
	mostrarPreco?: boolean; // Novo estado para cada produto
}
