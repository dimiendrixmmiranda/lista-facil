'use client'

import useAuth from "@/data/hook/useAuth"
import Image from "next/image"
import { useState } from "react"
import { FaGoogle } from "react-icons/fa"

export default function Page() {

	const { loginGoogle, cadastrar, login } = useAuth()

	const [modo, setModo] = useState<'login' | 'cadastro'>('login')
	const [nome, setNome] = useState('')
	const [email, setEmail] = useState('')
	const [senha, setSenha] = useState('')
	const [, setErro] = useState<string | null>(null)


	async function submeter() {
		if (!cadastrar) return;

		if (modo === "login") {
			if (email && senha) {
				if (!login) {
					exibirErro("O login ainda não está disponível. Tente novamente mais tarde.")
					return
				}
				try {
					// Aguarda a execução do login e trata qualquer erro
					await login(email, senha)
					console.log("Login realizado com sucesso")
				} catch (error) {
					console.error("Erro ao fazer login:", error)
					exibirErro("Ocorreu um erro no login. Verifique suas credenciais.")
				}
			} else {
				exibirErro("Preencha todos os campos!")
			}
		} else {
			if (email && senha) {
				try {
					await cadastrar(email, senha)
					console.log("Cadastro realizado com sucesso")
				} catch (error) {
					console.error("Erro ao cadastrar:", error)
					exibirErro("Ocorreu um erro no cadastro")
				}
			} else {
				exibirErro("Preencha todos os campos!")
			}
		}
	}

	function exibirErro(msg: string, tempoEmSegundos: number = 5) {
		console.log("Erro definido:", msg); // Verifica se o erro foi atualizado
		setErro(msg);
		setTimeout(() => setErro(null), tempoEmSegundos * 1000);
	}

	return (
		<div className="w-full min-h-screen bg-[--verde] flex justify-center items-center p-4">
			<div className="w-full max-w-[450px] flex flex-col overflow-hidden rounded-md md:grid md:grid-cols-2 md:max-w-[700px] md:h-[400px]">
				<div className="w-full h-[300px] bg-white p-8 relative sm:h-[300px] md:h-full">
					<Image alt="Imagem do formulario" src={'/imagem-1.png'} fill className="object-contain"></Image>
				</div>
				{
					modo === 'login' ? (
						<div className="w-full h-full bg-[--vermelho] text-white p-6 flex flex-col justify-center gap-3">
							<h2 className="uppercase text-2xl font-bold text-center leading-7">Já está cadastrado??? Faça o login imediatamente!</h2>
							<div className="flex flex-col gap-4 w-full">
								<fieldset className="relative flex flex-col text-black">
									<label htmlFor="email" className="text-zinc-100 text-xs">Informe seu email:</label>
									<input type="text" name="email" id="email" className="w-full h-[30px] outline-none transition-all px-2 mt-1 focus:outline-2 focus:outline-blue-500 rounded-md"
										value={email} onChange={(e) => setEmail(e.target.value)} />
								</fieldset>
								<fieldset className="relative flex flex-col text-black">
									<label htmlFor="senha" className="text-zinc-100 text-xs">Informe seu senha:</label>
									<input type="password" name="senha" id="senha" className="w-full h-[30px] outline-none transition-all px-2 mt-1 focus:outline-2 focus:outline-blue-500 rounded-md"
										value={senha} onChange={(e) => setSenha(e.target.value)} />
								</fieldset>
							</div>
							<button className="w-full bg-black uppercase font-bold py-1 rounded-md mt-2" onClick={submeter}>Entrar</button>

							<div className="w-full h-full bg-[--vermelho-escuro] rounded-md text-black flex flex-col justify-center items-center" >
								<button className="uppercase font-bold px-4 py-1 text-white w-full h-full" onClick={() => setModo('cadastro')}>Ainda não se cadastrou? Cadastre-se Agora!</button>
							</div>
						</div>
					) : (
						<div className="w-full h-full bg-[--vermelho] text-white p-4 flex flex-col justify-center gap-3">
							<h2 className="uppercase text-2xl font-bold text-center">Registre-se aqui!</h2>
							<div className="flex flex-col gap-4 w-full">
								<fieldset className="relative flex flex-col text-black">
									<label htmlFor="nome" className="text-zinc-100 text-xs ">Informe seu nome:</label>
									<input type="text" name="nome" id="nome" className="w-full h-[30px] outline-none transition-all px-2 mt-1 focus:outline-2 focus:outline-blue-500 rounded-md"
										value={nome} onChange={(e) => setNome(e.target.value)} />
								</fieldset>
								<fieldset className="relative flex flex-col text-black">
									<label htmlFor="email" className="text-zinc-100 text-xs">Informe seu email:</label>
									<input type="text" name="email" id="email" className="w-full h-[30px] outline-none transition-all px-2 mt-1 focus:outline-2 focus:outline-blue-500 rounded-md"
										value={email} onChange={(e) => setEmail(e.target.value)} />
								</fieldset>
								<fieldset className="relative flex flex-col text-black">
									<label htmlFor="senha" className="text-zinc-100 text-xs">Informe seu senha:</label>
									<input type="password" name="senha" id="senha" className="w-full h-[30px] outline-none transition-all px-2 mt-1 focus:outline-2 focus:outline-blue-500 rounded-md"
										value={senha} onChange={(e) => setSenha(e.target.value)} />
								</fieldset>
							</div>
							<button onClick={loginGoogle} className="w-full flex items-center gap-1 bg-red-800 text-white rounded-lg px-4 py-1">
								Entrar com o Google <FaGoogle />
							</button>
							<button className="w-full bg-black uppercase font-bold py-1 rounded-md" onClick={submeter}>Registrar</button>

							<div className="bg-[--vermelho-escuro] rounded-md text-black flex flex-col justify-center items-center" >
								<button className="uppercase font-bold px-4 py-1 text-white w-full h-full " onClick={() => setModo('login')}>Já é cadastrado? Faça o login</button>
							</div>
						</div>
					)
				}
			</div>
		</div>
	)
}