'use client'
import ForcarAutenticacao from "@/components/autenticacao/forcarAutenticacao"
import Inicio from "@/components/Inicio"
import useAuth from "@/data/hook/useAuth"

export default function Page() {
    const { logout } = useAuth()

    return (
        <ForcarAutenticacao>
            <div className="text-black">
                <Inicio></Inicio>
                <button onClick={logout}>Logaut</button>
            </div>
        </ForcarAutenticacao>
    )
}