interface GerarCaixaDeMensagem{
    mensagem: string
    visible: boolean
    funcaoSim: (e: React.MouseEvent<HTMLButtonElement>) => void 
    funcaoNao: () => void
}

export default function GerarCaixaDeMensagem({mensagem, visible, funcaoSim, funcaoNao}: GerarCaixaDeMensagem) {
    return (
        <div className={`bg-red-400 absolute top-[50%] left-[50%] ${visible ? 'block' : 'hidden'}`} style={{ transform: 'translate(-50%)' }}>
            <h2>{mensagem}</h2>
            <div>
                <button onClick={(e) => funcaoSim(e)}>Sim</button>
                <button onClick={funcaoNao}>Não</button>
            </div>
        </div>
    )
}