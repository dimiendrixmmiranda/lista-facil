import CaixaDeDialogo from "@/interfaces/CaixaDeDialogo";
import ocultarCaixaDePergunta from "./ocultarCaixaDePergunta";

export default function gerarCaixaDeDialogo(
    e: React.MouseEvent<HTMLButtonElement>,
    dialogo: string,
    funcaoSim: () => void,
    funcaoNao: (valor: CaixaDeDialogo | null) => void,
    setCaixaDeDialogo: React.Dispatch<React.SetStateAction<CaixaDeDialogo | null>>
) {
    e.preventDefault();
    setCaixaDeDialogo({
        dialogo,
        funcaoSim: () => {
            funcaoSim(); // Só executa ao clicar em "Sim"
            ocultarCaixaDePergunta(setCaixaDeDialogo); // Oculta o diálogo após a confirmação
        },
        funcaoNao: () => {
            ocultarCaixaDePergunta(setCaixaDeDialogo);
        },
    });
}
