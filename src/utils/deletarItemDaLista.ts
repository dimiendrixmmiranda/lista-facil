import ListaDeProdutos from "@/interfaces/ListaDeProdutos";
import Produto from "@/interfaces/Produto";

export default function deletarItemDaLista(
    categoria: ListaDeProdutos,
    produtoDaCategoria: Produto,
    setListaDeProdutos: React.Dispatch<React.SetStateAction<ListaDeProdutos[]>>
) {
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
}
