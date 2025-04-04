'use client';
import ForcarAutenticacao from "@/components/autenticacao/forcarAutenticacao";
import Formulario from "@/components/Formulario";
import ListaDeProdutos from "@/components/ListaDeProdutos";
import useAuth from "@/data/hook/useAuth";
import useListaDeProdutos from "@/hooks/useListaDeProdutos";
import criarId from "@/utils/criarId";
import { useState } from "react";

export default function Page() {
    const { logout } = useAuth();

    const [produto, setProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [categoria, setCategoria] = useState('');
    
    const [listaDeProdutos, setListaDeProdutos] = useListaDeProdutos();

    function criarProduto(e: React.FormEvent, produto: string, quantidade: string, categoria: string) {
        e.preventDefault();

        if (!produto || !quantidade || !categoria) {
            alert("Preencha todos os campos!");
            return;
        }

        const novoProduto = {
            id: criarId(),
            produto,
            quantidade,
            categoria,
        };

        // **Corrigido:** Use setListaDeProdutos para atualizar o estado
        setListaDeProdutos(prevState => [...prevState, novoProduto]);

        // O useEffect no hook useListaDeProdutos cuidará de atualizar o localStorage
        setProduto('');
        setQuantidade('');
        setCategoria('');
    }

    return (
        <ForcarAutenticacao>
            <div className="text-black">
                <Formulario
                    produto={produto}
                    quantidade={quantidade}
                    categoria={categoria}
                    setProduto={setProduto}
                    setQuantidade={setQuantidade}
                    setCategoria={setCategoria}
                    criarProduto={(e) => criarProduto(e, produto, quantidade, categoria)}
                />
                <button onClick={logout}>Logout</button>

                <ListaDeProdutos listaDeProdutos={listaDeProdutos}/>

            </div>
        </ForcarAutenticacao>
    );
}