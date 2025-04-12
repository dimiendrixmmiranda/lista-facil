export default function criarId(){
    const nums:string[] = []
    for (let i = 0; i < 6; i++) {
        const num = (Math.random() * 10).toFixed(0)
        nums.push(num)
    }
    return parseFloat(nums.join(''))
}