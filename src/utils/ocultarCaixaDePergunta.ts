import CaixaDeDialogo from "@/interfaces/CaixaDeDialogo";

export default function ocultarCaixaDePergunta(setCaixaDeDialogo: ((valor: CaixaDeDialogo | null) => void)) {
    setCaixaDeDialogo(null);
}
