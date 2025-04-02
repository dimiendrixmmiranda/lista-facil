interface GerarCaixaDeMensagem {
    mensagem: string
    visible: boolean
    funcaoSim: (e: React.MouseEvent<HTMLButtonElement>) => void
    funcaoNao: () => void
}

export default function GerarCaixaDeMensagem({ mensagem, visible, funcaoSim, funcaoNao }: GerarCaixaDeMensagem) {
    return (
        <div className={`bg-red-400 w-[95%] max-w-[400px] p-4 absolute top-[50%] left-[50%] ${visible ? 'block' : 'hidden'}`} style={{ transform: 'translate(-50%)', boxShadow: '0px 0px 2px 2px black' }}>
            <h2 className="text-xl leading-6" style={{textShadow: '1px 1px 2px black'}}>{mensagem}</h2>
            <div className="grid grid-cols-2 text-lg gap-2 mt-4">
                <button className="bg-green-600 font-bold uppercase" onClick={(e) => funcaoSim(e)} style={{ textShadow: '1px 1px 2px black', boxShadow: '0 0 2px 1px black' }}>Sim</button>
                <button className="bg-red-600 font-bold uppercase" onClick={funcaoNao} style={{ textShadow: '1px 1px 2px black', boxShadow: '0 0 2px 1px black' }}>Não</button>
            </div>
        </div>
    )
}