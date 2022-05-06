
import "./style/normalize.css"
import "./style/main.sass"

const Calculator = require("@mroutput/jscalc");
let c = new Calculator();
let lastExpression = ''

const input = document.querySelector('input')
const btnItems = document.querySelectorAll('[data-type="item"]')

btnItems.forEach(btn => {
    btn.addEventListener('click', () => {
        input.value += btn.textContent
    })
})


const btnAction = document.querySelectorAll('[data-type="action"]') as NodeListOf<HTMLElement>;


let rememberNumber = 0;

btnAction.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log(btn.textContent);
        
        switch (btn.textContent)
        {
            case "=":
                lastExpression = input.value
                input.value = c.exec(deletePoint(input.value)).toFixed(8)
                break
            case 'C':
                input.value = ''
                break;
            case 'MS':
                rememberNumber = Number(input.value)
                break;  
            case 'MR':
                input.value = String(rememberNumber)
                break;
            case 'MC':
                rememberNumber = 0
                break;
            case 'M-':
                input.value = String(Number(input.value) - rememberNumber)
                break;
            case 'M+':
                input.value = String(Number(input.value) + rememberNumber)
                break;
            case 'AC':
                input.value = ''
                rememberNumber = 0
                break;
            case 'Rvt':
                if(lastExpression){
                    input.value = String(lastExpression)
                }
                break
        }
    })
})


function deletePoint(str: string){
    let newStr = str
    if(!(str.includes('.')) || !(str.includes('.'))){
        return str
    }
    const allNumpoint = str.match(/[0-9]*[.,][0-9]+/gi)
    allNumpoint.forEach(num => {
        const length = num.split(/[.,]/)[1].length
        const lengthInt = length * 10
        const newNumber = ((parseFloat(num)) * lengthInt) + `/${lengthInt}`
        newStr = newStr.replace(num, `(${newNumber})`)
        
    })
    return newStr
    
}