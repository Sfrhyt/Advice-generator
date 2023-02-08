import axios from "axios"

interface slipType {
    id: number;
    advice: string;
}
const button = document.querySelector(".advice-button") as HTMLButtonElement
const slipArray: slipType[] = []

window.addEventListener('load', async () => {
    for(let i = 1; i <= 224; i++ ) {
        const { request } = await axios.get("https://api.adviceslip.com/advice/"+i)
        slipArray.push(JSON.parse(request.response).slip)
    }
})

const slipGenerator = (): slipType => {
    return slipArray[Math.floor(Math.random() * slipArray.length)]
}

button.addEventListener("click", () => {
    const slip = slipGenerator()
    const title = document.querySelector(".advice-title h1") as HTMLHeadElement
    const text = document.querySelector(".advice-main p") as HTMLParagraphElement
    if (slip && slip.advice) {
        title.innerHTML = "ADVICE #" + slip.id
        text.innerHTML = '"' + slip.advice + '"'
    }
})