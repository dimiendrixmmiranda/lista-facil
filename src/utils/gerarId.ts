export default function gerarId(){
    const arr = []
    for (let i = 0; i < 6; i++) {
        const num = (Math.random() * 10).toFixed(0)
        arr.push(num)
    }
    const id = parseFloat(arr.join().replace(/,/gi, ''))
    return id
}