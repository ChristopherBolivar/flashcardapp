function loadQuiz() { //This function simply takes you to the next page

    document.querySelector('#pills-home-tab').click();

}
//Function getting the value of the input and prints out input divs on the next page

document.querySelector("#strQuiz").addEventListener('click', () => {
    console.log("Starting the quiz")
    let wCount = document.querySelector("#numVoWords")
    let formOne = document.querySelector("#myForm")
    let error1 = document.querySelector(".error1")
    let formTwo = document.querySelector("#form2")
    let vDiv = document.querySelector("#result");

    if (wCount.value > 0) {
        for (let i = 0; i < wCount.value; i++) {
            formTwo.innerHTML +=
                `
        <div id="div${i}" class="col-12 mt-2">
        <div class="row">
        <label class="col-4 mt-1">Word:</label> 
        <input class="col-5 inputs" id="input${i}" type="text">
        <button type="button" class="button${i} col-2 btn btn-danger ml-1">
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

    for (let i = 0; i < formTwo.children.length; i++) {
        let formTwo = document.querySelector("#form2")
        var arr = Array.prototype.slice.call( formTwo.children )
        console.log(arr)
        console.log(formTwo.children.length)
        document.querySelector(`.button${ i }`).addEventListener('click', () => {
            console.log('yo')
            console.log(i)
            console.log(arr)
            console.log(arr[i])
            // arr.splice(i,1)
            console.log(arr)
            arr[i].remove()


        })
    }


})



//function fetches value of the inputs stores them into
document.querySelector("#getDef").addEventListener('click', () => {
    let vWord = [];
    let dArr = [];
    let qName = document.querySelector("#qname").value
    let iDiv = document.querySelector("#form2").length
    let formTwo = document.querySelector("#form2")
    var arr = Array.prototype.slice.call( formTwo.children )
    let vDiv = document.querySelector("#result");
    let rDiv = document.querySelector("#rHeader")
    let error2 = document.querySelector("#error2")
    let inputs =  [...document.getElementsByClassName('inputs')]

    for (i = 0; i < inputs.length; i++) {
        // console.log(document.querySelectorAll(`.inputs`))
        // if (document.querySelector(`#input${i}`).value === null) {
        //     i++
        //     continue;
        // }
        // console.log(document.querySelector(`#input${i}`))
        console.log(inputs[i].value)
        vWord.push(inputs[i].value)

//        vWord.push(document.querySelector(`#input${i}`).value)
    }
    console.log(vWord)


    if(qName===undefined||qName===""){
        rDiv.innerHTML = `
        <div class="row">
      <div class="col-8">
      <h3>Unamed Flashcard Deck</h3>
      </div>
      <div class="col-4">
      <p class="edit" data-toggle="modal" data-target="#exampleModalLong">Edit this flashcard deck
<i class="fa fa-edit"></i>
</p>
      </div>
        </div>
        
        `
    }else {
        rDiv.innerHTML = `
  <div class="row">
<div class="col-8">
<h3>${qName}</h3>
</div>
<div class="col-4">
<p class="edit" data-toggle="modal" data-target="#exampleModalLong">Edit this flashcard deck
<i class="fa fa-edit"></i>
</p>
</div>
  </div>
  
  `
    }

    
    for (i = 0; i < vWord.length; i++) {

        axios.get('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + vWord[i] + '?key=ee67d907-7224-4430-a548-5dffdc6214eb').then((dictionaryapi) => {
            dArr = [];
            //If nothing returns say you need a real word
            for (let i = 0; i < dictionaryapi.data[0].shortdef.length; i++) {
                dArr.push(dictionaryapi.data[0].shortdef[i])
            }
           
            vDiv.innerHTML += ` 
                        <div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
    <h3 class="hand">${dictionaryapi.data[0].meta.stems[0]}</h3>
    </div>
    <div class="flip-card-back">
      
    <div class = "side-b flash ">
    <h3> ${dictionaryapi.data[0].meta.stems[0]} </h3> 
    <p> ${dictionaryapi.data[0].fl}, ${dictionaryapi.data[0].hwi.hw}, ${dictionaryapi.data[0].hwi.prs[0].mw} </p>  
    <p> ${dArr.join() } </p>  
    </div>
  </div>
</div>
                        `
            
    document.querySelector('#pills-contact-tab').click()
        })
    }

})
