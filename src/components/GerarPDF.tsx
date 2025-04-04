// import "jspdf-autotable";  // Importando diretamente a extensão
// import { useEffect, useState } from "react";
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// export default function GerarPDF() {
//     const [listaDeProdutos, setListaDeProdutos] = useState<ListaDeProdutos[]>([]);
//     const [visibleCaixa, setVisibleCaixa] = useState(false)
//     const [nomeMercado, setNomeMercado] = useState('')

//     useEffect(() => {
//         const produtosSalvos = localStorage.getItem("produtos");
//         if (produtosSalvos) {
//             try {
//                 const lista = JSON.parse(produtosSalvos);
//                 if (Array.isArray(lista)) {
//                     setListaDeProdutos(lista);
//                 } else {
//                     setListaDeProdutos([]);
//                 }
//             } catch (error) {
//                 console.error("Erro ao carregar os produtos do localStorage:", error);
//                 setListaDeProdutos([]);
//             }
//         }
//     }, []);

//     function generatePDF(nomeDoMercado?: string) {
//         const doc = new jsPDF();
//         const data = new Date()

//         // Adicionando o nome do mercado acima da tabela
//         const marketFontSize = 14;
//         const marketYPosition = 20;

//         doc.setFontSize(marketFontSize);
//         doc.text(nomeDoMercado ? nomeDoMercado : '', doc.internal.pageSize.getWidth() / 2, marketYPosition, { align: 'center' });

//         const head = [['Categoria', 'Produto', 'Quantidade', 'Preço Unitário', 'Preço Total']];
//         const body: (string | number)[][] = [];

//         let totalFinal = 0; // Variável para armazenar o preço total final

//         listaDeProdutos.forEach(categoria => {
//             categoria.listaDeProdutos.forEach(produto => {
//                 const precoUnitario = produto.preco ? parseFloat(produto.preco.replace(',', '.')) : 0;
//                 const quantidade = parseInt(produto.quantidade);
//                 const precoTotalProduto = precoUnitario * quantidade;
//                 totalFinal += precoTotalProduto; // Adiciona o preço total do produto ao total final

//                 body.push([
//                     categoria.categoria,
//                     produto.produto,
//                     produto.quantidade,
//                     produto.preco ? produto.preco : 0,
//                     precoTotalProduto.toFixed(2), // Adiciona o preço total do produto formatado
//                 ]);
//             });
//         });

//         const tableYPosition = marketYPosition + 10;
//         autoTable(doc, { head, body, startY: tableYPosition });

//         // Adicionando o preço total final acima do rodapé
//         const totalFontSize = 12;
//         const totalYPosition = doc.internal.pageSize.height - 40; // Ajuste este valor conforme necessário

//         doc.setFontSize(totalFontSize);
//         doc.text(`Total Final: R$ ${totalFinal.toFixed(2)}`, doc.internal.pageSize.getWidth() / 2, totalYPosition, { align: 'center' });

//         // Adicionando o rodapé (data)
//         const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
//         const footerText = formatarData(data);
//         const footerFontSize = 10;
//         const footerYPosition = pageHeight - 20;

//         doc.setFontSize(footerFontSize);
//         doc.text(footerText, doc.internal.pageSize.getWidth() / 2, footerYPosition, { align: 'center' });

//         doc.save('tabela_produtos.pdf');
//         setVisibleCaixa(false)
//     }

//     return (
//         <div className="bg-black p-4 flex flex-col">
//             <div className={`absolute bg-[--vermelho] top-[-50%] left-[50%] w-full max-w-[400px] p-4 rounded-md text-white ${visibleCaixa ? 'block': 'hidden'}`} style={{ transform: 'translate(-50%,-50%)', boxShadow: '0px 0px 2px 1px black' }}>
//                 <h2 className="text-xl leading-7">Deseja Adicionar o nome do mercado?</h2>
//                 <input className="text-black w-full h-[30px] px-2" type="text" name="nomeMercado" id="nomeMercado" value={nomeMercado} onChange={(e) => setNomeMercado(e.target.value)} />
//                 <div className="grid grid-cols-2 gap-2 mt-4">
//                     <button className="uppercase font-bold text-xl bg-green-600 py-1" onClick={() => generatePDF(nomeMercado)} style={{boxShadow: '0 0 2px 1px black', textShadow: '1px 1px 2px black'}}>Sim</button>
//                     <button className="uppercase font-bold text-xl bg-red-600 py-1" onClick={() => generatePDF()} style={{boxShadow: '0 0 2px 1px black', textShadow: '1px 1px 2px black'}}>Não</button>
//                 </div>
//             </div>
//             <button onClick={() => setVisibleCaixa(true)} className="uppercase font-bold text-2xl text-white" style={{textShadow: '1px 1px 2px black'}}>Gerar PDF</button>
//         </div>
//     );
// }
