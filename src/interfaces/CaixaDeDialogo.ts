export default interface CaixaDeDialogo {
    dialogo: string;
    funcaoSim: () => void;
    funcaoNao: () => void; // Agora não recebe parâmetros
}
