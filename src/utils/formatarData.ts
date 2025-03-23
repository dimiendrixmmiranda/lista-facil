export default function formatarData(dataString: Date) {
    const data = new Date(dataString);

    const diasSemana = [
        "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
        "Quinta-feira", "Sexta-feira", "Sábado"
    ];

    const diaSemana = diasSemana[data.getDay()];
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = String(data.getFullYear()).slice(2);
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");

    return `${diaSemana}, dia ${dia}/${mes}/${ano}, às ${horas}:${minutos}`;
}
