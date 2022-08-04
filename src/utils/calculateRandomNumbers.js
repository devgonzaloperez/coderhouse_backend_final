import dotenv from 'dotenv';
dotenv.config();

const calculateRandomNumbers = () =>{
    const cantParams = process.env.CANT;
    const cantACalcular = Number(cantParams) || 10000;
    let numbers = [];
    let contains;
    for(let i = 0; i < cantACalcular; i++){
        const newNumber = Number(Math.round(Math.floor(Math.random() * (1000 - 1 + 1)) + 1));
        const newObject = {number: newNumber, quant: 1};
        contains = numbers.some(element => JSON.stringify(element.number) === JSON.stringify(newObject.number));
        if (contains){
            numbers.map(element =>{
                if(JSON.stringify(element.number) === JSON.stringify(newObject.number)){
                    element.quant = element.quant +1;
                }
                else{
                    return element
                }
            })
        } 
        else {
            numbers.push(newObject);
        }
    };

    return numbers;
};

process.on("message", (msg)=>{
    console.log(msg);
    const resultado = calculateRandomNumbers();
    process.send(resultado);
});