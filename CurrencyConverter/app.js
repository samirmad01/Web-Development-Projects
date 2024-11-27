// let BASE_URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurr.value}`;

const drop_menu = document.querySelectorAll(".drop-menu select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const exchangeRateMsg = document.querySelector(".msg");

for(let select of drop_menu){
    for(currCode in countryList){
        let newopt = document.createElement("option");
        newopt.innerText = currCode;
        newopt.value = currCode;
        if(select.name === "from-box" && currCode === "USD"){
            newopt.selected = "selected";
        } else if(select.name === "to-box" && currCode === "INR"){
            newopt.selected = "selected";
        }
        select.append(newopt);
    }

    select.addEventListener("change", (event) => {
        updtFlag(event.target);
    })
}

const updtFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newImgSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newImgSrc;
};

const updateExchangeRate = async () => {
    let amount = document.querySelector("form input");
    exchangeRateMsg.innerText = "Getting Exchange Rate....";
    let amountVal = amount.value;
    if(amountVal === "" || amountVal < 1){
        amountVal = 1;
        amount.value = "1";
    }
    let URL = `https://v6.exchangerate-api.com/v6/1645b953cdf05126d3645e13/latest/${fromCurr.value}`;
    fetch(URL).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurr.value];
        let finalExchangeRate = (exchangeRate *amountVal).toFixed(3);
        exchangeRateMsg.innerText = `${amountVal} ${fromCurr.value} = ${finalExchangeRate} ${toCurr.value}`
    })


}

btn.addEventListener("click",  (event) =>{
    event.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
})
