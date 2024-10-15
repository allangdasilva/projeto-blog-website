// Menu
let navContainer = document.querySelector('.nav-container-02')
let navContent = document.querySelector('.nav-content-container')
let menuClose = document.querySelector('.menu-close-content')
let menuClick = document.querySelector('.menu-click')


menuClick.addEventListener('click', openMenu)
menuClose.addEventListener('click', closeMenu)

function openMenu(){
    navContainer.classList.add('nav-container-02-active')
    navContent.classList.add('nav-content-container-active')
    menuClose.classList.add('menu-close-content-active')
}
function closeMenu(){
    navContainer.classList.remove('nav-container-02-active')
    navContent.classList.remove('nav-content-container-active')
    menuClose.classList.remove('menu-close-content-active')
}

// Slider
let sliderIndex = 1
showSlider(sliderIndex)

function nextPrev(n){
    showSlider(sliderIndex += n)
}

function currentSlider(n){
    showSlider(sliderIndex = n)
}

function sliderMouseEnter(n){
    showSlider(sliderIndex = n)
}

function showSlider(n){
    let sliderImages = [...document.querySelectorAll('.slider-images-content')]
    let titlesContainer = [...document.querySelectorAll('.titles-container')]
    let circles = [...document.querySelectorAll('.circle')]
    let textPerson = [...document.querySelectorAll('.titles-text-person-container')]
    let position = [...document.querySelectorAll('.position')]

    if(n > sliderImages.length){
        sliderIndex = 1
    }
    if(n < 1){
        sliderIndex = sliderImages.length
    }

    sliderImages.map((ele)=>{
        ele.style.display = 'none' 
    })
    titlesContainer.map((ele)=>{
        ele.style.display = 'none'
    })
    circles.map((ele)=>{
        ele.classList.remove('circle-active')
    })
    textPerson.map((ele)=>{
        ele.classList.remove('titles-text-person-container-active')
    })
    position.map((ele)=>{
        ele.classList.remove('position-active')
    })

    sliderImages[sliderIndex - 1].style.display = 'block'
    titlesContainer[sliderIndex - 1].style.display = 'flex'
    circles[sliderIndex - 1].classList.add('circle-active')
    textPerson[sliderIndex - 1].classList.add('titles-text-person-container-active')
    position[sliderIndex - 1].classList.add('position-active')
}