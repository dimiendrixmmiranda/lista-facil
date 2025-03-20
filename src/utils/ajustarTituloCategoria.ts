export default function ajustarTituloCategoria(titulo: string) {
    const texto = titulo
        .replace(/-/gi, ' ')
        .split(' ')
        .map(txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase())
    return texto.join(' ')
}
