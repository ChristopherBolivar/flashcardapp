strQuiz.addEventListener('click', () => {
    let vWord = document.querySelector("#word").value;
    let vDiv = document.querySelector("#result");
    axios.get('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + vWord + '?key=ee67d907-7224-4430-a548-5dffdc6214eb').then((dictionaryapi) => {

        vDiv.innerHTML = `
        <h2>${dictionaryapi.data[0].meta.stems[0]}</h2>
        <p>${dictionaryapi.data[0].fl} </p> 
        <p>${dictionaryapi.data[0].shortdef[0]} </p> 
        `
    })


})