function loadQuiz() {

    document.querySelector('#pills-home-tab').click();

}
document.querySelector("#strQuiz").addEventListener('click', () => {

    let wCount = document.querySelector("#numVoWords")
    let formOne = document.querySelector("#myForm")
    let formTwo = document.querySelector("#form2")
    let error1 = document.querySelector(".error1")
    if (wCount.value > 0) {
        for (let i = 0; i < wCount.value; i++) {
            formTwo.innerHTML +=
                `
        <div class="col-12 mt-2">
        <div class="row">
        <label class="col">Word:</label> 
        <input class="col" class="input${i}" type="text">
        <button type="button" class="col btn btn-danger ml-1">
        <i class="fa fa-trash"></i>
        </button>
        </div>
        </div>
        `
        }

        document.querySelector('#pills-profile-tab').click()
    } else { error1.innerHTML = `
    
    <div class="alert alert-danger" role="alert">*Please don't leave the required text field <u>blank</u>, or provide an integer <u>greater</u> than zero</div>
    
    ` }
})


document.querySelector("#getDef").addEventListener('click', () => {
    let vWord = [];
    let dArr = [];
    let iDiv = document.querySelector("#form2").length
    let vDiv = document.querySelector("#result");
    for (i = 0; i < iDiv; i++) {
        vWord.push(document.querySelector(`.input${i}`).value)
    }
    for (i = 0; i < vWord.length; i++) {

        axios.get('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + vWord[i] + '?key=ee67d907-7224-4430-a548-5dffdc6214eb').then((dictionaryapi) => {
            for (let i = 0; i < dictionaryapi.data[0].shortdef.length; i++) {
                dArr.push(dictionaryapi.data[0].shortdef[i])
            }
            console.log()
            vDiv.innerHTML += `
        <div class="photo card bg-light mb-3">
			    <div class="side-a flash card-body">
			      <h3 id="wordFront">${dictionaryapi.data[0].meta.stems[0]}</h3>
			      </div>
			      <div  class="side-b flash ">
                 <h3>${dictionaryapi.data[0].meta.stems[0]}, </h3>
                 <hr class="hr1">
                 <p>${dictionaryapi.data[0].fl}, ${dictionaryapi.data[0].hwi.hw}, ${dictionaryapi.data[0].hwi.prs[0].mw}</p> 
                 <p>${dArr.join(" , ")} </p> 
	            </div>
			    </div>
        `
        })
    }
    document.querySelector('#pills-contact-tab').click()
})