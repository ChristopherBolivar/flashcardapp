var formTwo = document.querySelector("#form2")

function loadQuiz() { //This function simply takes you to the next page

    document.querySelector('#pills-home-tab').click();

}
//Function getting the value of the input and prints out input divs on the next page

document.querySelector("#strQuiz").addEventListener('click', () => {
    console.log("Starting the quiz")
    let wCount = document.querySelector("#numVoWords")
    let formOne = document.querySelector("#myForm")
    let error1 = document.querySelector(".error1")
    if (wCount.value > 0) {
        for (let i = 0; i < wCount.value; i++) {
            formTwo.innerHTML +=
                `
        <div id="div${i}" class="col-12 mt-2">
        <div class="row">
        <label class="col mt-1">Word:</label> 
        <input class="col" id="input${i}" type="text">
        <button type="button" class="button${i} col btn btn-danger ml-1">
        <i class="fa fa-trash"></i>
        </button>
        </div>
        </div>
        `
        }

        document.querySelector('#pills-profile-tab').click()
    }
    //catch errror
    else { error1.innerHTML = `
    
    <div class="alert alert-danger" role="alert">*Please don't leave the required text field <u>blank</u>, or provide an integer <u>greater</u> than zero</div>
    
    ` }

    for (let i = 0; i < formTwo.length / 2; i++) {
        console.log(formTwo.length / 2)
        document.querySelector(`.button${ i }`).addEventListener('click', () => {
            console.log('yo')
            console.log(i)
           

        })
    }
})


//function fetches value of the inputs stores them into
document.querySelector("#getDef").addEventListener('click', () => {
    let vWord = [];
    let dArr = [];
    let iDiv = document.querySelector("#form2").length
    let vDiv = document.querySelector("#result");
    for (i = 0; i < iDiv / 2; i++) {
        vWord.push(document.querySelector(`#input${i}`).value)
    }
    for (i = 0; i < vWord.length; i++) {

        axios.get('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + vWord[i] + '?key=ee67d907-7224-4430-a548-5dffdc6214eb').then((dictionaryapi) => {
            dArr = [];
            for (let i = 0; i < dictionaryapi.data[0].shortdef.length; i++) {
                dArr.push(dictionaryapi.data[0].shortdef[i])
            }
            console.log(dArr)
            vDiv.innerHTML += ` 
                        <div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
    ${dictionaryapi.data[0].meta.stems[0]}
    </div>
    <div class="flip-card-back">
      
    <div class = "side-b flash ">
    <h3> ${dictionaryapi.data[0].meta.stems[0]} </h3> 
    <hr class = "hr1" >
    <p> ${dictionaryapi.data[0].fl}, ${dictionaryapi.data[0].hwi.hw}, ${dictionaryapi.data[0].hwi.prs[0].mw} </p>  
    <p> ${dArr.join() } </p>  
    </div>
  </div>
</div>
                        `
        })
    }
    document.querySelector('#pills-contact-tab').click()
})