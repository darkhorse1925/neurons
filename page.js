/*Neuromarvel - 2023
 *
 * Dev notes:
 * 100 is the scrolloffset for current guide to get triggered
 * 80 is offset for click always it should be less than 100
 */

const allSections = document.querySelectorAll('section')
const contents = document.querySelector("#contents")

//find and make aside with all sections available 
allSections.forEach(link =>{
  let guideId = link.id + '-guide'
  contents.innerHTML += `<div id="${guideId}" class="heading">${link.firstElementChild.innerHTML}</div>`
})


//click and scroll for guides
allSections.forEach(link =>{
  let guideId = link.id + '-guide'
  let currentSection = document.getElementById(link.id)
  document.getElementById(guideId).addEventListener('click',()=>{
    window.scrollTo(0, currentSection.offsetTop - 80)
  })
})


//show the current focused guide
window.addEventListener('scroll', ()=>{
  //100px is to show title a little ahead 
  let fromTop = window.scrollY + 100
  allSections.forEach(link => {
    let currentSection = document.getElementById(link.id)
    if(currentSection.offsetTop<= fromTop && currentSection.offsetHeight + currentSection.offsetTop >= fromTop){
      document.getElementById(link.id+ '-guide').classList.add('active')
    }else{
      document.getElementById(link.id+ '-guide').classList.remove('active')
    }
  })
})
