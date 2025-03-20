import "jspdf-autotable";  // Importando diretamente a extensão
import { useEffect, useState } from "react";
import ListaDeProdutos from "@/interfaces/ListaDeProdutos";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function GerarPDF() {
    const [listaDeProdutos, setListaDeProdutos] = useState<ListaDeProdutos[]>([]);

    useEffect(() => {
        const produtosSalvos = localStorage.getItem("produtos");
        if (produtosSalvos) {
            try {
                const lista = JSON.parse(produtosSalvos);
                if (Array.isArray(lista)) {
                    setListaDeProdutos(lista);
                } else {
                    setListaDeProdutos([]);
                }
            } catch (error) {
                console.error("Erro ao carregar os produtos do localStorage:", error);
                setListaDeProdutos([]);
            }
        }
    }, []);


    const data = '22/03/2025 - 14:30'
    const mercado = 'Supermercado Compre Mais'

    function generatePDF() {
        const doc = new jsPDF();

        // Adicionando o nome do mercado acima da tabela
        const marketFontSize = 14;
        const marketYPosition = 20;

        doc.setFontSize(marketFontSize);
        doc.text(mercado, doc.internal.pageSize.getWidth() / 2, marketYPosition, { align: 'center' });

        const head = [['Categoria', 'Produto', 'Quantidade', 'Preço Unitário', 'Preço Total']];
        const body: (string | number)[][] = [];

        let totalFinal = 0; // Variável para armazenar o preço total final

        listaDeProdutos.forEach(categoria => {
            categoria.listaDeProdutos.forEach(produto => {
                const precoUnitario = produto.preco ? parseFloat(produto.preco.replace(',', '.')) : 0;
                const quantidade = parseInt(produto.quantidade);
                const precoTotalProduto = precoUnitario * quantidade;
                totalFinal += precoTotalProduto; // Adiciona o preço total do produto ao total final

                body.push([
                    categoria.categoria,
                    produto.produto,
                    produto.quantidade,
                    produto.preco ? produto.preco : 0,
                    precoTotalProduto.toFixed(2), // Adiciona o preço total do produto formatado
                ]);
            });
        });

        const tableYPosition = marketYPosition + 10;
        autoTable(doc, { head, body, startY: tableYPosition });

        // Adicionando o preço total final acima do rodapé
        const totalFontSize = 12;
        const totalYPosition = doc.internal.pageSize.height - 40; // Ajuste este valor conforme necessário

        doc.setFontSize(totalFontSize);
        doc.text(`Total Final: R$ ${totalFinal.toFixed(2)}`, doc.internal.pageSize.getWidth() / 2, totalYPosition, { align: 'center' });

        // Adicionando o rodapé (data)
        const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        const footerText = data;
        const footerFontSize = 10;
        const footerYPosition = pageHeight - 20;

        doc.setFontSize(footerFontSize);
        doc.text(footerText, doc.internal.pageSize.getWidth() / 2, footerYPosition, { align: 'center' });

        doc.save('tabela_produtos.pdf');
    }


    return (
        <div className="bg-green-400">
            <button onClick={generatePDF}>Gerar PDF</button>
        </div>
    );
}
