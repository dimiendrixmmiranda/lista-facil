'use client'
import { listaDeRedesSociais } from "@/data/constants/listaDeRedesSociais";
import Link from "next/link";

export default function RedesSociais(){
    return (
        <ul className="grid grid-cols-4 mt-4 mb-2 max-w-[500px] mx-auto w-full xl:m-0 xl:max-w-[300px] xl:ml-auto">
            {
                listaDeRedesSociais.map((rede, i) => {
                    return (
                        <li key={i} className="flex justify-center items-center text-3xl transition-all hover:scale-[1.1]">
                            <Link href={rede.link}>{rede.icone}</Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}