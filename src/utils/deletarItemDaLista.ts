import ListaDeProdutos from "@/interfaces/ListaDeProdutos";
import Produto from "@/interfaces/Produto";

export default function deletarItemDaLista(
    e: React.MouseEvent<HTMLButtonElement>,
    categoria: ListaDeProdutos,
    produtoDaCategoria: Produto,
    setListaDeProdutos: React.Dispatch<React.SetStateAction<ListaDeProdutos[]>>,
    setVisible: (valor: boolean) => void
) {
    e.preventDefault()
    setListaDeProdutos((prevLista) => {
        const novaLista = prevLista
            .map(cat => {
                if (cat.id === categoria.id) {
                    const novaListaDeProdutos = cat.listaDeProdutos.filter(prod => prod.id !== produtoDaCategoria.id);
                    return novaListaDeProdutos.length > 0 ? { ...cat, listaDeProdutos: novaListaDeProdutos } : null;
                }
                return cat;
            })
            .filter(Boolean) as ListaDeProdutos[]; // Remove categorias vazias

        localStorage.setItem("produtos", JSON.stringify(novaLista));
        return novaLista;
    });
    setVisible(false)
}
