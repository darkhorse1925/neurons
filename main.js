const suggestionBox = document.getElementById('suggestion-box')
const searchInput = document.getElementById('search-input')

const trending = [
  {
    name: 'How to cure cancer in home?',
    doc: 'Epilepsy.html',
  },
  {
    name: 'Top 10 heart attack simulatiors 2023',
    doc: 'Epilepsy',
  },
  {
    name: 'Schizophrenia - the worlds most coolest disease',
    doc: 'Epilepsy',
  },
  {
    name: 'DIY cancer cure - 100% working!',
    doc: 'Epilepsy',
  },
  {
    name: 'How to sell your kidneys online for best price?',
    doc: 'Epilepsy',
  },
]
const suggestions = [
  {
    name: 'What is Dementia?',
    doc: 'Epilepsy',
    tags: ['Dementia', 'Alzheimer', 'Neurology']
  },
  {
    name: 'Alzheimer the disease that makes you forget you?',
    doc: 'Epilepsy',
    tags: ['Alzheimer', 'Neurology', 'Dementia']
  },
  {
    name: '10 things that help you reduce headaches?',
    doc: 'Epilepsy',
    tags: ['Headache', 'Neurology', 'Migraine']
  },
  {
    name: 'What causes Migraine?',
    doc: 'Epilepsy',
    tags: ['Migraine', 'Headache', 'Brain']
  },
  {
    name: 'How to prevent Epilepsy',
    doc: 'Epilepsy.html',
    tags: ['Epilepsy', 'Seizure', 'Stroke']
  },
  {
    name: 'Multiple Sclerosis a disease from sci-fi!!',
    doc: 'Epilepsy',
    tags: ['Sclerosis', 'Multiple Sclerosis', 'Neurons']
  },
]



/*~~~~~~~~~= Filter Logic =~~~~~~~~~*/
searchInput.addEventListener('keyup', (event) => {
  const inputData = event.target.value.toLowerCase()
  let emptyArray = []

  if(inputData) {

    //let re = new RegExp(inputData, 'i')
    //re.text(data.tags[i])

    emptyArray = suggestions.filter((data) => {
      let match = false
      for(let i= 0; i< data.tags.length; i++){
        if(data.tags[i].toLowerCase().startsWith(inputData)) {
          match = true
          data['rank'] = i + 1
        }
      }
      return match
    })
    console.log(emptyArray)

    emptyArray.sort((a,b)=>  a.rank- b.rank)

    let suggestionContent = ``
    emptyArray.map((item) => {
      suggestionContent += `<a href="/${item.doc}" class="sug-item">${item.name}</a>` 
    })
    suggestionBox.innerHTML = suggestionContent

  }


  //if nothing typed show trending
  else {
    let suggestionContent = `<div id="trending">Top articles</div>`
    trending.map((item) => {
      suggestionContent += `<a href="/${item.doc}" class="sug-item">${item.name}</li>` 
    })
    suggestionBox.innerHTML = suggestionContent
  }

})
/*~~~~~~~~~= END =~~~~~~~~~*/



/*~~~~~~~~~= Focus and Blur =~~~~~~~~~*/
searchInput.addEventListener('focus', () => {
  suggestionBox.style.display = "block"
  if(suggestionBox.innerHTML === ''){
    let suggestionContent = `<div id="trending">Top articles</div>`
    trending.map((item) => {
      suggestionContent += `<a href="/${item.doc}" class="sug-item">${item.name}</li>` 
    })
    suggestionBox.innerHTML = suggestionContent
    }
})


searchInput.addEventListener('blur', () => {
  setTimeout(()=>{
    suggestionBox.style.display = "none"
  },100)
})
