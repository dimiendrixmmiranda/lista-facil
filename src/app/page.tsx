"use client";

import Formulario from "@/components/Formulario";
import FormularioAlterarProduto from "@/components/FormularioAlterarProduto";
import GerarPDF from "@/components/GerarPDF";
import CaixaDeDialogo from "@/interfaces/CaixaDeDialogo";
import ListaDeProdutos from "@/interfaces/ListaDeProdutos";
import Produto from "@/interfaces/Produto";
import ajustarTituloCategoria from "@/utils/ajustarTituloCategoria";
import calcularValorFinalProduto from "@/utils/calcularValorFinalProduto";
import cancelarAlteracaoDoProduto from "@/utils/cancelarAlteracaoDoProduto";
import deletarItemDaLista from "@/utils/deletarItemDaLista";
import gerarCaixaDeDialogo from "@/utils/gerarCaixaDeDialogo";
import gerarId from "@/utils/gerarId";
import limparVarios from "@/utils/limparFormularios";
import ocultarCaixaDePergunta from "@/utils/ocultarCaixaDePergunta";
import { useState, useEffect } from "react";
import { BiMessageSquareEdit } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { FaCheckSquare, FaTrashAlt } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function Home() {
	const [produto, setProduto] = useState("");
	const [quantidade, setQuantidade] = useState("");
	const [categoria, setCategoria] = useState("");
	const [listaDeProdutos, setListaDeProdutos] = useState<ListaDeProdutos[]>([]);

	const [caixaDeDialogo, setCaixaDeDialogo] = useState<CaixaDeDialogo | null>(null);

	// Estados do formulario alterado
	const [visibleFormularioAlterado, setVisibleFormularioAlterado] = useState(false)
	const [produtoAlterado, setProdutoAlterado] = useState("");
	const [quantidadeAlterado, setQuantidadeAlterado] = useState("");
	const [categoriaAlterado, setCategoriaAlterado] = useState("");
	const [precoAlterado, setPrecoAlterado] = useState("");
	const [itemPegoAlterado, setItemPegoAlterado] = useState(false);
	const [produtoParaAlterar, setProdutoParaAlterar] = useState<Produto | null>(null);

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

	function criarProduto(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault()

		if (!produto || !quantidade || !categoria) {
			alert("Preencha todos os campos!")
			return
		}

		const novoProduto: Produto = {
			id: gerarId(),
			produto,
			categoria,
			quantidade,
			itemPego: false,
			mostrarPreco: false,
		}

		// Verifica se a categoria já existe
		const novaLista = [...listaDeProdutos];
		const categoriaExistente = novaLista.find((c) => c.categoria === categoria);

		if (categoriaExistente) {
			categoriaExistente.listaDeProdutos.push(novoProduto);
		} else {
			novaLista.push({ categoria, listaDeProdutos: [novoProduto], id: gerarId() });
		}

		// Atualiza o estado e salva no localStorage
		setListaDeProdutos(novaLista);
		localStorage.setItem("produtos", JSON.stringify(novaLista));

		// limparFormulario();
		limparVarios([setProduto, setQuantidade, setCategoria]);
	}

	function alterarProduto(
		e: React.MouseEvent<HTMLButtonElement>,
		categoria: ListaDeProdutos,
		produtoDaCategoria: Produto
	) {
		e.preventDefault();
		setVisibleFormularioAlterado(true);
		setProdutoAlterado(produtoDaCategoria.produto);
		setQuantidadeAlterado(produtoDaCategoria.quantidade);
		setCategoriaAlterado(produtoDaCategoria.categoria);
		setPrecoAlterado(produtoDaCategoria.preco ? produtoDaCategoria.preco : '');
		setItemPegoAlterado(produtoDaCategoria.itemPego);
		setProdutoParaAlterar(produtoDaCategoria); // Armazena o produto a ser alterado
	}

	function salvarAlteracaoDoProduto(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		if (!produtoParaAlterar) return;
	
		// Criar uma cópia da lista sem o produto que está sendo alterado
		const novaLista = listaDeProdutos.map(categoria => ({
			...categoria,
			listaDeProdutos: categoria.listaDeProdutos.filter(produto => produto.id !== produtoParaAlterar.id),
		}));
	
		// Verificar se a categoria alterada já existe
		const categoriaExistente = novaLista.find(cat => cat.categoria === categoriaAlterado);
	
		// Criar o produto atualizado
		const produtoAtualizado: Produto = {
			...produtoParaAlterar,
			produto: produtoAlterado,
			quantidade: quantidadeAlterado,
			categoria: categoriaAlterado,
			preco: precoAlterado,
			itemPego: itemPegoAlterado,
		};
	
		if (categoriaExistente) {
			// Adicionar à categoria existente
			categoriaExistente.listaDeProdutos.push(produtoAtualizado);
		} else {
			// Criar nova categoria e adicionar o produto
			novaLista.push({ categoria: categoriaAlterado, listaDeProdutos: [produtoAtualizado], id: gerarId() });
		}
	
		// Atualizar estado e localStorage
		setListaDeProdutos(novaLista);
		localStorage.setItem("produtos", JSON.stringify(novaLista));
	
		// Fechar o formulário de alteração
		setVisibleFormularioAlterado(false);
	}

	function adicionarPrecoNoProduto(
		e: React.MouseEvent<HTMLButtonElement>,
		categoria: ListaDeProdutos,
		produtoDaCategoria: Produto
	) {
		e.preventDefault();

		const inputElement = (e.currentTarget.parentElement?.querySelector("input") as HTMLInputElement);
		if (!inputElement) return;

		const preco = inputElement.value.trim();
		if (!preco) {
			alert("Digite um preço válido!");
			return;
		}

		// Atualizar a lista sem alterar os outros produtos
		const novaLista = listaDeProdutos.map(cat => {
			if (cat.id === categoria.id) {
				return {
					...cat,
					listaDeProdutos: cat.listaDeProdutos.map(prod =>
						prod.id === produtoDaCategoria.id
							? { ...prod, preco, mostrarPreco: true }
							: prod
					),
				};
			}
			return cat;
		});

		setListaDeProdutos(novaLista);
		localStorage.setItem("produtos", JSON.stringify(novaLista));
	}

	function alterarPrecoDoProduto(
		e: React.MouseEvent<HTMLButtonElement>,
		categoria: ListaDeProdutos,
		produtoDaCategoria: Produto
	) {
		e.preventDefault()
		const novaLista = listaDeProdutos.map(cat => {
			if (cat.id === categoria.id) {
				return {
					...cat,
					listaDeProdutos: cat.listaDeProdutos.map(prod =>
						prod.id === produtoDaCategoria.id
							? { ...prod, mostrarPreco: false }
							: prod
					),
				};
			}
			return cat;
		});

		setListaDeProdutos(novaLista);
		localStorage.setItem("produtos", JSON.stringify(novaLista));
	}

	function itemPego(
		e: React.MouseEvent<HTMLButtonElement>,
		categoria: ListaDeProdutos,
		produtoDaCategoria: Produto
	) {
		e.preventDefault()
		setListaDeProdutos(prevLista => {
			console.log(prevLista)
			const novaLista = prevLista.map(cat => {
				if (cat.id === categoria.id) {
					return {
						...cat,
						listaDeProdutos: cat.listaDeProdutos.map(prod =>
							prod.id === produtoDaCategoria.id
								? { ...prod, itemPego: !prod.itemPego }
								: prod
						),
					};
				}
				return cat;
			});

			localStorage.setItem("produtos", JSON.stringify(novaLista));
			return novaLista;
		})
	}

	return (
		<div className="min-w-screen min-h-screen bg-blue-500 p-4">
			{/* Formulário */}
			<Formulario
				produto={produto}
				quantidade={quantidade}
				categoria={categoria}
				setCategoria={setCategoria}
				setProduto={setProduto}
				setQuantidade={setQuantidade}
				criarProduto={criarProduto}
			></Formulario>

			{/* Formulario de Alterar Produto */}
			{
				visibleFormularioAlterado ? (
					<FormularioAlterarProduto
						cancelarAlteracaoDoProduto={cancelarAlteracaoDoProduto}
						categoriaAlterado={categoriaAlterado}
						itemPegoAlterado={itemPegoAlterado}
						precoAlterado={precoAlterado}
						produtoAlterado={produtoAlterado}
						quantidadeAlterado={quantidadeAlterado}
						setCategoriaAlterado={setCategoriaAlterado}
						setItemPegoAlterado={setItemPegoAlterado}
						setPrecoAlterado={setPrecoAlterado}
						setProdutoAlterado={setProdutoAlterado}
						setQuantidadeAlterado={setQuantidadeAlterado}
						setVisibleFormularioAlterado={setVisibleFormularioAlterado}
						salvarAlteracaoDoProduto={salvarAlteracaoDoProduto}
					></FormularioAlterarProduto>
				) : ('')
			}

			{/* Lista de produtos */}
			<div className="mt-8">
				<ul className="flex flex-col gap-6">
					{listaDeProdutos.length > 0 ? (
						listaDeProdutos.map((item) => (
							<li key={item.id} className="bg-orange-600 p-2">
								<h2 className="font-bold">{ajustarTituloCategoria(item.categoria)}</h2>
								<ul className="flex flex-col gap-1">
									{
										item.listaDeProdutos?.map(produto => {
											return (
												<li key={produto.id} className={`grid gap-2 p-2 overflow-hidden ${produto.itemPego ? 'bg-green-700' : 'bg-zinc-600'}`} style={{ gridTemplateColumns: '1fr 50px 90px 50px' }}>
													{/* Nome do produto */}
													<p className="w-full h-full flex justify-start items-center">{produto.produto}</p>
													{/* Quantidade do produto */}
													<p className="w-full h-full flex justify-center items-center">{produto.quantidade}</p>

													{/* Area de formulario de preço*/}
													<form className={`bg-red-400 p-1 max-w-[90px] text-black gap-x-1 ${produto.mostrarPreco ? 'hidden' : 'grid'}`}
														style={{ gridTemplateColumns: '1fr 20px' }}>
														<label htmlFor="preco" className="text-sm whitespace-nowrap col-start-1 col-end-3">Inserir Preço:</label>
														<input type="text" name="preco" id="preco" className="w-full col-start-1 col-end-2 text-sm px-1 rounded-sm" />
														<button className="col-start-2 col-end-3 w-full h-full flex justify-center items-center bg-green-700 rounded-sm" onClick={(e) => adicionarPrecoNoProduto(e, item, produto)}>
															<IoIosCheckmarkCircle className="text-lg text-white" />
														</button>
													</form>

													{/* Area de preço */}
													<div className={`bg-red-400 p-1 max-w-[90px] w-full h-full self-center justify-self-center rounded-md ${produto.mostrarPreco ? 'grid' : 'hidden'}`}>
														<div className="whitespace-nowrap text-[.6em] leading-3 text-center flex justify-between">
															<p className="flex justify-start items-center">{produto.quantidade} x {produto.preco}</p>
															<button className="bg-yellow-500 p-[.4em] rounded-sm" onClick={(e) => alterarPrecoDoProduto(e, item, produto)}>
																<BiMessageSquareEdit />
															</button>
														</div>
														<p className="text-center uppercase font-bold">{produto.preco != undefined ? calcularValorFinalProduto(produto.quantidade, produto.preco) : ''}</p>
													</div>

													{/* Botões de ação */}
													<div className="w-[50px] h-[50px] grid gap-1" style={{ gridTemplateColumns: '25px 1fr' }}>
														<div className="grid grid-rows-2 gap-1 self-center justify-self-center w-full h-full">
															<button className="bg-yellow-400 p-1 text-black flex justify-center items-center rounded-sm" onClick={(e) => alterarProduto(e, item, produto)}>
																<CiEdit className="text-sm" />
															</button>
															<button
																className="bg-red-500 p-1 flex justify-center items-center rounded-sm"
																onClick={(e) =>
																	gerarCaixaDeDialogo(
																		e,
																		"Tem certeza que deseja excluir?",
																		() => deletarItemDaLista(item, produto, setListaDeProdutos),
																		() => ocultarCaixaDePergunta(setCaixaDeDialogo),
																		setCaixaDeDialogo
																	)
																}
															>
																<FaTrashAlt className="text-sm" />
															</button>

														</div>
														<button className="self-center justify-self-center bg-green-600 w-full h-full p-1 rounded-sm flex justify-center items-center" onClick={(e) => itemPego(e, item, produto)}>
															<FaCheckSquare className="text-xl" />
														</button>
													</div>
												</li>
											)
										})
									}
								</ul>
								<div className="p-2 mt-2">
									<h2 className="text-center uppercase font-bold">Preço Final da categoria</h2>
									<p>{item.listaDeProdutos.map(item => item.preco ? calcularValorFinalProduto(item.quantidade, item.preco) : 0).reduce((a, b) => a + b)}</p>
								</div>
							</li>
						))
					) : (
						<p className="text-center uppercase font-bold bg-red-500 py-2">Sua lista ainda está vazia!</p>
					)}
				</ul>

				{caixaDeDialogo && (
					<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
						<div className="bg-white p-4 rounded-lg shadow-lg">
							<p className="mb-4">{caixaDeDialogo.dialogo}</p>
							<div className="flex justify-between">
								<button onClick={caixaDeDialogo.funcaoSim} className="bg-red-500 text-white px-4 py-2 rounded">
									Sim
								</button>
								<button onClick={caixaDeDialogo.funcaoNao} className="bg-gray-300 px-4 py-2 rounded">
									Cancelar
								</button>
							</div>
						</div>
					</div>
				)}
			</div>

			{
				listaDeProdutos.length > 0 ? (
					<div className="w-full bg-red-500 flex flex-col mt-4 p-2">
						<h2 className="uppercase font-bold text-center">Preço final geral de produtos</h2>
						<p className="text-2xl uppercase font-bold text-center">
							{
								listaDeProdutos.map(lista => lista.listaDeProdutos.map(produto => produto.preco ? calcularValorFinalProduto(produto.quantidade, produto.preco) : 0).reduce((a, b) => a + b)).reduce((a, b) => a + b)
							}
						</p>
					</div>
				) : ('')
			}

			{
				listaDeProdutos.length > 0 ? (
					<GerarPDF></GerarPDF>
				) : ('')
			}
		</div>
	)
}
