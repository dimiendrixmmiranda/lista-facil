import { useState, useEffect } from "react";
import ListaDeProdutos from "@/interfaces/ListaDeProdutos";

export function useListaDeProdutos() {
    const [listaDeProdutos, setListaDeProdutos] = useState<ListaDeProdutos[]>(() => {
        if (typeof window !== "undefined") {
            const storedData = localStorage.getItem("produtos");
            return storedData ? JSON.parse(storedData) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("produtos", JSON.stringify(listaDeProdutos));
    }, [listaDeProdutos]);

    return { listaDeProdutos, setListaDeProdutos };
}
