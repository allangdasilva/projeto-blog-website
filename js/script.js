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

