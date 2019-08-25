function loadQuiz() {

    document.querySelector('#pills-home-tab').click();

}
document.querySelector("#strQuiz").addEventListener('click', () => {
    let wCount = document.querySelector("#numVoWords")
    let formTwo = document.querySelector("#form2")
    for (let i = 0; i < wCount.value; i++) {
        formTwo.innerHTML +=
            `
        <div class="col-12">
        <input class="input${i}" type="text">
        </div>
        `
    }
    document.querySelector('#pills-profile-tab').click()
})


document.querySelector("#getDef").addEventListener('click', () => {
    let vWord = [];
    let iDiv = document.querySelector("#form2").length
    let vDiv = document.querySelector("#result");
    for (i = 0; i < iDiv; i++) {
        vWord.push(document.querySelector(`.input${i}`).value)
    }
    for (i = 0; i < vWord.length; i++) {
        axios.get('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + vWord[i] + '?key=ee67d907-7224-4430-a548-5dffdc6214eb').then((dictionaryapi) => {

            vDiv.innerHTML += `
        <div id="card" class="photo card bg-light mb-3">
			    <div class="side-a flash card-body">
			      <h3 id="wordFront">${dictionaryapi.data[0].meta.stems[0]}</h3>
			      </div>
			      <div  class="side-b flash ">
                 <h3>${dictionaryapi.data[0].meta.stems[0]}</h3>
                 <hr class="hr1">
                 <p>${dictionaryapi.data[0].fl}</p> 
                 <p>${dictionaryapi.data[0].shortdef[0]} </p> 
	            </div>
			    </div>
        `
        })
    }
    document.querySelector('#pills-contact-tab').click()
})