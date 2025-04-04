import { useState, useEffect } from 'react';
import Produto from '@/interfaces/Produto'; // Ajuste o caminho se necessário

function useListaDeProdutos(localStorageKey = 'produtos'): [Produto[], React.Dispatch<React.SetStateAction<Produto[]>>] {
    const [listaDeProdutos, setListaDeProdutos] = useState<Produto[]>([])
    
    useEffect(() => {
        const carregarProdutosDoLocalStorage = () => {
            const produtosSalvos = localStorage.getItem(localStorageKey)
            if (produtosSalvos) {
                try {
                    const lista = JSON.parse(produtosSalvos)
                    if (Array.isArray(lista)) {
                        setListaDeProdutos(lista)
                    } else {
                        setListaDeProdutos([])
                    }
                } catch (error) {
                    console.error(`Erro ao carregar "${localStorageKey}" do localStorage:`, error)
                    setListaDeProdutos([])
                }
            } else {
                setListaDeProdutos([])
            }
        };

        // Carregar os produtos na montagem do componente
        carregarProdutosDoLocalStorage()

        // Adicionar um listener para o evento 'storage'
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === localStorageKey) {
                carregarProdutosDoLocalStorage()
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Remover o listener quando o componente for desmontado
        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [localStorageKey, setListaDeProdutos])

    return [listaDeProdutos, setListaDeProdutos]
}

export default useListaDeProdutos;