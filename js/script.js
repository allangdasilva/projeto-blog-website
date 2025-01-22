"use strict";

// Menu
const NAV_CONTAINER_02 = document.querySelector('.nav-container-02');
const NAV_CONTENT = document.querySelector('.nav-content-container');
const MENU_CLOSE = document.querySelector('.menu-close-content');
const MENU_CLICK = document.querySelector('.menu-click');


MENU_CLICK.addEventListener('click', openMenu);
MENU_CLOSE.addEventListener('click', closeMenu);

function openMenu(){
    NAV_CONTAINER_02.classList.add('nav-container-02-active');
    NAV_CONTENT.classList.add('nav-content-container-active');
    MENU_CLOSE.classList.add('menu-close-content-active');
}
function closeMenu(){
    NAV_CONTAINER_02.classList.remove('nav-container-02-active');
    NAV_CONTENT.classList.remove('nav-content-container-active');
    MENU_CLOSE.classList.remove('menu-close-content-active');
}

// Slider
let sliderIndex = 1;
showSlider(sliderIndex);

function nextPrev(n){
    showSlider(sliderIndex += n);
}

function currentSlider(n){
    showSlider(sliderIndex = n);
}

function sliderMouseEnter(n){
    showSlider(sliderIndex = n);
}

function showSlider(n){
    const SLIDER_IMAGES = [...document.querySelectorAll('.slider-images-content')];
    const TITLES_CONTAINER = [...document.querySelectorAll('.titles-container')];
    const CIRCLES = [...document.querySelectorAll('.circle')];
    const TEXT_PERSON = [...document.querySelectorAll('.titles-text-person-container')];
    const POSITION = [...document.querySelectorAll('.position')];

    if(n > SLIDER_IMAGES.length){
        sliderIndex = 1;
    }
    if(n < 1){
        sliderIndex = SLIDER_IMAGES.length;
    }

    SLIDER_IMAGES.map((ele)=>{
        ele.style.display = 'none' ;
    })
    TITLES_CONTAINER.map((ele)=>{
        ele.style.display = 'none';
    })
    CIRCLES.map((ele)=>{
        ele.classList.remove('circle-active');
    })
    TEXT_PERSON.map((ele)=>{
        ele.classList.remove('titles-text-person-container-active');
    })
    POSITION.map((ele)=>{
        ele.classList.remove('position-active');
    })

    SLIDER_IMAGES[sliderIndex - 1].style.display = 'block';
    TITLES_CONTAINER[sliderIndex - 1].style.display = 'flex';
    CIRCLES[sliderIndex - 1].classList.add('circle-active');
    TEXT_PERSON[sliderIndex - 1].classList.add('titles-text-person-container-active');
    POSITION[sliderIndex - 1].classList.add('position-active');
}

// Menu Fixed
window.addEventListener('scroll', ()=>{
    const HEADER = document.querySelector('header');
    const MAIN = document.querySelector('main');
    const FOOTER = document.querySelector('footer');
    const NAV_CONTAINER_01 = document.querySelector('.nav-container-01');
    const NAV_CONTAINER_02 = document.querySelector('.nav-container-02');

    if(window.scrollY > 30 && NAV_CONTAINER_02.classList == 'nav-container-02') {
        HEADER.classList.add('header-active');
        MAIN.classList.add('main-active');
        FOOTER.classList.add('footer-active');
        NAV_CONTAINER_01.style.paddingBlock = '10px';
    }else{
        HEADER.classList.remove('header-active');
        MAIN.classList.remove('main-active');
        FOOTER.classList.remove('footer-active');
        NAV_CONTAINER_01.style.paddingBlock = '20px';
    }
})