import { useState, useEffect } from 'react';
import Produto from '@/interfaces/Produto';

function useListaDeProdutos(localStorageKey = 'produtos'): [Produto[], React.Dispatch<React.SetStateAction<Produto[]>>] {
    const [listaDeProdutos, setListaDeProdutos] = useState<Produto[]>([])

    // Carregar dados do localStorage ao montar
    useEffect(() => {
        const carregarProdutosDoLocalStorage = () => {
            const produtosSalvos = localStorage.getItem(localStorageKey)
            if (produtosSalvos) {
                try {
                    const lista = JSON.parse(produtosSalvos)
                    if (Array.isArray(lista)) {
                        setListaDeProdutos(lista)
                    }
                } catch (error) {
                    console.error(`Erro ao carregar "${localStorageKey}" do localStorage:`, error)
                }
            }
        }

        carregarProdutosDoLocalStorage()

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === localStorageKey) {
                carregarProdutosDoLocalStorage()
            }
        }

        window.addEventListener('storage', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [localStorageKey])

    // Salvar no localStorage sempre que lista mudar
    useEffect(() => {
        try {
            localStorage.setItem(localStorageKey, JSON.stringify(listaDeProdutos))
        } catch (error) {
            console.error(`Erro ao salvar no localStorage "${localStorageKey}":`, error)
        }
    }, [listaDeProdutos, localStorageKey])

    return [listaDeProdutos, setListaDeProdutos]
}

export default useListaDeProdutos;
