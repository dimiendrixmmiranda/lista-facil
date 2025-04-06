import Image from "next/image";
import Offcanvas from "@/components/offcanvas/Offcanvas";

export default function Header() {
    return (
        <header className="bg-[--vermelho-escuro] p-2 flex justify-between">
            <div className="flex items-center gap-1">
                <Image alt="Logo Lista Fácil" src={'/logo-lista-facil.png'} width={45} height={45}></Image>
                <h2 className="font-secundaria text-3xl font-bold text-white">Lista Fácil</h2>
            </div>
            <Offcanvas></Offcanvas>
        </header>
    )
}